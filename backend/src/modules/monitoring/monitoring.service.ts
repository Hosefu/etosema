import { prisma } from '../../db/prisma';
import { config } from '../../config/env';
import { logger } from '../../utils/logger';

const MOSCOW_TIMEZONE = 'Europe/Moscow';
const MOSCOW_OFFSET_MINUTES = 180;
const SESSION_WINDOW_MS = 3 * 60 * 1000;
const SESSION_POLL_MS = 60 * 1000;
const BOT_POLL_TIMEOUT_SEC = 25;
const BOT_POLL_RETRY_MS = 5000;

const DEFAULT_BOT_TOKEN =
  '8186709126:AAHhbs2ndW-VYta3ghfsGH4zMavfG_o5f_k';
const DEFAULT_ALLOWED_CHAT_IDS = [343384231, 922411931];

type PrismaClient = typeof prisma;

type MonitoringSettings = {
  enabled: boolean;
  botToken: string | null;
  allowedChatIds: number[];
  allowedIps: string[];
  dailySummaryHour: number;
  lastDailySummaryDate: string | null;
};

const parseAllowedChatIds = (input: string | null | undefined): number[] => {
  if (!input) return [];
  try {
    const parsed = JSON.parse(input);
    if (Array.isArray(parsed)) {
      return parsed.map((val) => Number(val)).filter((val) => Number.isFinite(val));
    }
  } catch {
    // ignore
  }
  return [];
};

const serializeAllowedChatIds = (ids: number[]): string => {
  return JSON.stringify(ids.filter((id) => Number.isFinite(id)));
};

const parseAllowedIps = (input: string | null | undefined): string[] => {
  if (!input) return [];
  try {
    const parsed = JSON.parse(input);
    if (Array.isArray(parsed)) {
      return parsed
        .map((val) => String(val).trim())
        .filter((val) => val.length > 0);
    }
  } catch {
    // ignore
  }
  return [];
};

const serializeAllowedIps = (ips: string[]): string => {
  const normalized = ips
    .map((ip) => String(ip).trim())
    .filter((ip) => ip.length > 0);
  return JSON.stringify(Array.from(new Set(normalized)));
};

const getMoscowDateParts = (date = new Date()) => {
  const formatter = new Intl.DateTimeFormat('ru-RU', {
    timeZone: MOSCOW_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
  const parts = formatter.formatToParts(date);
  const byType = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  return {
    year: Number(byType.year),
    month: Number(byType.month),
    day: Number(byType.day),
    hour: Number(byType.hour),
    minute: Number(byType.minute),
  };
};

const getMoscowDateString = (date = new Date()): string => {
  const { year, month, day } = getMoscowDateParts(date);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${year}-${pad(month)}-${pad(day)}`;
};

const getMoscowDayRangeUtc = (dateString: string) => {
  const [year, month, day] = dateString.split('-').map(Number);
  const startUtc = new Date(
    Date.UTC(year, month - 1, day, 0, 0, 0) - MOSCOW_OFFSET_MINUTES * 60 * 1000
  );
  const endUtc = new Date(
    Date.UTC(year, month - 1, day + 1, 0, 0, 0) - MOSCOW_OFFSET_MINUTES * 60 * 1000
  );
  return { startUtc, endUtc };
};

async function ensureMonitoringSettings(prisma: PrismaClient) {
  const existing = await prisma.monitoringSettings.findUnique({
    where: { id: 1 },
  });
  if (existing) return existing;

  return prisma.monitoringSettings.create({
    data: {
      enabled: true,
      botToken: DEFAULT_BOT_TOKEN,
      allowedChatIdsJson: serializeAllowedChatIds(DEFAULT_ALLOWED_CHAT_IDS),
      allowedIpsJson: serializeAllowedIps([]),
      dailySummaryHour: 22,
    },
  });
}

export async function getMonitoringSettings(
  prisma: PrismaClient
): Promise<MonitoringSettings> {
  const settings = await ensureMonitoringSettings(prisma);
  return {
    enabled: settings.enabled,
    botToken: settings.botToken || null,
    allowedChatIds: parseAllowedChatIds(settings.allowedChatIdsJson),
    allowedIps: parseAllowedIps(settings.allowedIpsJson),
    dailySummaryHour: settings.dailySummaryHour ?? 22,
    lastDailySummaryDate: settings.lastDailySummaryDate || null,
  };
}

export async function updateMonitoringSettings(
  prisma: PrismaClient,
  input: Partial<MonitoringSettings>
) {
  const data: Record<string, unknown> = {};

  if (input.enabled !== undefined) data.enabled = input.enabled;
  if (input.botToken !== undefined) data.botToken = input.botToken || null;
  if (input.allowedChatIds !== undefined) {
    data.allowedChatIdsJson = serializeAllowedChatIds(input.allowedChatIds);
  }
  if (input.allowedIps !== undefined) {
    data.allowedIpsJson = serializeAllowedIps(input.allowedIps);
  }
  if (input.dailySummaryHour !== undefined) {
    data.dailySummaryHour = input.dailySummaryHour;
  }
  if (input.lastDailySummaryDate !== undefined) {
    data.lastDailySummaryDate = input.lastDailySummaryDate;
  }

  const updated = await prisma.monitoringSettings.update({
    where: { id: 1 },
    data,
  });

  return {
    enabled: updated.enabled,
    botToken: updated.botToken || null,
    allowedChatIds: parseAllowedChatIds(updated.allowedChatIdsJson),
    allowedIps: parseAllowedIps(updated.allowedIpsJson),
    dailySummaryHour: updated.dailySummaryHour ?? 22,
    lastDailySummaryDate: updated.lastDailySummaryDate || null,
  };
}

type TelegramUpdate = {
  update_id: number;
  message?: {
    message_id: number;
    date: number;
    text?: string;
    chat: { id: number; type: string };
    from?: { id: number; username?: string; first_name?: string };
  };
  callback_query?: {
    id: string;
    data?: string;
    message?: { message_id: number; chat: { id: number } };
    from?: { id: number; username?: string; first_name?: string };
  };
};

async function callTelegramApi<T>(
  botToken: string,
  method: string,
  payload: Record<string, unknown>
): Promise<T> {
  const res = await fetch(`https://api.telegram.org/bot${botToken}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const json = (await res.json()) as { ok: boolean; result: T };
  if (!res.ok || !json.ok) {
    throw new Error('Telegram API error');
  }
  return json.result;
}

async function sendMessage(
  botToken: string,
  chatId: number,
  text: string,
  replyMarkup?: Record<string, unknown>
) {
  await callTelegramApi(botToken, 'sendMessage', {
    chat_id: chatId,
    text,
    reply_markup: replyMarkup,
  });
}

async function sendToAllowed(
  settings: MonitoringSettings,
  text: string,
  replyMarkup?: Record<string, unknown>
): Promise<void> {
  if (!settings.enabled) return;
  if (!settings.botToken) return;
  if (!settings.allowedChatIds.length) return;

  await Promise.all(
    settings.allowedChatIds.map((chatId) =>
      sendMessage(
        settings.botToken as string,
        chatId,
        text,
        replyMarkup
      ).catch((err) => {
        logger.warn({ err, chatId }, 'Failed to send Telegram message');
      })
    )
  );
}

const formatDateTime = (date: Date) => {
  return new Intl.DateTimeFormat('ru-RU', {
    timeZone: MOSCOW_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const summarizeActions = (actions: Array<{ path: string }>) => {
  const counts = new Map<string, number>();
  actions.forEach((action) => {
    const key = action.path || 'unknown';
    counts.set(key, (counts.get(key) || 0) + 1);
  });

  const lines = Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([path, count]) => `• ${path} — ${count}`);

  return lines.length ? lines.join('\n') : '• нет данных';
};

const buildPinUsageSummary = (
  pinUsage: Array<{ label: string; count: number }>
) => {
  const lines = pinUsage
    .sort((a, b) => b.count - a.count)
    .map((item) => `• ${item.label} — ${item.count}`);
  return lines.length ? lines.join('\n') : '• нет данных';
};

const getMiniAppUrl = () => {
  const base = config.frontendUrl.replace(/\/$/, '');
  return `${base}/miniapp`;
};

const buildMainKeyboard = () => ({
  inline_keyboard: [
    [
      { text: 'Сводка сегодня', callback_data: 'summary:today' },
      { text: 'Сводка вчера', callback_data: 'summary:yesterday' },
    ],
    [{ text: 'PIN-коды', callback_data: 'pins:list' }],
    [
      {
        text: 'Открыть Mini App',
        web_app: { url: getMiniAppUrl() },
      },
    ],
    [{ text: 'Помощь', callback_data: 'help' }],
  ],
});

const buildSessionKeyboard = (ip: string, dateString: string) => ({
  inline_keyboard: [
    [
      {
        text: `Сводка по IP`,
        callback_data: `ip:${ip}:${dateString}`,
      },
    ],
  ],
});

const parseCallbackDate = (token?: string) => {
  if (!token || token === 'today') return getMoscowDateString();
  if (token === 'yesterday') {
    const today = new Date();
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    return getMoscowDateString(yesterday);
  }
  return token;
};

const buildPathCounts = (paths: Array<string | null | undefined>) => {
  const counts = new Map<string, number>();
  paths.forEach((path) => {
    const key = path || 'unknown';
    counts.set(key, (counts.get(key) || 0) + 1);
  });
  return Array.from(counts.entries())
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count);
};

const buildPinUsageCounts = (pinLabels: Array<string | null | undefined>) => {
  const counts = new Map<string, number>();
  pinLabels.forEach((label) => {
    const key = label?.trim() || 'Без PIN';
    counts.set(key, (counts.get(key) || 0) + 1);
  });
  return Array.from(counts.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
};

export async function getDailySummaryData(
  prisma: PrismaClient,
  dateString: string
) {
  const { startUtc, endUtc } = getMoscowDayRangeUtc(dateString);
  const events = (await prisma.monitoringEvent.findMany({
    where: { createdAt: { gte: startUtc, lt: endUtc } },
  })) as Array<{ ip: string; path: string; pinLabel?: string | null }>;

  const total = events.length;
  const uniqueIps = new Set(events.map((e) => e.ip));
  const topPaths = buildPathCounts(events.map((e) => e.path)).slice(0, 10);
  const pinUsage = buildPinUsageCounts(events.map((e) => e.pinLabel));

  return {
    date: dateString,
    total,
    uniqueIps: uniqueIps.size,
    topPaths,
    pinUsage,
  };
}

export async function getIpSummaryData(
  prisma: PrismaClient,
  ip: string,
  dateString: string
) {
  const { startUtc, endUtc } = getMoscowDayRangeUtc(dateString);
  const events = (await prisma.monitoringEvent.findMany({
    where: {
      ip,
      createdAt: { gte: startUtc, lt: endUtc },
    },
  })) as Array<{ path: string; pinLabel?: string | null }>;

  return {
    ip,
    date: dateString,
    total: events.length,
    actions: buildPathCounts(events.map((e) => e.path)),
    pinUsage: buildPinUsageCounts(events.map((e) => e.pinLabel)),
  };
}

export async function getPinsData(prisma: PrismaClient, query?: string) {
  const pins = (await prisma.pinCode.findMany({
    where: query
      ? { label: { contains: query, mode: 'insensitive' } }
      : undefined,
    orderBy: { createdAt: 'desc' },
  })) as Array<{
    id: string;
    label: string | null;
    code: string | null;
    shortCode: string | null;
    accessAll: boolean;
    expiresAt: Date | null;
  }>;

  return pins.map((pin) => ({
    id: pin.id,
    label: pin.label,
    code: pin.code,
    shortCode: pin.shortCode,
    accessAll: pin.accessAll,
    expiresAt: pin.expiresAt?.toISOString() || null,
  }));
}

export async function getPinSummaryData(
  prisma: PrismaClient,
  pinValue: string,
  dateString: string
) {
  const pin = await prisma.pinCode.findFirst({
    where: {
      OR: [{ code: pinValue }, { shortCode: pinValue }],
    },
  });

  if (!pin) {
    return null;
  }

  const { startUtc, endUtc } = getMoscowDayRangeUtc(dateString);
  const usages = (await prisma.pinUsage.findMany({
    where: {
      pinCodeId: pin.id,
      createdAt: { gte: startUtc, lt: endUtc },
    },
    orderBy: { createdAt: 'desc' },
  })) as Array<{
    ip: string;
    success: boolean;
    path: string | null;
    createdAt: Date;
  }>;

  const total = usages.length;
  const successCount = usages.filter((u) => u.success).length;
  const uniqueIps = new Set(usages.map((u) => u.ip));
  const topPaths = buildPathCounts(usages.map((u) => u.path || null)).slice(
    0,
    6
  );
  const lastEntries = usages.slice(0, 8).map((u) => ({
    at: u.createdAt.toISOString(),
    ip: u.ip,
    success: u.success,
    path: u.path,
  }));

  return {
    pin: {
      id: pin.id,
      label: pin.label,
      code: pin.code,
      shortCode: pin.shortCode,
    },
    date: dateString,
    total,
    successCount,
    uniqueIps: uniqueIps.size,
    topPaths,
    lastEntries,
  };
}

export async function getSessionsData(
  prisma: PrismaClient,
  dateString: string
) {
  const { startUtc, endUtc } = getMoscowDayRangeUtc(dateString);
  const sessions = (await prisma.monitoringSession.findMany({
    where: {
      lastEventAt: { gte: startUtc, lt: endUtc },
    },
    orderBy: { lastEventAt: 'desc' },
    take: 200,
  })) as Array<{
    id: string;
    ip: string;
    pinLabel: string | null;
    startedAt: Date;
    lastEventAt: Date;
    actionsJson: string;
  }>;

  return sessions.map((session) => {
    let actions: Array<{ path: string; action: string; at: string }> = [];
    try {
      actions = JSON.parse(session.actionsJson || '[]');
    } catch {
      actions = [];
    }

    return {
      id: session.id,
      ip: session.ip,
      pinLabel: session.pinLabel,
      startedAt: session.startedAt.toISOString(),
      lastEventAt: session.lastEventAt.toISOString(),
      actions: buildPathCounts(actions.map((a) => a.path)),
    };
  });
}

async function buildDailySummary(prisma: PrismaClient, dateString: string) {
  const data = await getDailySummaryData(prisma, dateString);
  const topPaths = data.topPaths
    .map((item) => `• ${item.path} — ${item.count}`)
    .join('\n');

  return [
    `📊 Сводка за ${dateString} (МСК)`,
    `• Всего действий: ${data.total}`,
    `• Уникальных IP: ${data.uniqueIps}`,
    '• По PIN-кодам:',
    buildPinUsageSummary(data.pinUsage),
    '• Топ страниц:',
    topPaths || '• нет данных',
  ].join('\n');
}

async function buildIpSummary(
  prisma: PrismaClient,
  ip: string,
  dateString: string
) {
  const data = await getIpSummaryData(prisma, ip, dateString);
  const lines = summarizeActions(data.actions.map((event) => ({ path: event.path })));
  return [
    `📍 IP: ${ip}`,
    `Дата: ${dateString} (МСК)`,
    `• Всего действий: ${data.total}`,
    '• По PIN-кодам:',
    buildPinUsageSummary(data.pinUsage),
    '• Действия:',
    lines,
  ].join('\n');
}

async function buildPinsList(prisma: PrismaClient, query?: string) {
  const pins = (await prisma.pinCode.findMany({
    where: query
      ? { label: { contains: query, mode: 'insensitive' } }
      : undefined,
    orderBy: { createdAt: 'desc' },
  })) as Array<{
    label: string | null;
    shortCode: string | null;
    code: string | null;
  }>;

  if (!pins.length) {
    return query
      ? `PIN-коды по запросу "${query}" не найдены.`
      : 'PIN-коды не найдены.';
  }

  return [
    query ? `🔎 PIN-коды по запросу "${query}":` : '📌 PIN-коды:',
    ...pins.map((pin) => {
      const label = pin.label || 'Без названия';
      const shortCode = pin.shortCode ? `short: ${pin.shortCode}` : '';
      const code = pin.code ? `code: ${pin.code}` : '';
      const parts = [label, shortCode, code].filter(Boolean).join(' | ');
      return `• ${parts}`;
    }),
  ].join('\n');
}

async function buildPinSummary(
  prisma: PrismaClient,
  pinValue: string,
  dateString: string
) {
  const pin = await prisma.pinCode.findFirst({
    where: {
      OR: [{ code: pinValue }, { shortCode: pinValue }],
    },
  });

  if (!pin) {
    return `PIN-код "${pinValue}" не найден.`;
  }

  const { startUtc, endUtc } = getMoscowDayRangeUtc(dateString);
  const usages = (await prisma.pinUsage.findMany({
    where: {
      pinCodeId: pin.id,
      createdAt: { gte: startUtc, lt: endUtc },
    },
    orderBy: { createdAt: 'desc' },
  })) as Array<{
    ip: string;
    success: boolean;
    path: string | null;
    createdAt: Date;
  }>;

  const total = usages.length;
  const successCount = usages.filter((u) => u.success).length;
  const uniqueIps = new Set(usages.map((u) => u.ip));
  const pathCounts = new Map<string, number>();
  usages.forEach((usage) => {
    if (!usage.path) return;
    pathCounts.set(usage.path, (pathCounts.get(usage.path) || 0) + 1);
  });

  const topPaths = buildPathCounts(usages.map((usage) => usage.path || null))
    .slice(0, 6)
    .map((item) => `• ${item.path} — ${item.count}`)
    .join('\n');

  const lastEntries = usages.slice(0, 8).map((u) => {
    const time = formatDateTime(u.createdAt);
    const status = u.success ? 'успех' : 'ошибка';
    return `• ${time} | ${u.ip} | ${status}${u.path ? ` | ${u.path}` : ''}`;
  });

  return [
    `🔐 PIN: ${pin.code || pin.shortCode || pinValue}`,
    `Название: ${pin.label || 'Без названия'}`,
    `Дата: ${dateString} (МСК)`,
    `• Всего попыток: ${total}`,
    `• Успешных: ${successCount}`,
    `• Уникальных IP: ${uniqueIps.size}`,
    '• Топ страниц:',
    topPaths || '• нет данных',
    '• Последние события:',
    lastEntries.length ? lastEntries.join('\n') : '• нет данных',
  ].join('\n');
}

async function handleBotCommand(
  prisma: PrismaClient,
  settings: MonitoringSettings,
  chatId: number,
  text: string
) {
  const normalized = text.trim();
  const [command, ...rest] = normalized.split(/\s+/);
  const arg = rest.join(' ').trim();

  if (command === '/help' || command === '/start') {
    const help = [
      'Команды мониторинга:',
      '• /summary [YYYY-MM-DD] — сводка за день',
      '• /ip <ip> [YYYY-MM-DD] — сводка по IP',
      '• /pins [поиск] — список PIN-кодов',
      '• /pin <code|short> [YYYY-MM-DD] — сводка по PIN-коду',
    ].join('\n');
    await sendMessage(settings.botToken as string, chatId, help, buildMainKeyboard());
    return;
  }

  if (command === '/summary') {
    const dateString = arg || getMoscowDateString();
    const summary = await buildDailySummary(prisma, dateString);
    await sendMessage(settings.botToken as string, chatId, summary, buildMainKeyboard());
    return;
  }

  if (command === '/ip') {
    const [ip, dateInput] = arg.split(/\s+/);
    if (!ip) {
      await sendMessage(
        settings.botToken as string,
        chatId,
        'Использование: /ip <ip> [YYYY-MM-DD]'
      );
      return;
    }
    const dateString = dateInput || getMoscowDateString();
    const summary = await buildIpSummary(prisma, ip, dateString);
    await sendMessage(settings.botToken as string, chatId, summary);
    return;
  }

  if (command === '/pins') {
    const list = await buildPinsList(prisma, arg || undefined);
    await sendMessage(settings.botToken as string, chatId, list, buildMainKeyboard());
    return;
  }

  if (command === '/pin') {
    const [pinValue, dateInput] = arg.split(/\s+/);
    if (!pinValue) {
      await sendMessage(
        settings.botToken as string,
        chatId,
        'Использование: /pin <code|short> [YYYY-MM-DD]'
      );
      return;
    }
    const dateString = dateInput || getMoscowDateString();
    const summary = await buildPinSummary(prisma, pinValue, dateString);
    await sendMessage(settings.botToken as string, chatId, summary);
    return;
  }

  await sendMessage(
    settings.botToken as string,
    chatId,
    'Неизвестная команда. Напишите /help.',
    buildMainKeyboard()
  );
}

async function handleCallbackQuery(
  prisma: PrismaClient,
  settings: MonitoringSettings,
  chatId: number,
  data?: string
) {
  if (!data) return;
  const [scope, value, dateToken] = data.split(':');

  if (scope === 'help') {
    await handleBotCommand(prisma, settings, chatId, '/help');
    return;
  }

  if (scope === 'summary') {
    const dateString = parseCallbackDate(value);
    const summary = await buildDailySummary(prisma, dateString);
    await sendMessage(settings.botToken as string, chatId, summary, buildMainKeyboard());
    return;
  }

  if (scope === 'pins') {
    const list = await buildPinsList(prisma);
    await sendMessage(settings.botToken as string, chatId, list, buildMainKeyboard());
    return;
  }

  if (scope === 'ip') {
    const dateString = parseCallbackDate(dateToken);
    const summary = await buildIpSummary(prisma, value, dateString);
    await sendMessage(settings.botToken as string, chatId, summary);
  }
}

async function processTelegramUpdates(
  prisma: PrismaClient,
  settings: MonitoringSettings,
  offset: number
): Promise<number> {
  if (!settings.botToken) return offset;
  const updates = await callTelegramApi<TelegramUpdate[]>(
    settings.botToken,
    'getUpdates',
    {
      offset,
      timeout: BOT_POLL_TIMEOUT_SEC,
      allowed_updates: ['message', 'callback_query'],
    }
  );

  for (const update of updates) {
    const message = update.message;
    const callback = update.callback_query;
    const chatId = message?.chat?.id || callback?.message?.chat?.id;
    if (!chatId) {
      offset = update.update_id + 1;
      continue;
    }

    if (!settings.allowedChatIds.includes(chatId)) {
      offset = update.update_id + 1;
      continue;
    }

    if (message?.text) {
      await handleBotCommand(prisma, settings, chatId, message.text);
    }

    if (callback?.data) {
      await handleCallbackQuery(prisma, settings, chatId, callback.data);
      await callTelegramApi(settings.botToken, 'answerCallbackQuery', {
        callback_query_id: callback.id,
      });
    }

    offset = update.update_id + 1;
  }

  return offset;
}

async function flushSessions(prisma: PrismaClient) {
  const now = new Date();
  const cutoff = new Date(now.getTime() - SESSION_WINDOW_MS);
  const sessions = await prisma.monitoringSession.findMany({
    where: {
      reportedAt: null,
      lastEventAt: { lt: cutoff },
    },
    orderBy: { lastEventAt: 'asc' },
    take: 50,
  });

  if (!sessions.length) return;

  const settings = await getMonitoringSettings(prisma);
  for (const session of sessions) {
    const actions = (() => {
      try {
        return JSON.parse(session.actionsJson || '[]') as Array<{
          path: string;
          action: string;
          at: string;
        }>;
      } catch {
        return [];
      }
    })();

    const dateString = getMoscowDateString(session.lastEventAt);
    const pinLabel = session.pinLabel || 'Без PIN';

    const message = [
      '✅ Сессия завершена (3 минуты без активности)',
      `IP: ${session.ip}`,
      `PIN: ${pinLabel}`,
      `Начало: ${formatDateTime(session.startedAt)}`,
      `Конец: ${formatDateTime(session.lastEventAt)}`,
      'Действия:',
      summarizeActions(actions.map((a) => ({ path: a.path }))),
    ].join('\n');

    await sendToAllowed(settings, message, buildSessionKeyboard(session.ip, dateString));

    await prisma.monitoringSession.update({
      where: { id: session.id },
      data: { reportedAt: new Date() },
    });
  }
}

async function maybeSendDailySummary(prisma: PrismaClient) {
  const settings = await getMonitoringSettings(prisma);
  if (!settings.enabled) return;
  if (!settings.botToken || !settings.allowedChatIds.length) return;

  const { hour, minute } = getMoscowDateParts();
  if (hour !== settings.dailySummaryHour) return;
  if (minute > 5) return;

  const today = getMoscowDateString();
  if (settings.lastDailySummaryDate === today) return;

  const summary = await buildDailySummary(prisma, today);
  await sendToAllowed(settings, summary, buildMainKeyboard());
  await updateMonitoringSettings(prisma, { lastDailySummaryDate: today });
}

export async function recordVisitEvent(
  prisma: PrismaClient,
  input: {
    ip: string;
    path: string;
    action: string;
    userAgent?: string | null;
    pinId?: string | null;
  }
) {
  const now = new Date();
  const path = input.path.slice(0, 512);
  const action = input.action.slice(0, 64);
  let pinLabel: string | null = null;
  if (input.pinId) {
    const pin = await prisma.pinCode.findUnique({
      where: { id: input.pinId },
      select: { label: true },
    });
    pinLabel = pin?.label || null;
  }

  await prisma.monitoringEvent.create({
    data: {
      ip: input.ip,
      path,
      action,
      userAgent: input.userAgent || null,
      pinId: input.pinId || null,
      pinLabel,
      createdAt: now,
    },
  });

  const cutoff = new Date(now.getTime() - SESSION_WINDOW_MS);
  const existing = await prisma.monitoringSession.findFirst({
    where: {
      ip: input.ip,
      reportedAt: null,
      lastEventAt: { gt: cutoff },
    },
    orderBy: { lastEventAt: 'desc' },
  });

  if (!existing) {
    await prisma.monitoringSession.create({
      data: {
        ip: input.ip,
        startedAt: now,
        lastEventAt: now,
        actionsJson: JSON.stringify([
          { path, action, at: now.toISOString() },
        ]),
        userAgent: input.userAgent || null,
        pinId: input.pinId || null,
        pinLabel,
      },
    });
    return;
  }

  let actions: Array<{ path: string; action: string; at: string }> = [];
  try {
    actions = JSON.parse(existing.actionsJson || '[]');
  } catch {
    actions = [];
  }
  actions.push({ path, action, at: now.toISOString() });
  const trimmed = actions.slice(-50);

  await prisma.monitoringSession.update({
    where: { id: existing.id },
    data: {
      lastEventAt: now,
      actionsJson: JSON.stringify(trimmed),
      userAgent: input.userAgent || existing.userAgent,
      pinId: input.pinId || existing.pinId,
      pinLabel: pinLabel || existing.pinLabel,
    },
  });
}

export async function sendMonitoringTest(prisma: PrismaClient) {
  const settings = await getMonitoringSettings(prisma);
  await sendToAllowed(
    settings,
    '🤖 Бот мониторинга активен.',
    buildMainKeyboard()
  );
}

export function startMonitoringService(prisma: PrismaClient) {
  const globalKey = '__monitoring_service_started__';
  const g = globalThis as unknown as Record<string, boolean | undefined>;
  if (g[globalKey]) return;
  g[globalKey] = true;

  let offset = 0;
  let stopped = false;

  const pollBot = async () => {
    if (stopped) return;
    try {
      const settings = await getMonitoringSettings(prisma);
      if (settings.enabled && settings.botToken) {
        offset = await processTelegramUpdates(prisma, settings, offset);
      }
    } catch (err) {
      logger.warn({ err }, 'Telegram bot poll failed');
    } finally {
      if (!stopped) {
        setTimeout(pollBot, BOT_POLL_RETRY_MS);
      }
    }
  };

  const sessionTimer = setInterval(() => {
    flushSessions(prisma).catch((err) =>
      logger.warn({ err }, 'Failed to flush sessions')
    );
    maybeSendDailySummary(prisma).catch((err) =>
      logger.warn({ err }, 'Failed to send daily summary')
    );
  }, SESSION_POLL_MS);

  pollBot();

  return () => {
    stopped = true;
    clearInterval(sessionTimer);
  };
}
