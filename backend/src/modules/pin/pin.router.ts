/**
 * PIN Router
 *
 * Routes for PIN code application and session management.
 */

import { Router, Response } from 'express';
import { z } from 'zod';
import { RequestWithPin, ApiResponse, ErrorCode, ApplyPinRequest } from '../../types/api';
import { checkPinRateLimit, logPinAttempt } from '../security/rateLimit.middleware';
import { applyPin, getPinStatus, applyPinById } from './pin.service';
import { prisma } from '../../db/prisma';

const router = Router();

// ============================================================================
// VALIDATION SCHEMAS
// ============================================================================

const applyPinSchema = z.object({
  pin: z.string().min(1, 'PIN is required').max(20),
});

const applyShortCodeSchema = z.object({
  shortCode: z.string().min(1),
});

// ============================================================================
// ROUTES
// ============================================================================

/**
 * POST /api/public/pin/apply-by-shortcode
 */
router.post('/apply-by-shortcode', async (req: RequestWithPin, res: Response) => {
  try {
    const validation = applyShortCodeSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({ error: { code: ErrorCode.VALIDATION_ERROR, message: 'Invalid short code' } });
      return;
    }

    const { shortCode } = validation.data;
    const pin = await prisma.pinCode.findUnique({ where: { shortCode } });

    if (!pin) {
      res.status(404).json({ error: { code: ErrorCode.NOT_FOUND, message: 'Pin not found' } });
      return;
    }

    const data = await applyPinById(pin.id, res);
    
    const ip = req.socket.remoteAddress || 'unknown';
    const userAgent = req.headers['user-agent'];
    await logPinAttempt(ip, userAgent, pin.id, true, '/shortlink/' + shortCode);

    res.json({ data });
  } catch (error) {
    console.error('Error applying short code:', error);
    res.status(500).json({ error: { code: ErrorCode.INTERNAL_ERROR, message: 'Internal error' } });
  }
});

/**
 * POST /api/public/pin/apply
 *
 * Apply a PIN code to gain access to NDA-protected cases.
 *
 * Body:
 *   - pin: string - The PIN code to apply
 *
 * Response (success):
 *   - pinId: string
 *   - accessAll: boolean
 *   - caseSlugs: string[]
 *   - expiresAt?: string (ISO date)
 *
 * Errors:
 *   - 400: Invalid PIN
 *   - 429: Too many attempts
 */
router.post('/apply', checkPinRateLimit, async (req: RequestWithPin, res: Response) => {
  try {
    // Validate request body
    const validation = applyPinSchema.safeParse(req.body);

    if (!validation.success) {
      const response: ApiResponse = {
        error: {
          code: ErrorCode.VALIDATION_ERROR,
          message: validation.error.errors[0].message,
        },
      };
      res.status(400).json(response);
      return;
    }

    const { pin } = validation.data as ApplyPinRequest;

    // Get client info for logging
    const ip = req.socket.remoteAddress || 'unknown';
    const userAgent = req.headers['user-agent'];

    try {
      // Attempt to apply PIN
      const data = await applyPin(pin, res);

      // Log successful attempt
      await logPinAttempt(ip, userAgent, data.pinId, true);

      const response: ApiResponse = { data };
      res.json(response);
    } catch (error) {
      // Log failed attempt
      await logPinAttempt(ip, userAgent, null, false);

      const response: ApiResponse = {
        error: {
          code: ErrorCode.INVALID_PIN,
          message: 'Invalid PIN code',
        },
      };
      res.status(400).json(response);
    }
  } catch (error) {
    console.error('Error in /pin/apply:', error);

    const response: ApiResponse = {
      error: {
        code: ErrorCode.INTERNAL_ERROR,
        message: 'An error occurred while processing your request',
      },
    };
    res.status(500).json(response);
  }
});

/**
 * GET /api/public/pin/status
 *
 * Get the current PIN session status.
 *
 * Response:
 *   - hasSession: boolean
 *   - accessAll: boolean
 *   - caseSlugs: string[]
 */
router.get('/status', async (req: RequestWithPin, res: Response) => {
  try {
    const data = await getPinStatus(req.pinContext);

    const response: ApiResponse = { data };
    res.json(response);
  } catch (error) {
    console.error('Error in /pin/status:', error);

    const response: ApiResponse = {
      error: {
        code: ErrorCode.INTERNAL_ERROR,
        message: 'An error occurred while processing your request',
      },
    };
    res.status(500).json(response);
  }
});

export default router;
