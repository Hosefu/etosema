/**
 * PIN Authentication Middleware
 *
 * Handles PIN session validation and attaches PIN context to requests.
 */

import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../config/env';
import { RequestWithPin, PinContext, PinSessionData } from '../../types/api';
import { prisma } from '../../db/prisma';

/**
 * Middleware to attach PIN context to request
 *
 * Reads the pinSession cookie, validates it, and populates req.pinContext
 * with the user's access rights (which NDA cases they can view).
 *
 * This middleware does NOT block requests - it only adds context.
 * Individual routes decide whether to enforce PIN requirements.
 */
export async function attachPinContext(
  req: RequestWithPin,
  res: Response,
  next: NextFunction
): Promise<void> {
  // Initialize empty context
  req.pinContext = {
    accessAll: false,
    caseIds: [],
  };

  try {
    // Read PIN session from Authorization header or cookie
    let token: string | undefined;

    // Check Authorization header first (Bearer token)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else {
      // Fallback to cookie for backward compatibility
      token = req.cookies[config.pinSession.cookieName];
    }

    if (!token) {
      // No session token - user has no PIN access
      next();
      return;
    }

    // Verify and decode JWT
    const decoded = jwt.verify(
      token,
      config.secrets.pinSession
    ) as PinSessionData;

    if (!decoded.pinId) {
      next();
      return;
    }

    // Load PIN code details
    const pinCode = await prisma.pinCode.findUnique({
      where: { id: decoded.pinId },
      include: {
        cases: {
          select: {
            caseId: true,
          },
        },
      },
    });

    if (!pinCode) {
      // PIN code no longer exists - clear cookie
      res.clearCookie(config.pinSession.cookieName);
      next();
      return;
    }

    // Check expiration
    if (pinCode.expiresAt && pinCode.expiresAt < new Date()) {
      // PIN expired - clear cookie
      res.clearCookie(config.pinSession.cookieName);
      next();
      return;
    }

    // Populate context
    req.pinContext = {
      pinId: pinCode.id,
      accessAll: pinCode.accessAll,
      caseIds: pinCode.cases.map((c) => c.caseId),
    };

    next();
  } catch (error) {
    // Invalid token - clear cookie and continue with empty context
    if (error instanceof jwt.JsonWebTokenError) {
      res.clearCookie(config.pinSession.cookieName);
    } else {
      console.error('Error in attachPinContext:', error);
    }

    next();
  }
}

/**
 * Check if a case is accessible based on PIN context
 *
 * @param caseId - Case ID to check
 * @param isNda - Whether the case is NDA-protected
 * @param pinContext - PIN context from request
 * @returns true if accessible, false otherwise
 */
export function isCaseAccessible(
  caseId: string,
  isNda: boolean,
  pinContext?: PinContext
): boolean {
  // Public cases are always accessible
  if (!isNda) {
    return true;
  }

  // NDA case - need PIN access
  if (!pinContext) {
    return false;
  }

  // Check if PIN grants access to all cases or specifically to this case
  return pinContext.accessAll || pinContext.caseIds.includes(caseId);
}
