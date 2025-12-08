/**
 * Profile Router
 *
 * Routes for retrieving "About Me" page content.
 */

import { Router, Response, Request } from 'express';
import { prisma } from '../../db/prisma';
import { ApiResponse, ErrorCode, ProfileData } from '../../types/api';

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
      contacts:
        typeof profile.contactsJson === 'string'
          ? JSON.parse(profile.contactsJson)
          : (profile.contactsJson as any),
      projects:
        typeof profile.projectsJson === 'string'
          ? JSON.parse(profile.projectsJson)
          : (profile.projectsJson as any),
      socials:
        typeof profile.socialsJson === 'string'
          ? JSON.parse(profile.socialsJson)
          : (profile.socialsJson as any),
      logoUrl: profile.logoUrl,
      logoText: profile.logoText,
      lockedCaseMessage: profile.lockedCaseMessage,
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
