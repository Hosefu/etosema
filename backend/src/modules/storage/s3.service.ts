/**
 * S3 Storage Service
 *
 * Handles file uploads to S3-compatible storage.
 */

import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { config } from '../../config/env';
import path from 'path';

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
  });

  await s3Client.send(command);

  // Return public URL
  const publicUrl = `${config.s3.publicUrl}/${key}`;
  return publicUrl;
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

