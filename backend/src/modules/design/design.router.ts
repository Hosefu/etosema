import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { prisma } from '../../db/prisma';
import { verifyAdminToken, AdminRequest } from '../admin/admin.middleware';
import { uploadFileToS3 } from '../storage/s3.service';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.originalname.match(/\.(ttf|otf|woff|woff2)$/i)) {
      cb(null, true);
    } else {
      cb(new Error('Only font files are allowed'));
    }
  },
});

// Protect all routes
router.use(verifyAdminToken);

/**
 * GET /api/admin/design
 * Get design settings and fonts
 */
router.get('/', async (req: AdminRequest, res) => {
  try {
    let design = await prisma.designSystem.findUnique({ where: { id: 1 } });

    if (!design) {
      // Default settings matching current SCSS tokens
      design = await prisma.designSystem.create({
        data: {
          typography: JSON.stringify({
            body: {
              family: 'Inter',
              size: 18,
              lineHeight: 135,
              letterSpacing: -3,
              color: '#1a1a1a',
            },
            headingSmall: {
              family: 'Inter',
              size: 26,
              lineHeight: 100,
              letterSpacing: -3,
              color: '#1a1a1a',
            },
            headingLarge: {
              family: 'Inter',
              size: 90,
              lineHeight: 90,
              letterSpacing: -3,
              color: '#1a1a1a',
            },
          }),
          colors: JSON.stringify({
            background: 'rgba(0, 0, 0, 0.05)', // $color-bg-page
            card: '#ffffff', // $color-bg-card
          }),
          links: JSON.stringify({
            offset: 2,
            color: 'rgba(0, 0, 0, 0.2)',
            thickness: 1,
          }),
          cards: JSON.stringify({
            borderRadius: 0,
            padding: 0,
            paddingBottom: 0,
            height: 0,
          }),
          grid: JSON.stringify({
            margin: 24,
            gutter: 24,
            textColumns: 8,
            textAlign: 'left',
            blockAlign: 'center',
          }),
          spacing: JSON.stringify({
            baseGap: 12,
          }),
        },
      });
    }

    const fonts = await prisma.font.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const defaultSeo = {
      siteName: 'Etosema',
      homeTitle: 'Etosema — Коммуникационный дизайнер',
      homeDescription: 'Портфолио коммуникационной дизайнерки Сёмы',
      aboutTitle: 'Обо мне — Etosema',
      aboutDescription: 'Контакты и информация обо мне',
      caseTitleTemplate: '{title} — Etosema',
      caseDescriptionFallback: '',
    };

    const parsedSettings = {
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
      spacing: design.spacing ? JSON.parse(design.spacing) : { baseGap: 12 },
      seo: {
        ...defaultSeo,
        ...(design.seo ? JSON.parse(design.seo) : {}),
      },
    };

    res.json({ success: true, data: { settings: parsedSettings, fonts } });
  } catch (error) {
    console.error('Error fetching design settings:', error);
    res
      .status(500)
      .json({
        error: { code: 'internal_error', message: 'Failed to fetch settings' },
      });
  }
});

/**
 * PUT /api/admin/design
 * Update design settings
 */
router.put('/', async (req: AdminRequest, res) => {
  try {
    const { typography, colors, links, cards, grid, spacing, faviconUrl } =
      req.body as {
        typography?: unknown;
        colors?: unknown;
        links?: unknown;
        cards?: unknown;
        grid?: unknown;
        spacing?: unknown;
        faviconUrl?: string | null;
        seo?: unknown;
      };

    // Allow partial updates: only provided fields are overwritten.
    // This prevents accidental "wipe" when UI sends only one field (e.g. favicon).
    const data: Record<string, unknown> = {};

    if (typography !== undefined) {
      data.typography =
        typeof typography === 'string' ? typography : JSON.stringify(typography);
    }
    if (colors !== undefined) {
      data.colors = typeof colors === 'string' ? colors : JSON.stringify(colors);
    }
    if (links !== undefined) {
      data.links = typeof links === 'string' ? links : JSON.stringify(links);
    }
    if (cards !== undefined) {
      data.cards = typeof cards === 'string' ? cards : JSON.stringify(cards);
    }
    if (grid !== undefined) {
      data.grid = typeof grid === 'string' ? grid : JSON.stringify(grid);
    }
    if (spacing !== undefined) {
      data.spacing =
        typeof spacing === 'string' ? spacing : JSON.stringify(spacing);
    }
    if (faviconUrl !== undefined) {
      data.faviconUrl = faviconUrl;
    }
    if (req.body?.seo !== undefined) {
      const seo = (req.body as { seo?: unknown }).seo;
      data.seo = typeof seo === 'string' ? seo : JSON.stringify(seo);
    }

    const design = await prisma.designSystem.update({
      where: { id: 1 },
      data,
    });

    res.json({ success: true, data: design });
  } catch (error) {
    console.error('Error updating design settings:', error);
    res
      .status(500)
      .json({
        error: { code: 'internal_error', message: 'Failed to update settings' },
      });
  }
});

/**
 * POST /api/admin/design/fonts
 * Upload a new font
 */
router.post('/fonts', upload.single('file'), async (req: AdminRequest, res) => {
  try {
    if (!req.file) throw new Error('No file uploaded');

    const { family, weight, style } = req.body;

    const url = await uploadFileToS3(
      {
        buffer: req.file.buffer,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
      },
      'fonts'
    );

    const font = await prisma.font.create({
      data: {
        name: req.file.originalname,
        family: family || path.parse(req.file.originalname).name,
        url,
        format: path.extname(req.file.originalname).slice(1).toLowerCase(),
        weight: weight || '400',
        style: style || 'normal',
      },
    });

    res.json({ success: true, data: font });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    console.error('Error uploading font:', e);
    res
      .status(500)
      .json({ error: { code: 'upload_error', message } });
  }
});

function normalizeGoogleFontUrl(input: string): { cssUrl: string; family: string } {
  const trimmed = (input || '').trim();
  if (!trimmed) throw new Error('URL is required');

  // If user pasted the CSS API URL already
  if (trimmed.includes('fonts.googleapis.com')) {
    // Best-effort family extraction
    try {
      const u = new URL(trimmed);
      const familyParam = u.searchParams.get('family') || '';
      const family = decodeURIComponent(familyParam).split(':')[0].replace(/\+/g, ' ').trim();
      return { cssUrl: trimmed, family: family || 'Google Font' };
    } catch {
      return { cssUrl: trimmed, family: 'Google Font' };
    }
  }

  // Specimen page: https://fonts.google.com/specimen/Roboto+Flex
  if (trimmed.includes('fonts.google.com/specimen/')) {
    const match = trimmed.match(/fonts\.google\.com\/specimen\/([^/?#]+)/i);
    const slug = match?.[1];
    if (!slug) throw new Error('Could not parse Google Fonts specimen URL');
    const family = decodeURIComponent(slug).replace(/\+/g, ' ').trim();
    const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family).replace(/%20/g, '+')}&display=swap`;
    return { cssUrl, family };
  }

  // Share link: https://fonts.google.com/share?selection.family=Roboto+Flex
  if (trimmed.includes('fonts.google.com/share')) {
    try {
      const u = new URL(trimmed);
      const sel = u.searchParams.get('selection.family') || u.searchParams.get('family') || '';
      const family = decodeURIComponent(sel).replace(/\+/g, ' ').trim();
      if (!family) throw new Error('Could not parse family from Google Fonts share URL');
      const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family).replace(/%20/g, '+')}&display=swap`;
      return { cssUrl, family };
    } catch {
      throw new Error('Could not parse Google Fonts share URL');
    }
  }

  throw new Error('Unsupported URL. Use a Google Fonts link or CSS API link.');
}

/**
 * POST /api/admin/design/fonts/google
 * Add a Google Font by URL (priority method)
 */
router.post('/fonts/google', async (req: AdminRequest, res) => {
  try {
    const { url } = req.body as { url?: string };
    const { cssUrl, family } = normalizeGoogleFontUrl(url || '');

    const font = await prisma.font.create({
      data: {
        // Store clean display name; UI can show a Google icon based on format
        name: family,
        family,
        url: cssUrl,
        format: 'google',
        weight: '400',
        style: 'normal',
      },
    });

    res.json({ success: true, data: font });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    console.error('Error adding Google Font:', e);
    res.status(400).json({ error: { code: 'google_font_error', message } });
  }
});

/**
 * DELETE /api/admin/design/fonts/:id
 * Delete a font
 */
router.delete('/fonts/:id', async (req: AdminRequest, res) => {
  try {
    const { id } = req.params;
    await prisma.font.delete({ where: { id } });
    // Note: We skip deleting from S3 for now to keep it simple/safe
    res.json({ success: true });
  } catch (error) {
    res
      .status(500)
      .json({
        error: { code: 'delete_error', message: 'Failed to delete font' },
      });
  }
});

export default router;
