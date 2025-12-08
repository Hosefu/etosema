/**
 * PIN Service
 *
 * Business logic for PIN code validation and session management.
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { prisma } from '../../db/prisma';
import { config } from '../../config/env';
import {
  ApplyPinResponse,
  PinStatusResponse,
  PinContext,
  PinSessionData,
} from '../../types/api';

/**
 * Hash a PIN code for storage
 *
 * @param pin - Plain text PIN code
 * @returns Bcrypt hash
 */
export async function hashPin(pin: string): Promise<string> {
  return bcrypt.hash(pin, 10);
}

/**
 * Verify a PIN code against stored hash
 *
 * @param pin - Plain text PIN code to verify
 * @param hash - Stored bcrypt hash
 * @returns true if PIN matches, false otherwise
 */
export async function verifyPin(pin: string, hash: string): Promise<boolean> {
  return bcrypt.compare(pin, hash);
}

/**
 * Find a PIN code by verifying against all stored hashes
 *
 * This is necessary because we can't reverse the hash to search by PIN.
 * In practice, the number of PIN codes should be small, so this is acceptable.
 *
 * @param pin - Plain text PIN code
 * @returns PinCode record if found and valid, null otherwise
 */
export async function findPinByCode(pin: string) {
  // Get all PIN codes
  const pinCodes = await prisma.pinCode.findMany({
    include: {
      cases: {
        include: {
          case: {
            select: {
              slug: true,
            },
          },
        },
      },
    },
  });

  // Check each one
  for (const pinCode of pinCodes) {
    const isValid = await verifyPin(pin, pinCode.codeHash);

    if (isValid) {
      // Check expiration
      if (pinCode.expiresAt && pinCode.expiresAt < new Date()) {
        return null; // Expired
      }

      return pinCode;
    }
  }

  return null;
}

/**
 * Create a PIN session cookie
 *
 * @param res - Express response object
 * @param pinId - PIN code ID
 * @param expiresAt - Optional expiration date from PIN code
 */
export function createPinSession(
  res: Response,
  pinId: string,
  expiresAt?: Date | null
): string {
  // Calculate session expiration
  const maxAge = expiresAt
    ? Math.min(expiresAt.getTime() - Date.now(), config.pinSession.maxAge)
    : config.pinSession.maxAge;

  // Create JWT payload
  const payload: PinSessionData = {
    pinId,
  };

  // Sign JWT
  const token = jwt.sign(payload, config.secrets.pinSession, {
    expiresIn: Math.floor(maxAge / 1000), // Convert to seconds
  });

  // Return token instead of setting cookie
  // Client will store it in localStorage and send in Authorization header
  return token;
}

/**
 * Apply a PIN code
 *
 * Validates the PIN and creates a session if valid.
 *
 * @param pin - PIN code to apply
 * @param res - Express response for setting cookie
 * @returns Response data with access information
 * @throws Error if PIN is invalid
 */
export async function applyPin(
  pin: string,
  res: Response
): Promise<ApplyPinResponse> {
  const pinCode = await findPinByCode(pin);

  if (!pinCode) {
    throw new Error('Invalid PIN code');
  }

  // Create session and get token
  const token = createPinSession(res, pinCode.id, pinCode.expiresAt);

  // Build response
  const caseSlugs = pinCode.accessAll
    ? [] // If accessAll, we don't return specific slugs (frontend will show all)
    : pinCode.cases.map((c) => c.case.slug);

  return {
    pinId: pinCode.id,
    token, // Include token in response
    accessAll: pinCode.accessAll,
    caseSlugs,
    expiresAt: pinCode.expiresAt?.toISOString(),
  };
}

/**
 * Apply a PIN code by ID (for short links)
 *
 * @param pinId - PIN code ID
 * @param res - Express response for setting cookie
 */
export async function applyPinById(
  pinId: string,
  res: Response
): Promise<ApplyPinResponse> {
  const pinCode = await prisma.pinCode.findUnique({
    where: { id: pinId },
    include: {
      cases: {
        include: {
          case: {
            select: {
              slug: true,
            },
          },
        },
      },
    },
  });

  if (!pinCode) {
    throw new Error('Invalid PIN code ID');
  }

  // Create session and get token
  const token = createPinSession(res, pinCode.id, pinCode.expiresAt);

  // Build response
  const caseSlugs = pinCode.accessAll
    ? []
    : pinCode.cases.map((c) => c.case.slug);

  return {
    pinId: pinCode.id,
    token,
    accessAll: pinCode.accessAll,
    caseSlugs,
    expiresAt: pinCode.expiresAt?.toISOString(),
  };
}

/**
 * Get PIN session status
 *
 * @param pinContext - PIN context from request
 * @returns Status information
 */
export async function getPinStatus(
  pinContext?: PinContext
): Promise<PinStatusResponse> {
  if (!pinContext || !pinContext.pinId) {
    return {
      hasSession: false,
      accessAll: false,
      caseSlugs: [],
    };
  }

  // Get case slugs
  const cases = await prisma.case.findMany({
    where: {
      id: {
        in: pinContext.caseIds,
      },
    },
    select: {
      slug: true,
    },
  });

  return {
    hasSession: true,
    accessAll: pinContext.accessAll,
    caseSlugs: cases.map((c) => c.slug),
  };
}
