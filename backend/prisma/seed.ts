/**
 * Database Seed Script
 *
 * Populates the database with initial data for development and testing.
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import sharp from 'sharp';

const prisma = new PrismaClient();

// Hash PIN code
async function hashPin(pin: string): Promise<string> {
  return bcrypt.hash(pin, 10);
}

async function getUploadImageWithThumbnail() {
  // In local dev we have `src/`, but in the production Docker image we only ship `dist/`.
  try {
    const mod = await import('../src/modules/storage/s3.service');
    return mod.uploadImageWithThumbnail as typeof import('../src/modules/storage/s3.service').uploadImageWithThumbnail;
  } catch {
    const mod = await import('../dist/modules/storage/s3.service');
    return mod.uploadImageWithThumbnail as typeof import('../dist/modules/storage/s3.service').uploadImageWithThumbnail;
  }
}

async function createAndUploadSeedImage(params: {
  label: string;
  width: number;
  height: number;
  folder?: string;
}): Promise<string> {
  const { label, width, height, folder = 'medias' } = params;

  // Simple neutral background with label (no external dependencies like Unsplash)
  const svg = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <rect width="100%" height="100%" fill="#e9e9ee"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
        font-family="system-ui, -apple-system, Segoe UI, Roboto, Arial"
        font-size="${Math.max(18, Math.round(width * 0.05))}"
        fill="#6b6b78">${label}</text>
    </svg>
  `);

  const buffer = await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: '#e9e9ee',
    },
  })
    .composite([{ input: svg }])
    .jpeg({ quality: 82 })
    .toBuffer();

  const uploadImageWithThumbnail = await getUploadImageWithThumbnail();
  const uploaded = await uploadImageWithThumbnail(
    {
      buffer,
      originalname: `${label.replace(/\s+/g, '-').toLowerCase()}.jpg`,
      mimetype: 'image/jpeg',
    },
    folder
  );

  return uploaded.url;
}

async function ensureGoogleFont(params: {
  name: string;
  family: string;
  cssUrl: string;
}) {
  const existing = await prisma.font.findFirst({
    where: {
      format: 'google',
      url: params.cssUrl,
    },
  });

  if (existing) return existing;

  return prisma.font.create({
    data: {
      name: params.name,
      family: params.family,
      url: params.cssUrl,
      format: 'google',
      weight: '400',
      style: 'normal',
    },
  });
}

async function main() {
  if (process.env.NODE_ENV === 'production' && process.env.SEED_DEMO !== 'true') {
    console.log('🌱 Seeding skipped in production (SEED_DEMO not set).');
    return;
  }

  console.log('🌱 Seeding database...\n');

  // ==========================================================================
  // PROFILE
  // ==========================================================================

  console.log('Creating profile...');

  await prisma.profile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title: 'Я коммуникационный дизайнер',
      description:
        'Занимаюсь коммуникационным дизайном и помогаю брендам находить свой визуальный язык. ' +
        'Работаю с айдентикой, упаковкой, digital-продуктами и создаю системы, которые работают.',
      contactsJson: JSON.stringify({
        telegram: '@sema_tsekh',
        email: 'iam@etosema.ru',
      }),
      projectsJson: JSON.stringify([
        {
          label: 'Нейроподряд',
          url: 'https://neuropodryad.ru',
        },
        {
          label: 'Проект 2',
          url: 'https://example.com',
        },
      ]),
      socialsJson: JSON.stringify([
        {
          label: 'Телеграм-канал',
          url: 'https://t.me/sema_channel',
        },
        {
          label: 'Инстаграм',
          url: 'https://instagram.com/etosema',
        },
      ]),
    },
  });

  console.log('✓ Profile created\n');

  // ==========================================================================
  // DESIGN SYSTEM
  // ==========================================================================

  console.log('Creating design system...');

  const seededDesignSystem = {
    typography: JSON.stringify({
      body: {
        family: 'system-ui, sans-serif',
        size: 20,
        lineHeight: 135,
        letterSpacing: 0,
        color: 'rgb(71,69,84)',
      },
      headingSmall: {
        family: 'system-ui, sans-serif',
        size: 32,
        lineHeight: 100,
        letterSpacing: -2,
        color: 'rgb(71,69,84)',
      },
      headingLarge: {
        family: 'system-ui, sans-serif',
        size: 90,
        lineHeight: 100,
        letterSpacing: -2,
        color: 'rgb(71,69,84)',
      },
    }),
    colors: JSON.stringify({
      background: 'rgb(243,243,244)',
      card: 'rgb(249,249,250)',
      textPrimary: '#1a1a1a',
      textSecondary: '#666666',
    }),
    links: JSON.stringify({
      offset: 2,
      color: 'rgb(191,191,196)',
      thickness: 1,
    }),
    cards: JSON.stringify({
      borderRadius: 25,
      padding: 75,
      paddingBottom: 0,
      height: 500,
    }),
    grid: JSON.stringify({
      margin: 80,
      gutter: 40,
      textColumns: 8,
      textAlign: 'left',
      blockAlign: 'left',
    }),
    spacing: JSON.stringify({
      baseGap: 12,
    }),
    faviconUrl: null,
  } as const;

  await prisma.designSystem.upsert({
    where: { id: 1 },
    // IMPORTANT: do NOT overwrite an existing site's settings
    update: {},
    create: {
      id: 1,
      ...seededDesignSystem,
    },
  });

  console.log('✓ Design system created\n');

  // ==========================================================================
  // DEFAULT FONTS (GOOGLE FONTS)
  // ==========================================================================

  console.log('Creating default fonts (Google Fonts)...');

  await ensureGoogleFont({
    name: 'Roboto Flex',
    family: 'Roboto Flex',
    cssUrl:
      'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght,XOPQ,XTRA,YOPQ,YTDE,YTFI,YTLC,YTUC@8..144,100..1000,96,468,79,-203,738,514,712&display=swap',
  });

  await ensureGoogleFont({
    name: 'IBM Plex Mono',
    family: 'IBM Plex Mono',
    cssUrl:
      'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap',
  });

  console.log('✓ Default fonts created\n');

  // ==========================================================================
  // CASES
  // ==========================================================================

  console.log('Creating cases...');

  // Case 1: Public case (Neirofestival Aida)
  const existingCase1 = await prisma.case.findUnique({
    where: { slug: 'neirofestival-aida' },
    include: { blocks: { select: { id: true } } },
  });

  const case1 =
    existingCase1 ||
    (await prisma.case.create({
      data: {
        slug: 'neirofestival-aida',
        title: 'Нейрофестиваль Аида',
        shortTitle: 'Аида',
        year: 2024,
        summary:
          'Айда — первый фестиваль креатива и дизайна с использованием нейросетей. Разработка визуального языка и коммуникационной стратегии.',
        isNda: false,
        orderRank: 'a0',
      },
    }));

  // Add blocks only once (seed must be idempotent)
  if (!existingCase1 || existingCase1.blocks.length === 0) {
    console.log('Uploading seed images to S3 (case1)...');
    const aidaHeroUrl = await createAndUploadSeedImage({
      label: 'Aida · hero',
      width: 1600,
      height: 900,
    });
    const aidaPoster1Url = await createAndUploadSeedImage({
      label: 'Aida · poster 1',
      width: 1200,
      height: 900,
    });
    const aidaPoster2Url = await createAndUploadSeedImage({
      label: 'Aida · poster 2',
      width: 1200,
      height: 900,
    });
    console.log('✓ Seed images uploaded (case1)');

    await prisma.caseBlock.create({
      data: {
        caseId: case1.id,
        layout: 'FULL',
        orderRank: '0000000001',
        medias: {
          create: [
            {
              position: 0,
              type: 'IMAGE',
              url: aidaHeroUrl,
              alt: 'Main festival visual',
              aspectRatio: '16:9',
            },
          ],
        },
      },
    });

    await prisma.caseBlock.create({
      data: {
        caseId: case1.id,
        layout: 'HALF',
        orderRank: '0000000002',
        medias: {
          create: [
            {
              position: 0,
              type: 'IMAGE',
              url: aidaPoster1Url,
              alt: 'Festival poster 1',
              aspectRatio: '4:3',
            },
            {
              position: 1,
              type: 'IMAGE',
              url: aidaPoster2Url,
              alt: 'Festival poster 2',
              aspectRatio: '4:3', // Одинаковое с первой картинкой
            },
          ],
        },
      },
    });
  }

  // Case 2: NDA case
  const existingCase2 = await prisma.case.findUnique({
    where: { slug: 'big-nda-project' },
    include: { blocks: { select: { id: true } } },
  });

  const case2 =
    existingCase2 ||
    (await prisma.case.create({
      data: {
        slug: 'big-nda-project',
        title: 'Проект под NDA',
        shortTitle: 'NDA',
        year: 2023,
        summary:
          'Крупный проект по ребрендингу для международной компании. Детали доступны по запросу.',
        isNda: true,
        orderRank: 'a2',
      },
    }));

  if (!existingCase2 || existingCase2.blocks.length === 0) {
    console.log('Uploading seed images to S3 (case2)...');
    const ndaPreviewUrl = await createAndUploadSeedImage({
      label: 'NDA · preview',
      width: 1200,
      height: 900,
    });
    console.log('✓ Seed images uploaded (case2)');

    await prisma.caseBlock.create({
      data: {
        caseId: case2.id,
        layout: 'FULL',
        orderRank: '0000000001',
        medias: {
          create: [
            {
              position: 0,
              type: 'IMAGE',
              url: ndaPreviewUrl,
              alt: 'NDA project preview',
              aspectRatio: '4:3',
            },
          ],
        },
      },
    });
  }

  console.log('✓ Cases created\n');

  // ==========================================================================
  // PIN CODES
  // ==========================================================================

  console.log('Creating PIN codes...');

  // PIN 1: Access to specific case (1234)
  const existingPin1 = await prisma.pinCode.findUnique({
    where: { shortCode: 'demo-1234' },
  });

  const pin1 =
    existingPin1 ||
    (await prisma.pinCode.create({
      data: {
        label: 'Демо PIN для NDA кейса',
        code: '1234',
        shortCode: 'demo-1234',
        codeHash: await hashPin('1234'),
        accessAll: false,
        expiresAt: new Date('2025-12-31'),
      },
    }));

  // Link pin1 to case2
  await prisma.pinCodeCase.upsert({
    where: {
      pinCodeId_caseId: {
        pinCodeId: pin1.id,
        caseId: case2.id,
      },
    },
    update: {},
    create: {
      pinCodeId: pin1.id,
      caseId: case2.id,
    },
  });

  // PIN 2: Access to all NDA cases (9999)
  const existingPin2 = await prisma.pinCode.findUnique({
    where: { shortCode: 'all-9999' },
  });
  if (!existingPin2) {
    await prisma.pinCode.create({
      data: {
        label: 'Админ PIN — доступ ко всем NDA',
        code: '9999',
        shortCode: 'all-9999',
        codeHash: await hashPin('9999'),
        accessAll: true,
        expiresAt: null, // No expiration
      },
    });
  }

  console.log('✓ PIN codes created');
  console.log('  PIN 1234: Access to "Проект под NDA"');
  console.log('  PIN 9999: Access to all NDA cases\n');

  // ==========================================================================
  // DONE
  // ==========================================================================

  console.log('✅ Seeding completed successfully!\n');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
