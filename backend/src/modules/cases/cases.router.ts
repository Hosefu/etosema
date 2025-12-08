/**
 * Cases Router
 *
 * Routes for retrieving portfolio cases.
 * Uses Dependency Injection pattern for better testability.
 */

import { Router, Response } from 'express';
import { RequestWithPin, ApiResponse, ErrorCode } from '../../types/api';
import { CasesService } from './cases.service';
import { logPinView } from '../security/rateLimit.middleware';

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
  router.get('/', async (req: RequestWithPin, res: Response) => {
    try {
      const cases = await casesService.getAllCases(req.pinContext);

      // Log view if PIN is present
      if (req.pinContext?.pinId) {
        logPinView(req, req.pinContext.pinId, '/cases');
      }

      const response: ApiResponse = { data: cases };
      res.json(response);
    } catch (error) {
      console.error('Error in GET /cases:', error);

      const response: ApiResponse = {
        error: {
          code: ErrorCode.INTERNAL_ERROR,
          message: 'An error occurred while fetching cases',
        },
      };
      res.status(500).json(response);
    }
  });

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
  router.get('/:slug', async (req: RequestWithPin, res: Response) => {
    try {
      const { slug } = req.params;

      const caseDetail = await casesService.getCaseBySlug(slug, req.pinContext);

      if (!caseDetail) {
        const response: ApiResponse = {
          error: {
            code: ErrorCode.NOT_FOUND,
            message: 'Case not found',
          },
        };
        res.status(404).json(response);
        return;
      }

      // Log view if PIN is present
      if (req.pinContext?.pinId) {
        logPinView(req, req.pinContext.pinId, `/cases/${slug}`);
      }

      const response: ApiResponse = { data: caseDetail };
      res.json(response);
    } catch (error: any) {
      // Check for PIN required error
      if (error.code === 'pin_required') {
        const response: ApiResponse = {
          error: {
            code: ErrorCode.PIN_REQUIRED,
            message: 'Access to this case requires a PIN',
          },
        };
        res.status(403).json(response);
        return;
      }

      console.error('Error in GET /cases/:slug:', error);

      const response: ApiResponse = {
        error: {
          code: ErrorCode.INTERNAL_ERROR,
          message: 'An error occurred while fetching the case',
        },
      };
      res.status(500).json(response);
    }
  });

  return router;
}
