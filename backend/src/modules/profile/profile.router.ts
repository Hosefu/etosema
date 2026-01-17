/**
 * Profile Router
 *
 * Routes for retrieving "About Me" page content.
 */

import { Router, Response, Request } from 'express';
import { prisma } from '../../db/prisma';
import { ApiResponse, ErrorCode, ProfileData, LinkBlock } from '../../types/api';

const isLinkBlock = (value: unknown): value is LinkBlock => {
  if (!value || typeof value !== 'object') return false;
  const block = value as Partial<LinkBlock>;
  return (
    typeof block.title === 'string' &&
    Array.isArray(block.items) &&
    block.items.every(
      (item) =>
        item &&
        typeof item === 'object' &&
        typeof (item as LinkBlock['items'][number]).label === 'string' &&
        typeof (item as LinkBlock['items'][number]).url === 'string'
    )
  );
};

const parseLinkBlock = (value: unknown): LinkBlock => {
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (isLinkBlock(parsed)) return parsed;
    } catch (error) {
      // fall through to default
    }
  } else if (isLinkBlock(value)) {
    return value;
  }

  return { title: '', items: [] };
};

const router = Router();

// ============================================================================
// ROUTES
// ============================================================================

/**
 * GET /api/public/profile
 *
 * Get profile data for the "About Me" page.
 *
 * Response:
 *   - title: string
 *   - description: string
 *   - contacts: { telegram?, email? }
 *   - projects: [{ label, url }, ...]
 *   - socials: [{ label, url }, ...]
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    // Get the single profile record (id = 1)
    const profile = await prisma.profile.findUnique({
      where: { id: 1 },
    });

    if (!profile) {
      const response: ApiResponse = {
        error: {
          code: ErrorCode.NOT_FOUND,
          message: 'Profile not found',
        },
      };
      res.status(404).json(response);
      return;
    }

    // Transform to response format
    // Parse JSON strings for SQLite compatibility
    const data: ProfileData = {
      title: profile.title,
      description: profile.description,
      contacts: parseLinkBlock(profile.contactsJson),
      projects: parseLinkBlock(profile.projectsJson),
      socials: parseLinkBlock(profile.socialsJson),
      logoUrl: profile.logoUrl, // Deprecated, kept for backward compatibility
      lockedCaseMessage: profile.lockedCaseMessage,
      cvDocxUrl: profile.cvDocxUrl,
      cvPdfUrl: profile.cvPdfUrl,
      cvHhUrl: profile.cvHhUrl,
      cvHabrUrl: profile.cvHabrUrl,
      cvDocxEnabled: profile.cvDocxEnabled,
      cvPdfEnabled: profile.cvPdfEnabled,
      cvHhEnabled: profile.cvHhEnabled,
      cvHabrEnabled: profile.cvHabrEnabled,
    };

    const response: ApiResponse = { data };
    res.json(response);
  } catch (error) {
    console.error('Error in GET /profile:', error);

    const response: ApiResponse = {
      error: {
        code: ErrorCode.INTERNAL_ERROR,
        message: 'An error occurred while fetching the profile',
      },
    };
    res.status(500).json(response);
  }
});

export default router;
