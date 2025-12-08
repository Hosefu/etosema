/**
 * Rate Limiting Middleware for PIN Attempts
 *
 * Prevents brute-force attacks on PIN codes by limiting failed attempts per IP.
 * Blocks IPs that have made too many failed attempts within the time window.
 */

import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../db/prisma';
import { config } from '../../config/env';
import { ApiResponse, ErrorCode } from '../../types/api';

/**
 * Extract IP address from request
 * Handles both direct connections and proxied requests
 */
function getClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];

  if (forwarded) {
    const ips = Array.isArray(forwarded) ? forwarded[0] : forwarded;
    return ips.split(',')[0].trim();
  }

  return req.socket.remoteAddress || 'unknown';
}

/**
 * Middleware to check PIN attempt rate limit
 *
 * Blocks requests if the IP has exceeded the maximum number of failed
 * PIN attempts within the configured time window.
 *
 * Configuration:
 * - Max attempts: config.rateLimit.maxAttempts (default: 8)
 * - Time window: config.rateLimit.windowMs (default: 1 hour)
 */
export async function checkPinRateLimit(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const ip = getClientIp(req);
  const windowStart = new Date(Date.now() - config.rateLimit.windowMs);

  try {
    // Count failed attempts from this IP within the time window
    const failedAttempts = await prisma.pinUsage.count({
      where: {
        ip,
        success: false,
        createdAt: {
          gte: windowStart,
        },
      },
    });

    // Check if limit exceeded
    if (failedAttempts >= config.rateLimit.maxAttempts) {
      const response: ApiResponse = {
        error: {
          code: ErrorCode.TOO_MANY_ATTEMPTS,
          message: 'Too many failed PIN attempts. Please try again later.',
          details: {
            retryAfter: Math.ceil(config.rateLimit.windowMs / 1000 / 60), // minutes
          },
        },
      };

      // Set Retry-After header (in seconds)
      res.set(
        'Retry-After',
        String(Math.ceil(config.rateLimit.windowMs / 1000))
      );

      res.status(429).json(response);
      return;
    }

    // Rate limit check passed
    next();
  } catch (error) {
    console.error('Rate limit check failed:', error);

    // On error, allow the request to proceed (fail open)
    // This prevents database issues from completely blocking the API
    next();
  }
}

/**
 * Log a PIN usage attempt
 *
 * @param ip - Client IP address
 * @param userAgent - Client user agent string
 * @param pinCodeId - PIN code ID if valid, null if invalid
 * @param success - Whether the PIN was correct
 * @param path - The path accessed
 */
export async function logPinAttempt(
  ip: string,
  userAgent: string | undefined,
  pinCodeId: string | null,
  success: boolean,
  path?: string
): Promise<void> {
  try {
    await prisma.pinUsage.create({
      data: {
        ip,
        userAgent: userAgent || null,
        pinCodeId,
        success,
        path,
      },
    });
  } catch (error) {
    console.error('Failed to log PIN attempt:', error);
    // Don't throw - logging failure shouldn't break the request
  }
}

/**
 * Log a view event (page view)
 */
export async function logPinView(
  req: Request,
  pinCodeId: string,
  path: string
): Promise<void> {
  const ip = getClientIp(req);
  const userAgent = req.headers['user-agent'];
  await logPinAttempt(ip, userAgent, pinCodeId, true, path);
}
