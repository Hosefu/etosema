/**
 * Migration Script: Upload existing files to S3 and update database URLs
 *
 * This script:
 * 1. Finds all local file references in the database
 * 2. Uploads files to S3 if they exist locally
 * 3. Updates database with new S3 URLs
 *
 * Run with: tsx scripts/migrate-to-s3.ts
 */

import { PrismaClient } from '@prisma/client';
import { uploadFileToS3 } from '../src/modules/storage/s3.service';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const exists = promisify(fs.exists);

const prisma = new PrismaClient();

interface FileToMigrate {
  id: string;
  oldUrl: string;
  type: 'case_cover' | 'media';
}

async function migrateFilesToS3() {
  console.log('🚀 Starting S3 migration...\n');

  const filesToMigrate: FileToMigrate[] = [];

  // Find all cases with local cover URLs
  const cases = await prisma.case.findMany();
  for (const caseItem of cases) {
    if (caseItem.coverUrl && caseItem.coverUrl.startsWith('/uploads')) {
      filesToMigrate.push({
        id: caseItem.id,
        oldUrl: caseItem.coverUrl,
        type: 'case_cover',
      });
    }
  }

  // Find all medias with local URLs
  const medias = await prisma.caseBlockMedia.findMany();
  for (const media of medias) {
    if (media.url && media.url.startsWith('/uploads')) {
      filesToMigrate.push({
        id: media.id,
        oldUrl: media.url,
        type: 'media',
      });
    }
  }

  console.log(`📋 Found ${filesToMigrate.length} files to migrate\n`);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  // Migrate each file
  for (const file of filesToMigrate) {
    console.log(`Processing: ${file.oldUrl}`);

    try {
      // Build local file path
      const localPath = path.join(process.cwd(), 'public', file.oldUrl);

      // Check if file exists
      if (!(await exists(localPath))) {
        console.log(`  ⚠️  File not found locally, skipping: ${localPath}`);
        skipCount++;
        continue;
      }

      // Read file
      const fileBuffer = await readFile(localPath);
      const ext = path.extname(localPath);
      const originalname = path.basename(localPath);

      // Determine mimetype
      let mimetype = 'application/octet-stream';
      if (['.jpg', '.jpeg'].includes(ext)) mimetype = 'image/jpeg';
      else if (ext === '.png') mimetype = 'image/png';
      else if (ext === '.gif') mimetype = 'image/gif';
      else if (ext === '.webp') mimetype = 'image/webp';
      else if (ext === '.mp4') mimetype = 'video/mp4';
      else if (ext === '.webm') mimetype = 'video/webm';

      // Upload to S3
      const folder = file.type === 'case_cover' ? 'cases' : 'medias';
      const s3Url = await uploadFileToS3(
        {
          buffer: fileBuffer,
          originalname,
          mimetype,
        },
        folder
      );

      // Update database
      if (file.type === 'case_cover') {
        await prisma.case.update({
          where: { id: file.id },
          data: { coverUrl: s3Url },
        });
      } else {
        await prisma.caseBlockMedia.update({
          where: { id: file.id },
          data: { url: s3Url },
        });
      }

      console.log(`  ✅ Migrated to: ${s3Url}`);
      successCount++;
    } catch (error) {
      console.error(`  ❌ Error migrating ${file.oldUrl}:`, error);
      errorCount++;
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 Migration Summary');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ Successfully migrated: ${successCount}`);
  console.log(`⚠️  Skipped (not found):  ${skipCount}`);
  console.log(`❌ Failed:               ${errorCount}`);
  console.log(`📁 Total:                ${filesToMigrate.length}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  await prisma.$disconnect();
}

// Run migration
migrateFilesToS3().catch((error) => {
  console.error('❌ Migration failed:', error);
  process.exit(1);
});
