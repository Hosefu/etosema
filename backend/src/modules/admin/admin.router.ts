/**
 * Admin API Router
 *
 * Protected routes for admin panel
 */

import { Router } from 'express';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import path from 'path';
import type { Prisma } from '@prisma/client';
import { config } from '../../config/env';
import { prisma } from '../../db/prisma';
import { verifyAdminToken, AdminRequest } from './admin.middleware';
import { uploadFileToS3 } from '../storage/s3.service';

const router = Router();

// Configure multer for memory storage (upload to S3 instead of disk)
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: (req, file, cb) => {
    const allowedTypes =
      /jpeg|jpg|png|gif|webp|svg|mp4|webm|ttf|otf|woff|woff2/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype =
      /jpeg|jpg|png|gif|webp|svg|xml|mp4|webm|font|application/.test(
        file.mimetype
      );

    if (mimetype || extname) {
      // Relaxed check because SVGs and Fonts can have various mimetypes
      return cb(null, true);
    } else {
      cb(new Error('Only images, videos, and fonts are allowed'));
    }
  },
});

// ============================================================================
// AUTH
// ============================================================================

/**
 * POST /api/admin/login
 * Admin login
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (email === config.admin.email && password === config.admin.password) {
    const token = jwt.sign({ email }, config.secrets.jwt, { expiresIn: '7d' });

    res.json({
      success: true,
      data: {
        token,
        email,
      },
    });
  } else {
    res.status(401).json({
      error: {
        code: 'invalid_credentials',
        message: 'Invalid email or password',
      },
    });
  }
});

// All routes below require authentication
router.use(verifyAdminToken);

// ============================================================================
// FILE UPLOAD
// ============================================================================

/**
 * POST /api/admin/upload
 * Upload a file to S3
 */
router.post(
  '/upload',
  upload.single('file'),
  async (req: AdminRequest, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          error: {
            code: 'no_file',
            message: 'No file uploaded',
          },
        });
      }

      // Upload to S3
      const fileUrl = await uploadFileToS3(
        {
          buffer: req.file.buffer,
          originalname: req.file.originalname,
          mimetype: req.file.mimetype,
        },
        'medias'
      );

      res.json({
        success: true,
        data: {
          url: fileUrl,
          originalname: req.file.originalname,
          size: req.file.size,
        },
      });
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      res.status(500).json({
        error: {
          code: 'upload_failed',
          message: 'Failed to upload file',
        },
      });
    }
  }
);

// ============================================================================
// CASES
// ============================================================================

/**
 * GET /api/admin/cases
 * List all cases
 */
router.get('/cases', async (req: AdminRequest, res) => {
  const cases = await prisma.case.findMany({
    orderBy: { orderRank: 'asc' },
    include: {
      blocks: {
        include: {
          medias: {
            orderBy: { position: 'asc' },
          },
        },
        orderBy: { orderRank: 'asc' },
      },
    },
  });

  const casesWithCover = cases.map((c) => {
    let coverUrl = '/placeholder.png';
    if (c.blocks.length > 0) {
      for (const block of c.blocks) {
        if (block.medias.length > 0) {
          coverUrl = block.medias[0].url;
          break;
        }
      }
    }
    return { ...c, coverUrl };
  });

  res.json({ success: true, data: casesWithCover });
});

/**
 * GET /api/admin/cases/:id
 * Get a single case
 */
router.get('/cases/:id', async (req: AdminRequest, res) => {
  const { id } = req.params;
  const caseData = await prisma.case.findUnique({
    where: { id },
    include: {
      blocks: {
        include: {
          medias: {
            orderBy: { position: 'asc' },
          },
        },
        orderBy: { orderRank: 'asc' },
      },
    },
  });

  if (!caseData) {
    return res.status(404).json({
      error: {
        code: 'not_found',
        message: 'Case not found',
      },
    });
  }

  let coverUrl = '/placeholder.png';
  if (caseData.blocks.length > 0) {
    for (const block of caseData.blocks) {
      if (block.medias.length > 0) {
        coverUrl = block.medias[0].url;
        break;
      }
    }
  }

  res.json({ success: true, data: { ...caseData, coverUrl } });
});

/**
 * POST /api/admin/cases
 * Create a new case
 */
router.post('/cases', async (req: AdminRequest, res) => {
  const { ...data } = req.body;
  const caseData = await prisma.case.create({
    data,
  });

  res.json({ success: true, data: caseData });
});

/**
 * PUT /api/admin/cases/:id
 * Update a case
 */
router.put('/cases/:id', async (req: AdminRequest, res) => {
  const { id } = req.params;
  const { blocks: _blocks, ...data } = req.body; // Also exclude blocks if sent

  const caseData = await prisma.case.update({
    where: { id },
    data,
  });

  res.json({ success: true, data: caseData });
});

/**
 * DELETE /api/admin/cases/:id
 * Delete a case
 */
router.delete('/cases/:id', async (req: AdminRequest, res) => {
  const { id } = req.params;
  await prisma.case.delete({
    where: { id },
  });

  res.json({ success: true });
});

/**
 * POST /api/admin/cases/reorder
 * Update order of cases
 */
router.post('/cases/reorder', async (req: AdminRequest, res) => {
  const { caseIds } = req.body; // Array of case IDs in desired order

  if (!Array.isArray(caseIds)) {
    return res.status(400).json({
      error: { code: 'invalid_input', message: 'caseIds must be an array' },
    });
  }

  // Update orderRank for each case based on position in array
  const updates = caseIds.map((caseId: string, index: number) => {
    return prisma.case.update({
      where: { id: caseId },
      data: { orderRank: String(index).padStart(10, '0') },
    });
  });

  await Promise.all(updates);

  res.json({ success: true });
});

// ============================================================================
// BLOCKS
// ============================================================================

/**
 * POST /api/admin/blocks
 * Create a new block
 */
router.post('/blocks', async (req: AdminRequest, res) => {
  const block = await prisma.caseBlock.create({
    data: req.body,
    include: {
      medias: {
        orderBy: { position: 'asc' },
      },
    },
  });

  res.json({ success: true, data: block });
});

/**
 * PUT /api/admin/blocks/:id
 * Update a block
 */
router.put('/blocks/:id', async (req: AdminRequest, res) => {
  const { id } = req.params;
  const block = await prisma.caseBlock.update({
    where: { id },
    data: req.body,
  });

  res.json({ success: true, data: block });
});

/**
 * DELETE /api/admin/blocks/:id
 * Delete a block
 */
router.delete('/blocks/:id', async (req: AdminRequest, res) => {
  const { id } = req.params;
  await prisma.caseBlock.delete({
    where: { id },
  });

  res.json({ success: true });
});

// ============================================================================
// MEDIAS
// ============================================================================

/**
 * POST /api/admin/medias
 * Create a new media
 */
router.post('/medias', async (req: AdminRequest, res) => {
  const media = await prisma.caseBlockMedia.create({
    data: req.body,
  });

  res.json({ success: true, data: media });
});

/**
 * PUT /api/admin/medias/:id
 * Update a media
 */
router.put('/medias/:id', async (req: AdminRequest, res) => {
  const { id } = req.params;
  const media = await prisma.caseBlockMedia.update({
    where: { id },
    data: req.body,
  });

  res.json({ success: true, data: media });
});

/**
 * DELETE /api/admin/medias/:id
 * Delete a media
 */
router.delete('/medias/:id', async (req: AdminRequest, res) => {
  const { id } = req.params;
  await prisma.caseBlockMedia.delete({
    where: { id },
  });

  res.json({ success: true });
});

// ============================================================================
// PIN CODES
// ============================================================================

/**
 * GET /api/admin/pins
 * List all PIN codes
 */
router.get('/pins', async (req: AdminRequest, res) => {
  const pins = await prisma.pinCode.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { cases: true },
      },
    },
  });

  res.json({ success: true, data: pins });
});

/**
 * GET /api/admin/pins/:id
 * Get a single PIN code with details and usage history
 */
router.get('/pins/:id', async (req: AdminRequest, res) => {
  const { id } = req.params;
  console.log('Fetching pin details for ID:', id);
  const pin = await prisma.pinCode.findUnique({
    where: { id },
    include: {
      cases: {
        include: {
          case: {
            select: { id: true, title: true, slug: true },
          },
        },
      },
      usages: {
        orderBy: { createdAt: 'desc' },
        take: 100, // Limit history to last 100 entries
      },
    },
  });

  if (!pin) {
    return res
      .status(404)
      .json({ error: { code: 'not_found', message: 'Pin not found' } });
  }

  // Flatten cases structure for easier frontend consumption
  const cases = pin.cases.map((c) => c.case);

  res.json({ success: true, data: { ...pin, cases } });
});

import crypto from 'crypto';

function generateShortCode(length = 6): string {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

// ...

/**
 * POST /api/admin/pins
 * Create a new PIN code
 */
router.post('/pins', async (req: AdminRequest, res) => {
  const { code, label, accessAll, expiresAt, caseIds } = req.body;

  if (!code) {
    return res.status(400).json({
      error: { code: 'validation_error', message: 'Code is required' },
    });
  }

  const codeHash = await bcrypt.hash(code, 10);
  const shortCode = generateShortCode();

  const pin = await prisma.pinCode.create({
    data: {
      codeHash,
      code, // Store plain code
      shortCode, // Generate short code
      label,
      accessAll: accessAll || false,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      cases: {
        create:
          caseIds && Array.isArray(caseIds)
            ? caseIds.map((id: string) => ({ caseId: id }))
            : [],
      },
    },
  });

  res.json({ success: true, data: pin });
});

/**
 * PUT /api/admin/pins/:id
 * Update a PIN code
 */
router.put('/pins/:id', async (req: AdminRequest, res) => {
  const { id } = req.params;
  const { label, accessAll, expiresAt, caseIds } = req.body;

  // Prepare update data
  const data: Prisma.PinCodeUpdateInput = {
    label,
    accessAll,
    expiresAt: expiresAt ? new Date(expiresAt) : null,
  };

  // Update cases relationship if caseIds provided
  if (caseIds && Array.isArray(caseIds)) {
    // Use a transaction or deleteMany + create
    // Since we are in an update, we first delete existing relations then create new ones
    // Ideally this should be transactional
    await prisma.pinCodeCase.deleteMany({ where: { pinCodeId: id } });

    data.cases = {
      create: caseIds.map((caseId: string) => ({ caseId })),
    };
  }

  const pin = await prisma.pinCode.update({
    where: { id },
    data,
  });

  res.json({ success: true, data: pin });
});

/**
 * DELETE /api/admin/pins/:id
 * Delete a PIN code
 */
router.delete('/pins/:id', async (req: AdminRequest, res) => {
  const { id } = req.params;
  await prisma.pinCode.delete({ where: { id } });
  res.json({ success: true });
});

// ============================================================================
// PROFILE
// ============================================================================

/**
 * GET /api/admin/profile
 * Get profile data
 */
router.get('/profile', async (req: AdminRequest, res) => {
  let profile = await prisma.profile.findUnique({ where: { id: 1 } });

  // If no profile exists, create a default one
  if (!profile) {
    profile = await prisma.profile.create({
      data: {
        title: 'Портфолио',
        description: 'Описание...',
        contactsJson: JSON.stringify({ title: 'Контакты', items: [] }),
        projectsJson: JSON.stringify({ title: 'Проекты', items: [] }),
        socialsJson: JSON.stringify({ title: 'Соцсети', items: [] }),
      },
    });
  }

  res.json({ success: true, data: profile });
});

/**
 * PUT /api/admin/profile
 * Update profile data
 */
router.put('/profile', async (req: AdminRequest, res) => {
  const { logoUrl, logoText, lockedCaseMessage, ...rest } = req.body;

  const profile = await prisma.profile.update({
    where: { id: 1 },
    data: {
      ...rest,
      logoUrl,
      logoText,
      lockedCaseMessage,
    },
  });

  res.json({ success: true, data: profile });
});

export default router;
