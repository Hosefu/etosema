import { Router } from 'express';
import { prisma } from '../../db/prisma';
import { verifyAdminToken, AdminRequest } from '../admin/admin.middleware';
import {
  getMonitoringSettings,
  updateMonitoringSettings,
  sendMonitoringTest,
} from './monitoring.service';

const router = Router();

router.use(verifyAdminToken);

/**
 * GET /api/admin/monitoring/settings
 */
router.get('/settings', async (req: AdminRequest, res) => {
  const settings = await getMonitoringSettings(prisma);
  res.json({ success: true, data: settings });
});

/**
 * PUT /api/admin/monitoring/settings
 */
router.put('/settings', async (req: AdminRequest, res) => {
  const { enabled, botToken, allowedChatIds, dailySummaryHour } = req.body as {
    enabled?: boolean;
    botToken?: string | null;
    allowedChatIds?: number[];
    dailySummaryHour?: number;
  };

  const settings = await updateMonitoringSettings(prisma, {
    enabled,
    botToken,
    allowedChatIds,
    dailySummaryHour,
  });
  res.json({ success: true, data: settings });
});

/**
 * POST /api/admin/monitoring/test
 */
router.post('/test', async (req: AdminRequest, res) => {
  await sendMonitoringTest(prisma);
  res.json({ success: true });
});

export default router;
