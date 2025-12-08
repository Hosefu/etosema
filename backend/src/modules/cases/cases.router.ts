/**
 * Cases Router
 *
 * Routes for retrieving portfolio cases.
 * Uses Dependency Injection pattern for better testability.
 */

import { Router, Response } from 'express';
import { RequestWithPin, ApiResponse } from '../../types/api';
import { CasesService } from './cases.service';
import { logPinView } from '../security/rateLimit.middleware';
import { asyncHandler } from '../../utils/asyncHandler';
import { AppError } from '../../utils/AppError';

/**
 * Creates and configures the cases router with injected dependencies
 *
 * @param casesService - Injected CasesService instance
 * @returns Configured Express router
 */
export function createCasesRouter(casesService: CasesService): Router {
  const router = Router();

  // ============================================================================
  // ROUTES
  // ============================================================================

  /**
   * GET /api/public/cases
   *
   * Get all cases for the grid display.
   *
   * Response:
   *   - Array of case previews with computed isLocked status
   */
  router.get(
    '/',
    asyncHandler(async (req: RequestWithPin, res: Response) => {
      const cases = await casesService.getAllCases(req.pinContext);

      // Log view if PIN is present
      if (req.pinContext?.pinId) {
        logPinView(req, req.pinContext.pinId, '/cases');
      }

      const response: ApiResponse = { data: cases };
      res.json(response);
    })
  );

  /**
   * GET /api/public/cases/:slug
   *
   * Get a single case by slug with full details.
   *
   * Params:
   *   - slug: string - Case slug
   *
   * Response (success):
   *   - Case details with blocks and medias
   *
   * Errors:
   *   - 404: Case not found
   *   - 403: Case requires PIN access (NDA-protected)
   */
  router.get(
    '/:slug',
    asyncHandler(async (req: RequestWithPin, res: Response) => {
      const { slug } = req.params;

      const caseDetail = await casesService.getCaseBySlug(slug, req.pinContext);

      if (!caseDetail) {
        throw AppError.notFound('Case not found');
      }

      // Log view if PIN is present
      if (req.pinContext?.pinId) {
        logPinView(req, req.pinContext.pinId, `/cases/${slug}`);
      }

      const response: ApiResponse = { data: caseDetail };
      res.json(response);
    })
  );

  return router;
}
