'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './page.module.scss';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

type SummaryData = {
  date: string;
  total: number;
  uniqueIps: number;
  topPaths: Array<{ path: string; count: number }>;
  pinUsage: Array<{ label: string; count: number }>;
};

type SessionData = {
  id: string;
  ip: string;
  pinLabel: string | null;
  startedAt: string;
  lastEventAt: string;
  actions: Array<{ path: string; count: number }>;
};

type IpSummary = {
  ip: string;
  date: string;
  total: number;
  actions: Array<{ path: string; count: number }>;
  pinUsage: Array<{ label: string; count: number }>;
};

type PinRow = {
  id: string;
  label: string | null;
  code: string | null;
  shortCode: string | null;
  accessAll: boolean;
  expiresAt: string | null;
};


type PinSummary = {
  pin: {
    id: string;
    label: string | null;
    code: string | null;
    shortCode: string | null;
  };
  date: string;
  total: number;
  successCount: number;
  uniqueIps: number;
  topPaths: Array<{ path: string; count: number }>;
  lastEntries: Array<{ at: string; ip: string; success: boolean; path: string | null }>;
};

type MonitoringSettings = {
  enabled: boolean;
  botToken: string | null;
  allowedChatIds: number[];
  allowedIps: string[];
  dailySummaryHour: number;
  lastDailySummaryDate?: string | null;
};

const todayString = () => new Date().toISOString().slice(0, 10);

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Request failed');
  }
  const json = await res.json();
  return json.data as T;
}

export default function MiniAppPage() {
  const [tab, setTab] = useState<'dashboard' | 'sessions' | 'ip' | 'pins' | 'settings'>('dashboard');
  const [error, setError] = useState<string | null>(null);

  const [summaryDate, setSummaryDate] = useState(todayString());
  const [summary, setSummary] = useState<SummaryData | null>(null);

  const [sessionsDate, setSessionsDate] = useState(todayString());
  const [sessions, setSessions] = useState<SessionData[]>([]);

  const [ipQuery, setIpQuery] = useState('');
  const [ipDate, setIpDate] = useState(todayString());
  const [ipSummary, setIpSummary] = useState<IpSummary | null>(null);

  const [pinQuery, setPinQuery] = useState('');
  const [pins, setPins] = useState<PinRow[]>([]);
  const [selectedPin, setSelectedPin] = useState<PinRow | null>(null);
  const [pinDate, setPinDate] = useState(todayString());
  const [pinSummary, setPinSummary] = useState<PinSummary | null>(null);
  const [creatingPin, setCreatingPin] = useState(false);
  const [quickLabel, setQuickLabel] = useState('');
  const [quickResult, setQuickResult] = useState<PinRow | null>(null);

  const [settings, setSettings] = useState<MonitoringSettings | null>(null);
  const [saving, setSaving] = useState(false);

  const dateActions = useMemo(
    () => ({
      today: () => todayString(),
      yesterday: () =>
        new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    }),
    []
  );

  useEffect(() => {
    setError(null);
    if (tab === 'dashboard') {
      fetchJson<SummaryData>(`/api/public/monitoring/summary?date=${summaryDate}`)
        .then(setSummary)
        .catch((e) => setError(e.message));
    }
  }, [tab, summaryDate]);

  useEffect(() => {
    if (tab === 'sessions') {
      fetchJson<SessionData[]>(`/api/public/monitoring/sessions?date=${sessionsDate}`)
        .then(setSessions)
        .catch((e) => setError(e.message));
    }
  }, [tab, sessionsDate]);

  useEffect(() => {
    if (tab === 'pins') {
      const url = pinQuery ? `/api/public/monitoring/pins?query=${encodeURIComponent(pinQuery)}` : '/api/public/monitoring/pins';
      fetchJson<PinRow[]>(url)
        .then((data) => {
          setPins(data);
          if (data.length) {
            setSelectedPin((prev) => prev && data.find((p) => p.id === prev.id) ? prev : data[0]);
          }
        })
        .catch((e) => setError(e.message));
    }
  }, [tab, pinQuery]);

  useEffect(() => {
    if (tab === 'pins' && selectedPin) {
      const pinValue = selectedPin.code || selectedPin.shortCode || selectedPin.id;
      fetchJson<PinSummary>(
        `/api/public/monitoring/pins/${encodeURIComponent(pinValue)}/summary?date=${pinDate}`
      )
        .then(setPinSummary)
        .catch((e) => setError(e.message));
    }
  }, [tab, selectedPin, pinDate]);

  useEffect(() => {
    if (tab === 'settings') {
      fetchJson<MonitoringSettings>('/api/public/monitoring/settings')
        .then(setSettings)
        .catch((e) => setError(e.message));
    }
  }, [tab]);

  const handleIpSearch = async () => {
    if (!ipQuery) return;
    setError(null);
    try {
      const data = await fetchJson<IpSummary>(
        `/api/public/monitoring/ip/${encodeURIComponent(ipQuery)}?date=${ipDate}`
      );
      setIpSummary(data);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleSaveSettings = async () => {
    if (!settings) return;
    setSaving(true);
    setError(null);
    try {
      const payload = {
        enabled: settings.enabled,
        botToken: settings.botToken,
        allowedChatIds: settings.allowedChatIds,
        allowedIps: settings.allowedIps,
        dailySummaryHour: settings.dailySummaryHour,
      };
      await fetchJson('/api/public/monitoring/settings', {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleQuickPin = async () => {
    if (!quickLabel.trim()) {
      setError('Введите название для нового PIN');
      return;
    }
    setCreatingPin(true);
    setError(null);
    try {
      const pin = await fetchJson<PinRow>('/api/public/monitoring/pins/quick', {
        method: 'POST',
        body: JSON.stringify({ label: quickLabel }),
      });
      setQuickResult(pin);
      setQuickLabel('');
      const data = await fetchJson<PinRow[]>('/api/public/monitoring/pins');
      setPins(data);
      setSelectedPin(data[0] || null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setCreatingPin(false);
    }
  };

  const buildPinMessage = (pin: PinRow) => {
    const short = pin.shortCode || '';
    return [
      'Привет! Вот мой сайт-портфолио:',
      `https://etosema.ru/${short}`,
      `Если сайт попросит ввести пин-код (если будешь пересылать коллегам), то твой пин-код — ${pin.code}`,
    ].join('\n');
  };

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      setError('Не удалось скопировать');
    }
  };

  const handleDeletePin = async (id: string) => {
    setError(null);
    try {
      await fetchJson(`/api/public/monitoring/pins/${id}`, { method: 'DELETE' });
      const data = await fetchJson<PinRow[]>('/api/public/monitoring/pins');
      setPins(data);
      setSelectedPin(data[0] || null);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.title}>Monitoring Mini App</div>
        <div className={styles.tabs}>
          <button className={tab === 'dashboard' ? styles.active : ''} onClick={() => setTab('dashboard')}>
            Дашборд
          </button>
          <button className={tab === 'sessions' ? styles.active : ''} onClick={() => setTab('sessions')}>
            Сессии
          </button>
          <button className={tab === 'ip' ? styles.active : ''} onClick={() => setTab('ip')}>
            Поиск IP
          </button>
          <button className={tab === 'pins' ? styles.active : ''} onClick={() => setTab('pins')}>
            PIN-коды
          </button>
          <button className={tab === 'settings' ? styles.active : ''} onClick={() => setTab('settings')}>
            Настройки
          </button>
        </div>
      </header>

      {error && <div className={styles.error}>Ошибка: {error}</div>}

      {tab === 'dashboard' && summary && (
        <section className={styles.section}>
          <div className={styles.controls}>
            <input type="date" value={summaryDate} onChange={(e) => setSummaryDate(e.target.value)} />
            <button onClick={() => setSummaryDate(dateActions.today())}>Сегодня</button>
            <button onClick={() => setSummaryDate(dateActions.yesterday())}>Вчера</button>
          </div>
          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.cardTitle}>Сегодня всего</div>
              <div className={styles.big}>{summary.total}</div>
              <div className={styles.muted}>Уникальных IP: {summary.uniqueIps}</div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardTitle}>По PIN-кодам</div>
              <ul>
                {summary.pinUsage.map((item) => (
                  <li key={item.label}>
                    {item.label}: {item.count}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.card}>
              <div className={styles.cardTitle}>Топ страниц</div>
              <ul>
                {summary.topPaths.map((item) => (
                  <li key={item.path}>
                    {item.path}: {item.count}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {tab === 'sessions' && (
        <section className={styles.section}>
          <div className={styles.controls}>
            <input type="date" value={sessionsDate} onChange={(e) => setSessionsDate(e.target.value)} />
          </div>
          <div className={styles.listCard}>
            {sessions.map((session) => (
              <div key={session.id} className={styles.listItem}>
                <div className={styles.cardTitle}>
                  {session.ip} {session.pinLabel ? `• ${session.pinLabel}` : '• Без PIN'}
                </div>
                <div className={styles.muted}>
                  {new Date(session.startedAt).toLocaleString('ru-RU')} →{' '}
                  {new Date(session.lastEventAt).toLocaleString('ru-RU')}
                </div>
                <div className={styles.inlineList}>
                  {session.actions.map((action) => (
                    <span key={action.path}>
                      {action.path}: {action.count}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === 'ip' && (
        <section className={styles.section}>
          <div className={styles.controls}>
            <input
              placeholder="IP адрес"
              value={ipQuery}
              onChange={(e) => setIpQuery(e.target.value)}
            />
            <input type="date" value={ipDate} onChange={(e) => setIpDate(e.target.value)} />
            <button onClick={handleIpSearch}>Найти</button>
          </div>
          {ipSummary && (
            <div className={styles.card}>
              <div className={styles.cardTitle}>IP {ipSummary.ip}</div>
              <div className={styles.muted}>Всего действий: {ipSummary.total}</div>
              <div className={styles.subTitle}>По PIN-кодам</div>
              <ul>
                {ipSummary.pinUsage.map((item) => (
                  <li key={item.label}>
                    {item.label}: {item.count}
                  </li>
                ))}
              </ul>
              <div className={styles.subTitle}>Действия</div>
              <ul>
                {ipSummary.actions.map((item) => (
                  <li key={item.path}>
                    {item.path}: {item.count}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {tab === 'pins' && (
        <section className={styles.section}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>⚡ Новые PIN</div>
            <div className={styles.quickRow}>
              <input
                placeholder="Название (например: Скинула Яндексу)"
                value={quickLabel}
                onChange={(e) => setQuickLabel(e.target.value)}
              />
              <button onClick={handleQuickPin} disabled={creatingPin}>
                {creatingPin ? 'Создание...' : 'Создать'}
              </button>
            </div>
            {quickResult && (
              <div className={styles.quickResult}>
                <div className={styles.big}>{quickResult.code}</div>
                <div className={styles.muted}>
                  https://etosema.ru/{quickResult.shortCode}
                </div>
                <div className={styles.messageBlock}>
                  {buildPinMessage(quickResult)}
                </div>
                <div className={styles.quickButtons}>
                  <button onClick={() => copyText(buildPinMessage(quickResult))}>
                    📋 Скопировать текст
                  </button>
                  <button
                    onClick={() =>
                      copyText(`https://etosema.ru/${quickResult.shortCode}`)
                    }
                  >
                    📋 Скопировать ссылку
                  </button>
                  <button onClick={() => copyText(quickResult.code || '')}>
                    📋 Скопировать пин
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className={styles.controls}>
            <input
              placeholder="Поиск по названию"
              value={pinQuery}
              onChange={(e) => setPinQuery(e.target.value)}
            />
            <input type="date" value={pinDate} onChange={(e) => setPinDate(e.target.value)} />
          </div>
          <div className={styles.split}>
            <div className={styles.listCard}>
              {pins.map((pin) => (
                <div key={pin.id} className={styles.listItem}>
                  <button
                    className={`${styles.pinItem} ${selectedPin?.id === pin.id ? styles.activePin : ''}`}
                    onClick={() => setSelectedPin(pin)}
                  >
                    <div>{pin.label || 'Без названия'}</div>
                    <div className={styles.muted}>{pin.shortCode || pin.code || '—'}</div>
                  </button>
                  <button className={styles.danger} onClick={() => handleDeletePin(pin.id)}>
                    Удалить
                  </button>
                </div>
              ))}
            </div>
            <div className={styles.card}>
              {pinSummary && (
                <div className={styles.pinSummary}>
                  <div className={styles.cardTitle}>{pinSummary.pin.label || 'Без названия'}</div>
                  <div className={styles.muted}>
                    {pinSummary.pin.shortCode || pinSummary.pin.code}
                  </div>
                  <div className={styles.metrics}>
                    <div>Попыток: {pinSummary.total}</div>
                    <div>Успешных: {pinSummary.successCount}</div>
                    <div>IP: {pinSummary.uniqueIps}</div>
                  </div>
                  <div className={styles.subTitle}>Топ страниц</div>
                  <div className={styles.inlineList}>
                    {pinSummary.topPaths.map((item) => (
                      <span key={item.path}>
                        {item.path}: {item.count}
                      </span>
                    ))}
                  </div>
                  <div className={styles.subTitle}>Последние события</div>
                  <div className={styles.listStack}>
                    {pinSummary.lastEntries.map((entry, idx) => (
                      <div key={`${entry.ip}-${idx}`} className={styles.muted}>
                        {new Date(entry.at).toLocaleString('ru-RU')} • {entry.ip} •{' '}
                        {entry.success ? 'успех' : 'ошибка'} {entry.path ? `• ${entry.path}` : ''}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {tab === 'settings' && settings && (
        <section className={styles.section}>
          <div className={styles.card}>
            <div className={styles.row}>
              <label>
                <input
                  type="checkbox"
                  checked={settings.enabled}
                  onChange={(e) => setSettings({ ...settings, enabled: e.target.checked })}
                />
                <span>Включено</span>
              </label>
            </div>
            <div className={styles.row}>
              <label>Токен бота</label>
              <input
                value={settings.botToken || ''}
                onChange={(e) => setSettings({ ...settings, botToken: e.target.value })}
              />
            </div>
            <div className={styles.row}>
              <label>Разрешённые ID</label>
              <input
                value={settings.allowedChatIds.join(', ')}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    allowedChatIds: e.target.value
                      .split(/[,\s]+/)
                      .map((val) => Number(val))
                      .filter((val) => Number.isFinite(val)),
                  })
                }
              />
            </div>
            <div className={styles.row}>
              <label>Разрешенные IP</label>
              <input
                value={settings.allowedIps.join(', ')}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    allowedIps: e.target.value
                      .split(/[,\s]+/)
                      .map((val) => val.trim())
                      .filter((val) => val.length > 0),
                  })
                }
              />
            </div>
            <div className={styles.row}>
              <label>Ежедневная сводка (час, МСК)</label>
              <input
                type="number"
                min={0}
                max={23}
                value={settings.dailySummaryHour}
                onChange={(e) =>
                  setSettings({ ...settings, dailySummaryHour: Number(e.target.value) || 0 })
                }
              />
            </div>
            <button onClick={handleSaveSettings} disabled={saving}>
              {saving ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
