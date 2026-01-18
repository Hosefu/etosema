import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../../db/prisma';
import {
  getDailySummaryData,
  getIpSummaryData,
  getMonitoringSettings,
  getPinsData,
  getPinSummaryData,
  getSessionsData,
  updateMonitoringSettings,
  recordVisitEvent,
} from './monitoring.service';
import { RequestWithPin } from '../../types/api';

const router = Router();

const getClientIp = (req: RequestWithPin) => {
  const ipHeader = req.headers['x-forwarded-for'];
  const ipFromHeader =
    typeof ipHeader === 'string' ? ipHeader.split(',')[0].trim() : '';
  const raw = ipFromHeader || req.ip || 'unknown';
  return raw.startsWith('::ffff:') ? raw.replace('::ffff:', '') : raw;
};

const ensureAllowedIp = async (req: RequestWithPin, res: Response) => {
  const settings = await getMonitoringSettings(prisma);
  if (!settings.allowedIps.length) return true;
  const ip = getClientIp(req);
  if (settings.allowedIps.includes(ip)) return true;
  res.status(403).json({
    error: {
      code: 'forbidden',
      message: 'Access denied',
    },
  });
  return false;
};

/**
 * POST /api/public/track
 * Track public page activity.
 */
router.post('/track', async (req: RequestWithPin, res: Response) => {
  const path = typeof req.body?.path === 'string' ? req.body.path : '';
  const action = typeof req.body?.action === 'string' ? req.body.action : 'view';
  const ip = getClientIp(req);
  const userAgent = req.get('user-agent') || null;

  if (!path) {
    res.status(400).json({
      error: {
        code: 'invalid_request',
        message: 'path is required',
      },
    });
    return;
  }

  await recordVisitEvent(prisma, {
    ip,
    path,
    action,
    userAgent,
    pinId: req.pinContext?.pinId || null,
  });
  res.json({ success: true });
});

/**
 * GET /api/public/monitoring/summary
 */
router.get('/monitoring/summary', async (req: RequestWithPin, res: Response) => {
  if (!(await ensureAllowedIp(req, res))) return;
  const date =
    typeof req.query?.date === 'string' ? req.query.date : undefined;
  const dateString = date || new Date().toISOString().slice(0, 10);
  const data = await getDailySummaryData(prisma, dateString);
  res.json({ success: true, data });
});

/**
 * GET /api/public/monitoring/ip/:ip
 */
router.get('/monitoring/ip/:ip', async (req: RequestWithPin, res: Response) => {
  if (!(await ensureAllowedIp(req, res))) return;
  const date =
    typeof req.query?.date === 'string' ? req.query.date : undefined;
  const dateString = date || new Date().toISOString().slice(0, 10);
  const data = await getIpSummaryData(prisma, req.params.ip, dateString);
  res.json({ success: true, data });
});

/**
 * GET /api/public/monitoring/sessions
 */
router.get(
  '/monitoring/sessions',
  async (req: RequestWithPin, res: Response) => {
    if (!(await ensureAllowedIp(req, res))) return;
    const date =
      typeof req.query?.date === 'string' ? req.query.date : undefined;
    const dateString = date || new Date().toISOString().slice(0, 10);
    const data = await getSessionsData(prisma, dateString);
    res.json({ success: true, data });
  }
);

/**
 * GET /api/public/monitoring/pins
 */
router.get('/monitoring/pins', async (req: RequestWithPin, res: Response) => {
  if (!(await ensureAllowedIp(req, res))) return;
  const query =
    typeof req.query?.query === 'string' ? req.query.query : undefined;
  const data = await getPinsData(prisma, query);
  res.json({ success: true, data });
});

/**
 * GET /api/public/monitoring/cases
 */
router.get('/monitoring/cases', async (req: RequestWithPin, res: Response) => {
  if (!(await ensureAllowedIp(req, res))) return;
  const onlyNda = req.query?.nda === '1';
  const cases = await prisma.case.findMany({
    where: onlyNda ? { isNda: true } : undefined,
    orderBy: { year: 'desc' },
    select: { id: true, title: true, isNda: true },
  });
  res.json({ success: true, data: cases });
});

/**
 * POST /api/public/monitoring/pins
 */
router.post('/monitoring/pins', async (req: RequestWithPin, res: Response) => {
  if (!(await ensureAllowedIp(req, res))) return;
  const { code, label, shortCode, accessAll, expiresAt, caseIds } =
    req.body as {
      code?: string;
      label?: string | null;
      shortCode?: string | null;
      accessAll?: boolean;
      expiresAt?: string | null;
      caseIds?: string[];
    };

  if (!code || typeof code !== 'string') {
    res.status(400).json({
      error: { code: 'invalid_request', message: 'PIN code is required' },
    });
    return;
  }

  if (!accessAll && (!caseIds || caseIds.length === 0)) {
    res.status(400).json({
      error: {
        code: 'invalid_request',
        message: 'Case list is required for non-all PIN',
      },
    });
    return;
  }

  const codeHash = await bcrypt.hash(code, 10);
  try {
    const pin = await prisma.pinCode.create({
      data: {
        label: label || null,
        code,
        shortCode: shortCode || null,
        codeHash,
        accessAll: Boolean(accessAll),
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        cases: accessAll
          ? undefined
          : {
              create: (caseIds || []).map((caseId) => ({ caseId })),
            },
      },
    });

    res.json({ success: true, data: pin });
  } catch (error) {
    res.status(400).json({
      error: {
        code: 'create_failed',
        message: 'Failed to create PIN',
      },
    });
  }
});

/**
 * DELETE /api/public/monitoring/pins/:id
 */
router.delete(
  '/monitoring/pins/:id',
  async (req: RequestWithPin, res: Response) => {
    if (!(await ensureAllowedIp(req, res))) return;
    try {
      await prisma.pinCode.delete({ where: { id: req.params.id } });
      res.json({ success: true });
    } catch {
      res.status(400).json({
        error: { code: 'delete_failed', message: 'Failed to delete PIN' },
      });
    }
  }
);

/**
 * GET /api/public/monitoring/pins/:pin/summary
 */
router.get(
  '/monitoring/pins/:pin/summary',
  async (req: RequestWithPin, res: Response) => {
    if (!(await ensureAllowedIp(req, res))) return;
    const date =
      typeof req.query?.date === 'string' ? req.query.date : undefined;
    const dateString = date || new Date().toISOString().slice(0, 10);
    const data = await getPinSummaryData(
      prisma,
      req.params.pin,
      dateString
    );
    if (!data) {
      res.status(404).json({
        error: { code: 'not_found', message: 'PIN not found' },
      });
      return;
    }
    res.json({ success: true, data });
  }
);

/**
 * GET /api/public/monitoring/settings
 */
router.get(
  '/monitoring/settings',
  async (req: RequestWithPin, res: Response) => {
    if (!(await ensureAllowedIp(req, res))) return;
    const data = await getMonitoringSettings(prisma);
    res.json({ success: true, data });
  }
);

/**
 * PUT /api/public/monitoring/settings
 */
router.put(
  '/monitoring/settings',
  async (req: RequestWithPin, res: Response) => {
    if (!(await ensureAllowedIp(req, res))) return;
    const { enabled, botToken, allowedChatIds, allowedIps, dailySummaryHour } =
      req.body as {
        enabled?: boolean;
        botToken?: string | null;
        allowedChatIds?: number[];
        allowedIps?: string[];
        dailySummaryHour?: number;
      };

    const data = await updateMonitoringSettings(prisma, {
      enabled,
      botToken,
      allowedChatIds,
      allowedIps,
      dailySummaryHour,
    });
    res.json({ success: true, data });
  }
);

export default router;
