import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { prisma } from '../../db/prisma';
import { verifyAdminToken, AdminRequest } from '../admin/admin.middleware';
import { uploadFileToS3, uploadPublicBufferToS3 } from '../storage/s3.service';
import sharp from 'sharp';

const router = Router();
const storage = multer.memoryStorage();

// Uploads for fonts only
const uploadFont = multer({
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

// Uploads for favicon assets (png/svg/ico)
const uploadFavicon = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB is plenty for icons
  fileFilter: (req, file, cb) => {
    const name = (file.originalname || '').toLowerCase();
    const mimetype = (file.mimetype || '').toLowerCase();

    const isSvg =
      mimetype.includes('image/svg') || name.endsWith('.svg');
    const isPng =
      mimetype === 'image/png' || name.endsWith('.png');
    const isJpeg =
      mimetype === 'image/jpeg' ||
      name.endsWith('.jpg') ||
      name.endsWith('.jpeg');
    const isIco =
      mimetype === 'image/x-icon' ||
      mimetype === 'image/vnd.microsoft.icon' ||
      name.endsWith('.ico');

    // allow JPEG too (we'll convert to PNG anyway)
    if (isSvg || isPng || isJpeg || isIco) return cb(null, true);
    cb(new Error('Only PNG, JPG/JPEG, SVG or ICO files are allowed'));
  },
});

function singleFaviconUpload(fieldName: string) {
  return (req: AdminRequest, res: any, next: any) => {
    uploadFavicon.single(fieldName)(req as any, res as any, (err: any) => {
      if (!err) return next();
      return res.status(400).json({
        error: {
          code: 'invalid_file',
          message: err.message || 'Invalid file',
        },
      });
    });
  };
}

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
      metrikaCode: '',
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
      favicons: design.favicons ? JSON.parse(design.favicons) : null,
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

type FaviconsSet = {
  png16?: string;
  png32?: string;
  png48?: string;
  png64?: string;
  apple180?: string;
  android192?: string;
  android512?: string;
  ico?: string;
  svg?: string;
  manifestUrl?: string;
  maskIconUrl?: string;
  maskColor?: string;
};

/**
 * POST /api/admin/design/favicons/base
 * Upload a base square icon (PNG/SVG) and generate standard PNG sizes + webmanifest.
 */
router.post(
  '/favicons/base',
  singleFaviconUpload('file'),
  async (req: AdminRequest, res) => {
    try {
      if (!req.file) throw new Error('No file uploaded');

      const design = await prisma.designSystem.findUnique({ where: { id: 1 } });
      if (!design) throw new Error('Design system not found');

      const seo = design.seo ? JSON.parse(design.seo) : {};
      const siteName = (seo.siteName as string) || 'Etosema';

      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const basePath = `favicons/${uniqueSuffix}`;

      // keep original svg if provided (useful as vector icon)
      let svgUrl: string | undefined;
      if (req.file.mimetype.includes('svg') || req.file.originalname.endsWith('.svg')) {
        svgUrl = await uploadFileToS3(
          {
            buffer: req.file.buffer,
            originalname: 'favicon.svg',
            mimetype: 'image/svg+xml',
          },
          basePath
        );
      }

      const sizes: Array<[number, keyof FaviconsSet]> = [
        [16, 'png16'],
        [32, 'png32'],
        [48, 'png48'],
        [64, 'png64'],
        [180, 'apple180'],
        [192, 'android192'],
        [512, 'android512'],
      ];

      const pngUrls: Partial<FaviconsSet> = {};
      for (const [size, key] of sizes) {
        const buffer = await sharp(req.file.buffer)
          .rotate()
          .resize({ width: size, height: size, fit: 'cover' })
          .png({ compressionLevel: 9, adaptiveFiltering: true })
          .toBuffer();

        const url = await uploadPublicBufferToS3({
          key: `${basePath}/${key}.png`,
          buffer,
          contentType: 'image/png',
        });
        (pngUrls as any)[key] = url;
      }

      const manifest = {
        name: siteName,
        short_name: siteName,
        icons: [
          {
            src: pngUrls.android192,
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: pngUrls.android512,
            sizes: '512x512',
            type: 'image/png',
          },
        ].filter((x) => x.src),
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
      };

      const manifestUrl = await uploadPublicBufferToS3({
        key: `${basePath}/site.webmanifest`,
        buffer: Buffer.from(JSON.stringify(manifest), 'utf-8'),
        contentType: 'application/manifest+json',
      });

      const prevFavicons: FaviconsSet | null = design.favicons
        ? JSON.parse(design.favicons)
        : null;

      const newFavicons: FaviconsSet = {
        ...(prevFavicons || {}),
        ...pngUrls,
        svg: svgUrl ?? prevFavicons?.svg,
        manifestUrl,
      };

      // keep legacy faviconUrl for old clients (32px)
      const updated = await prisma.designSystem.update({
        where: { id: 1 },
        data: {
          faviconUrl: newFavicons.png32 || newFavicons.png16 || null,
          favicons: JSON.stringify(newFavicons),
        },
      });

      res.json({
        success: true,
        data: {
          faviconUrl: updated.faviconUrl,
          favicons: newFavicons,
        },
      });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      console.error('Error generating favicons:', e);
      res.status(500).json({ error: { code: 'favicon_error', message } });
    }
  }
);

/**
 * POST /api/admin/design/favicons/ico
 * Upload a ready favicon.ico (recommended, because generating ICO server-side requires extra tooling).
 */
router.post(
  '/favicons/ico',
  singleFaviconUpload('file'),
  async (req: AdminRequest, res) => {
    try {
      if (!req.file) throw new Error('No file uploaded');
      if (!req.file.originalname.toLowerCase().endsWith('.ico')) {
        return res.status(400).json({
          error: {
            code: 'invalid_file',
            message: 'Please upload a .ico file',
          },
        });
      }
      const design = await prisma.designSystem.findUnique({ where: { id: 1 } });
      if (!design) throw new Error('Design system not found');

      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const basePath = `favicons/${uniqueSuffix}`;

      const icoUrl = await uploadPublicBufferToS3({
        key: `${basePath}/favicon.ico`,
        buffer: req.file.buffer,
        contentType: 'image/x-icon',
      });

      const prevFavicons: FaviconsSet | null = design.favicons
        ? JSON.parse(design.favicons)
        : null;

      const newFavicons: FaviconsSet = {
        ...(prevFavicons || {}),
        ico: icoUrl,
      };

      await prisma.designSystem.update({
        where: { id: 1 },
        data: {
          favicons: JSON.stringify(newFavicons),
        },
      });

      res.json({ success: true, data: { favicons: newFavicons } });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      console.error('Error uploading favicon.ico:', e);
      res.status(500).json({ error: { code: 'favicon_error', message } });
    }
  }
);

/**
 * POST /api/admin/design/favicons/mask
 * Upload safari pinned tab mask-icon SVG + optional color.
 */
router.post(
  '/favicons/mask',
  singleFaviconUpload('file'),
  async (req: AdminRequest, res) => {
    try {
      if (!req.file) throw new Error('No file uploaded');
      if (!req.file.originalname.toLowerCase().endsWith('.svg')) {
        return res.status(400).json({
          error: {
            code: 'invalid_file',
            message: 'Please upload an .svg file',
          },
        });
      }
      const design = await prisma.designSystem.findUnique({ where: { id: 1 } });
      if (!design) throw new Error('Design system not found');

      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const basePath = `favicons/${uniqueSuffix}`;

      const maskIconUrl = await uploadFileToS3(
        {
          buffer: req.file.buffer,
          originalname: 'safari-pinned-tab.svg',
          mimetype: 'image/svg+xml',
        },
        basePath
      );

      const color =
        typeof (req.body as any)?.maskColor === 'string'
          ? (req.body as any).maskColor
          : undefined;

      const prevFavicons: FaviconsSet | null = design.favicons
        ? JSON.parse(design.favicons)
        : null;

      const newFavicons: FaviconsSet = {
        ...(prevFavicons || {}),
        maskIconUrl,
        maskColor: color ?? prevFavicons?.maskColor,
      };

      await prisma.designSystem.update({
        where: { id: 1 },
        data: {
          favicons: JSON.stringify(newFavicons),
        },
      });

      res.json({ success: true, data: { favicons: newFavicons } });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      console.error('Error uploading mask icon:', e);
      res.status(500).json({ error: { code: 'favicon_error', message } });
    }
  }
);

/**
 * PUT /api/admin/design
 * Update design settings
 */
router.put('/', async (req: AdminRequest, res) => {
  try {
    const {
      typography,
      colors,
      links,
      cards,
      grid,
      spacing,
      faviconUrl,
      logoSvgUrl,
      logoSvgMaskUrl,
      logoText,
      borderRadius,
    } = req.body as {
      typography?: unknown;
      colors?: unknown;
      links?: unknown;
      cards?: unknown;
      grid?: unknown;
      spacing?: unknown;
      faviconUrl?: string | null;
      seo?: unknown;
      favicons?: unknown;
      logoSvgUrl?: string | null;
      logoSvgMaskUrl?: string | null;
      logoText?: string | null;
      borderRadius?: unknown;
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
    if ((req.body as any)?.favicons !== undefined) {
      const favicons = (req.body as { favicons?: unknown }).favicons;
      data.favicons =
        typeof favicons === 'string' ? favicons : JSON.stringify(favicons);
    }
    if (logoSvgUrl !== undefined) {
      data.logoSvgUrl = logoSvgUrl;
    }
    if (logoSvgMaskUrl !== undefined) {
      data.logoSvgMaskUrl = logoSvgMaskUrl;
    }
    if (logoText !== undefined) {
      data.logoText = logoText;
    }
    if (borderRadius !== undefined) {
      data.borderRadius =
        typeof borderRadius === 'string'
          ? borderRadius
          : JSON.stringify(borderRadius);
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
router.post('/fonts', uploadFont.single('file'), async (req: AdminRequest, res) => {
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
