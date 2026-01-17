import { prisma } from '../../db/prisma';
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
  text: string
) {
  await callTelegramApi(botToken, 'sendMessage', { chat_id: chatId, text });
}

async function sendToAllowed(
  settings: MonitoringSettings,
  text: string
): Promise<void> {
  if (!settings.enabled) return;
  if (!settings.botToken) return;
  if (!settings.allowedChatIds.length) return;

  await Promise.all(
    settings.allowedChatIds.map((chatId) =>
      sendMessage(settings.botToken as string, chatId, text).catch((err) => {
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
    .map(([path, count]) => `- ${path} (${count})`);

  return lines.length ? lines.join('\n') : '- нет данных';
};

async function buildDailySummary(prisma: PrismaClient, dateString: string) {
  const { startUtc, endUtc } = getMoscowDayRangeUtc(dateString);
  const events = (await prisma.monitoringEvent.findMany({
    where: { createdAt: { gte: startUtc, lt: endUtc } },
  })) as Array<{ ip: string; path: string }>;
  const total = events.length;
  const uniqueIps = new Set(events.map((e) => e.ip));
  const pathCounts = new Map<string, number>();
  events.forEach((event) => {
    pathCounts.set(event.path, (pathCounts.get(event.path) || 0) + 1);
  });
  const topPaths = Array.from(pathCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([path, count]) => `- ${path} (${count})`)
    .join('\n');

  return [
    `Сводка за ${dateString} (МСК)`,
    `Всего действий: ${total}`,
    `Уникальных IP: ${uniqueIps.size}`,
    'Топ страниц:',
    topPaths || '- нет данных',
  ].join('\n');
}

async function buildIpSummary(
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
  })) as Array<{ path: string }>;
  const lines = summarizeActions(events.map((event) => ({ path: event.path })));
  return [
    `Сводка по IP ${ip} за ${dateString} (МСК)`,
    `Всего действий: ${events.length}`,
    'Действия:',
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
    query ? `PIN-коды по запросу "${query}":` : 'PIN-коды:',
    ...pins.map((pin) => {
      const label = pin.label || 'Без названия';
      const shortCode = pin.shortCode ? `short: ${pin.shortCode}` : '';
      const code = pin.code ? `code: ${pin.code}` : '';
      const parts = [label, shortCode, code].filter(Boolean).join(' | ');
      return `- ${parts}`;
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

  const topPaths = Array.from(pathCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([path, count]) => `- ${path} (${count})`)
    .join('\n');

  const lastEntries = usages.slice(0, 8).map((u) => {
    const time = formatDateTime(u.createdAt);
    const status = u.success ? 'успех' : 'ошибка';
    return `- ${time} | ${u.ip} | ${status}${u.path ? ` | ${u.path}` : ''}`;
  });

  return [
    `Сводка по PIN-коду "${pin.code || pin.shortCode || pinValue}" за ${dateString} (МСК)`,
    `Название: ${pin.label || 'Без названия'}`,
    `Всего попыток: ${total}`,
    `Успешных: ${successCount}`,
    `Уникальных IP: ${uniqueIps.size}`,
    'Топ страниц:',
    topPaths || '- нет данных',
    'Последние события:',
    lastEntries.length ? lastEntries.join('\n') : '- нет данных',
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
      '/summary [YYYY-MM-DD] — сводка за день (по умолчанию сегодня)',
      '/ip <ip> [YYYY-MM-DD] — сводка по IP за день',
      '/pins [поиск] — список PIN-кодов по названию',
      '/pin <code|short> [YYYY-MM-DD] — сводка по PIN-коду',
    ].join('\n');
    await sendMessage(settings.botToken as string, chatId, help);
    return;
  }

  if (command === '/summary') {
    const dateString = arg || getMoscowDateString();
    const summary = await buildDailySummary(prisma, dateString);
    await sendMessage(settings.botToken as string, chatId, summary);
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
    await sendMessage(settings.botToken as string, chatId, list);
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
    'Неизвестная команда. Напишите /help.'
  );
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
      allowed_updates: ['message'],
    }
  );

  for (const update of updates) {
    const message = update.message;
    const chatId = message?.chat?.id;
    if (!message || !chatId) {
      offset = update.update_id + 1;
      continue;
    }

    if (!settings.allowedChatIds.includes(chatId)) {
      offset = update.update_id + 1;
      continue;
    }

    if (message.text) {
      await handleBotCommand(prisma, settings, chatId, message.text);
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

    const message = [
      'Посещение завершено (нет активности 3 минуты)',
      `IP: ${session.ip}`,
      `Начало: ${formatDateTime(session.startedAt)}`,
      `Конец: ${formatDateTime(session.lastEventAt)}`,
      'Действия:',
      summarizeActions(actions.map((a) => ({ path: a.path }))),
    ].join('\n');

    await sendToAllowed(settings, message);

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
  await sendToAllowed(settings, summary);
  await updateMonitoringSettings(prisma, { lastDailySummaryDate: today });
}

export async function recordVisitEvent(
  prisma: PrismaClient,
  input: {
    ip: string;
    path: string;
    action: string;
    userAgent?: string | null;
  }
) {
  const now = new Date();
  const path = input.path.slice(0, 512);
  const action = input.action.slice(0, 64);

  await prisma.monitoringEvent.create({
    data: {
      ip: input.ip,
      path,
      action,
      userAgent: input.userAgent || null,
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
    },
  });
}

export async function sendMonitoringTest(prisma: PrismaClient) {
  const settings = await getMonitoringSettings(prisma);
  await sendToAllowed(settings, 'Тестовое сообщение: бот мониторинга активен.');
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
