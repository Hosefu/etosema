/**
 * Database Seed Script
 *
 * Populates the database with initial data for development and testing.
 */

import { PrismaClient } from '@prisma/client';
import { hashPin } from '../src/modules/pin/pin.service';

const prisma = new PrismaClient();

async function main() {
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
  // CASES
  // ==========================================================================

  console.log('Creating cases...');

  // Case 1: Public case (Neirofestival Aida)
  const case1 = await prisma.case.upsert({
    where: { slug: 'neirofestival-aida' },
    update: {},
    create: {
      slug: 'neirofestival-aida',
      title: 'Нейрофестиваль Аида',
      shortTitle: 'Аида',
      year: 2024,
      summary: 'Айда — первый фестиваль креатива и дизайна с использованием нейросетей. Разработка визуального языка и коммуникационной стратегии.',
      isNda: false,
      coverUrl: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800',
      orderRank: 'a0',
    },
  });

  // Add blocks to case1
  const case1Block1 = await prisma.caseBlock.create({
    data: {
      caseId: case1.id,
      layout: 'FULL',
      orderRank: 'a0',
      medias: {
        create: [
          {
            position: 0,
            type: 'IMAGE',
            url: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1200',
            alt: 'Main festival visual',
            aspectRatio: '16:9',
          },
        ],
      },
    },
  });

  const case1Block2 = await prisma.caseBlock.create({
    data: {
      caseId: case1.id,
      layout: 'HALF',
      orderRank: 'a1',
      medias: {
        create: [
          {
            position: 0,
            type: 'IMAGE',
            url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600',
            alt: 'Festival poster 1',
            aspectRatio: '4:3',
          },
          {
            position: 1,
            type: 'IMAGE',
            url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
            alt: 'Festival poster 2',
            aspectRatio: '4:3', // Одинаковое с первой картинкой
          },
        ],
      },
    },
  });

  // Case 2: NDA case
  const case2 = await prisma.case.upsert({
    where: { slug: 'big-nda-project' },
    update: {},
    create: {
      slug: 'big-nda-project',
      title: 'Проект под NDA',
      shortTitle: 'NDA',
      year: 2023,
      summary: 'Крупный проект по ребрендингу для международной компании. Детали доступны по запросу.',
      isNda: true,
      coverUrl: 'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=800',
      orderRank: 'a2',
    },
  });

  // Add blocks to case2
  await prisma.caseBlock.create({
    data: {
      caseId: case2.id,
      layout: 'FULL',
      orderRank: 'a0',
      medias: {
        create: [
          {
            position: 0,
            type: 'IMAGE',
            url: 'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=1200',
            alt: 'NDA project preview',
            aspectRatio: '4:3',
          },
        ],
      },
    },
  });

  console.log('✓ Cases created\n');

  // ==========================================================================
  // PIN CODES
  // ==========================================================================

  console.log('Creating PIN codes...');

  // PIN 1: Access to specific case (1234)
  const pin1Hash = await hashPin('1234');
  const pin1 = await prisma.pinCode.upsert({
    where: { codeHash: pin1Hash },
    update: {},
    create: {
      label: 'Demo PIN for NDA Project',
      codeHash: pin1Hash,
      accessAll: false,
      expiresAt: new Date('2025-12-31'),
    },
  });

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
  const pin2Hash = await hashPin('9999');
  await prisma.pinCode.upsert({
    where: { codeHash: pin2Hash },
    update: {},
    create: {
      label: 'Admin PIN - All Access',
      codeHash: pin2Hash,
      accessAll: true,
      expiresAt: null, // No expiration
    },
  });

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
