import { Router, Request, Response } from 'express';
import { prisma } from '../../db/prisma';
import { ApiResponse } from '../../types/api';

const router = Router();

/**
 * GET /api/public/design
 * Get global design settings and fonts
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const design = await prisma.designSystem.findUnique({ where: { id: 1 } });
    const fonts = await prisma.font.findMany();

    const data = {
      settings: design
        ? {
            ...design,
            typography: JSON.parse(design.typography),
            colors: JSON.parse(design.colors),
            links: {
              offset: 2,
              color: 'rgba(0, 0, 0, 0.2)',
              thickness: 1,
              ...JSON.parse(design.links),
            },
            cards: {
              borderRadius: 0,
              padding: 0,
              paddingBottom: 0,
              height: 0,
              ...(design.cards ? JSON.parse(design.cards) : {}),
            },
            grid: {
              margin: 24,
              gutter: 24,
              textColumns: 8,
              textAlign: 'left',
              blockAlign: 'center',
              ...(design.grid ? JSON.parse(design.grid) : {}),
            },
            spacing: design.spacing
              ? JSON.parse(design.spacing)
              : { baseGap: 12 },
            faviconUrl: design.faviconUrl,
          }
        : null,
      fonts,
    };

    const response: ApiResponse = { data };
    res.json(response);
  } catch (error) {
    console.error('Error fetching public design:', error);
    const response: ApiResponse = {
      error: {
        code: 'internal_error',
        message: 'Failed to fetch design settings',
      },
    };
    res.status(500).json(response);
  }
});

export default router;
