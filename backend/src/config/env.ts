/**
 * Environment Configuration
 *
 * Centralizes all environment variables with validation and type safety.
 */

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Validates that required environment variables are present
 */
function validateEnv(): void {
  const required = [
    'DATABASE_URL',
    'PIN_SESSION_SECRET',
    'JWT_SECRET',
    'SESSION_SECRET',
    'S3_ENDPOINT',
    'S3_BUCKET',
    'S3_ACCESS_KEY',
    'S3_SECRET_KEY',
  ];

  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env file.'
    );
  }
}

// Validate on module load
validateEnv();

/**
 * Environment configuration object
 * Provides type-safe access to environment variables
 */
export const config = {
  // Server
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV !== 'production',
  isProduction: process.env.NODE_ENV === 'production',

  // Database
  databaseUrl: process.env.DATABASE_URL as string,

  // Admin Panel
  admin: {
    email: process.env.ADMIN_EMAIL || 'admin@etosema.ru',
    password: process.env.ADMIN_PASSWORD || 'changeme',
  },

  // Security Secrets
  secrets: {
    pinSession: process.env.PIN_SESSION_SECRET as string,
    jwt: process.env.JWT_SECRET as string,
    session: process.env.SESSION_SECRET as string,
  },

  // CORS
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',

  // Rate Limiting for PIN attempts
  rateLimit: {
    maxAttempts: 8, // Max failed attempts
    windowMs: 60 * 60 * 1000, // 1 hour in milliseconds
  },

  // PIN Session
  pinSession: {
    cookieName: 'pinSession',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  },

  // S3 Storage
  s3: {
    endpoint: process.env.S3_ENDPOINT as string,
    bucket: process.env.S3_BUCKET as string,
    accessKey: process.env.S3_ACCESS_KEY as string,
    secretKey: process.env.S3_SECRET_KEY as string,
    region: process.env.S3_REGION || 'us-east-1',
    publicUrl: process.env.S3_PUBLIC_URL || `https://${process.env.S3_BUCKET}.s3.regru.cloud`,
  },
} as const;

export type Config = typeof config;
