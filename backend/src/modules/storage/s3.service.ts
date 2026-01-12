/**
 * S3 Storage Service
 *
 * Handles file uploads to S3-compatible storage.
 */

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { config } from '../../config/env';
import path from 'path';
import sharp from 'sharp';

/**
 * S3 Client instance
 */
const s3Client = new S3Client({
  endpoint: config.s3.endpoint,
  region: config.s3.region,
  credentials: {
    accessKeyId: config.s3.accessKey,
    secretAccessKey: config.s3.secretKey,
  },
  forcePathStyle: true, // Required for some S3-compatible providers
});

/**
 * Upload file to S3
 *
 * @param file - File buffer and metadata
 * @param folder - Folder path in bucket (e.g., 'medias', 'cases')
 * @returns Public URL of uploaded file
 */
export async function uploadFileToS3(
  file: {
    buffer: Buffer;
    originalname: string;
    mimetype: string;
  },
  folder: string = 'medias'
): Promise<string> {
  // Generate unique filename
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const ext = path.extname(file.originalname);
  const filename = `${uniqueSuffix}${ext}`;
  const key = `${folder}/${filename}`;

  // Upload to S3
  const command = new PutObjectCommand({
    Bucket: config.s3.bucket,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    // Make file publicly readable
    ACL: 'public-read',
    // Cache static assets aggressively (we use unique filenames)
    CacheControl: 'public, max-age=31536000, immutable',
  });

  await s3Client.send(command);

  // Return public URL
  const publicUrl = `${config.s3.publicUrl}/${key}`;
  return publicUrl;
}

/**
 * Upload an arbitrary buffer to S3 (public, immutable cache).
 * Useful for generated assets (favicons, manifests, etc).
 */
export async function uploadPublicBufferToS3(params: {
  key: string;
  buffer: Buffer;
  contentType: string;
}): Promise<string> {
  await s3Client.send(
    new PutObjectCommand({
      Bucket: config.s3.bucket,
      Key: params.key,
      Body: params.buffer,
      ContentType: params.contentType,
      ACL: 'public-read',
      CacheControl: 'public, max-age=31536000, immutable',
    })
  );

  return getPublicUrl(params.key);
}

/**
 * Upload image with an additional thumbnail (~200px wide, JPEG)
 */
export async function uploadImageWithThumbnail(
  file: {
    buffer: Buffer;
    originalname: string;
    mimetype: string;
  },
  folder: string = 'medias'
): Promise<{ url: string; thumbnailUrl?: string }> {
  const isRasterImage =
    file.mimetype.startsWith('image/') && !file.mimetype.includes('svg');

  // Fallback to regular upload for non-images
  if (!isRasterImage) {
    const url = await uploadFileToS3(file, folder);
    return { url };
  }

  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const baseName = `${uniqueSuffix}`;

  // Store optimized progressive JPEG as the main asset to avoid heavy originals
  // and to improve perceived loading speed (progressive scan).
  const optimizedKey = `${folder}/${baseName}.jpg`;
  const thumbKey = `${folder}/thumbs/${baseName}-thumb.jpg`;

  // Generate optimized progressive JPEG (also caps dimensions to keep size sane)
  // rotate(): respects EXIF orientation
  const optimizedBuffer = await sharp(file.buffer)
    .rotate()
    .resize({ width: 2400, withoutEnlargement: true })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toBuffer();

  // Upload optimized main image
  await s3Client.send(
    new PutObjectCommand({
      Bucket: config.s3.bucket,
      Key: optimizedKey,
      Body: optimizedBuffer,
      ContentType: 'image/jpeg',
      ACL: 'public-read',
      CacheControl: 'public, max-age=31536000, immutable',
    })
  );

  // Generate thumbnail
  try {
    const thumbnailBuffer = await sharp(file.buffer)
      .rotate()
      .resize({ width: 200, withoutEnlargement: true })
      .jpeg({ quality: 55, progressive: true, mozjpeg: true })
      .toBuffer();

    await s3Client.send(
      new PutObjectCommand({
        Bucket: config.s3.bucket,
        Key: thumbKey,
        Body: thumbnailBuffer,
        ContentType: 'image/jpeg',
        ACL: 'public-read',
        CacheControl: 'public, max-age=31536000, immutable',
      })
    );
  } catch (error) {
    // If thumbnail generation fails, skip silently to avoid blocking upload
    console.error('Failed to generate thumbnail:', error);
    return { url: getPublicUrl(optimizedKey) };
  }

  return {
    url: getPublicUrl(optimizedKey),
    thumbnailUrl: getPublicUrl(thumbKey),
  };
}

/**
 * Delete file from S3
 *
 * @param fileUrl - Full URL or key of file to delete
 */
export async function deleteFileFromS3(fileUrl: string): Promise<void> {
  // Extract key from URL
  let key: string;

  if (fileUrl.startsWith('http')) {
    // Extract key from full URL
    const url = new URL(fileUrl);
    key = url.pathname.substring(1); // Remove leading slash
  } else {
    // Assume it's already a key
    key = fileUrl;
  }

  const command = new DeleteObjectCommand({
    Bucket: config.s3.bucket,
    Key: key,
  });

  await s3Client.send(command);
}

/**
 * Get public URL for a file key
 *
 * @param key - File key in bucket
 * @returns Public URL
 */
export function getPublicUrl(key: string): string {
  return `${config.s3.publicUrl}/${key}`;
}
