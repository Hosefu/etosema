import { Router, Request, Response } from 'express';
import { prisma } from '../../db/prisma';
import { recordVisitEvent } from './monitoring.service';

const router = Router();

/**
 * POST /api/public/track
 * Track public page activity.
 */
router.post('/track', async (req: Request, res: Response) => {
  const path = typeof req.body?.path === 'string' ? req.body.path : '';
  const action = typeof req.body?.action === 'string' ? req.body.action : 'view';
  const ipHeader = req.headers['x-forwarded-for'];
  const ipFromHeader =
    typeof ipHeader === 'string' ? ipHeader.split(',')[0].trim() : '';
  const ip = ipFromHeader || req.ip || 'unknown';
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

  await recordVisitEvent(prisma, { ip, path, action, userAgent });
  res.json({ success: true });
});

export default router;
