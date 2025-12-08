import { S3Client, PutBucketCorsCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import dotenv from 'dotenv';

// Manually load .env to avoid import hoisting issues
const envConfig = dotenv.parse(fs.readFileSync('.env'));

console.log('Debug S3 Config:', {
  endpoint: envConfig.S3_ENDPOINT,
  region: envConfig.S3_REGION,
  bucket: envConfig.S3_BUCKET,
  accessKeyIdLen: envConfig.S3_ACCESS_KEY?.length,
  secretAccessKeyLen: envConfig.S3_SECRET_KEY?.length,
});

// Initialize S3 Client
const s3Client = new S3Client({
  region: envConfig.S3_REGION,
  endpoint: envConfig.S3_ENDPOINT,
  credentials: {
    accessKeyId: envConfig.S3_ACCESS_KEY,
    secretAccessKey: envConfig.S3_SECRET_KEY,
  },
  forcePathStyle: true,
});

async function configureCors() {
  console.log(`Configuring CORS for bucket: ${envConfig.S3_BUCKET}...`);

  const params = {
    Bucket: envConfig.S3_BUCKET,
    CORSConfiguration: {
      CORSRules: [
        {
          AllowedOrigins: ['*'],
          AllowedMethods: ['GET', 'HEAD'],
          AllowedHeaders: ['*'],
          MaxAgeSeconds: 3000,
        },
      ],
    },
  };

  try {
    const command = new PutBucketCorsCommand(params);
    await s3Client.send(command);
    console.log('✅ Successfully configured CORS policy.');
  } catch (error) {
    console.error('❌ Error configuring CORS:', error);
  }
}

configureCors();
