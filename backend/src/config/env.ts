/**
 * Environment Configuration
 *
 * Centralizes all environment variables with validation and type safety using Zod.
 * The application will fail fast at startup if any required variables are missing or invalid.
 */

import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables from .env file
dotenv.config();

/**
 * Zod schema for environment variables
 * Provides runtime validation and type inference
 */
const envSchema = z.object({
  // Server
  PORT: z.string().default('3001').transform(Number),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  // Database
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

  // Admin Panel
  ADMIN_EMAIL: z.string().email().default('admin@etosema.ru'),
  ADMIN_PASSWORD: z.string().min(6).default('changeme'),

  // Security Secrets
  PIN_SESSION_SECRET: z
    .string()
    .min(32, 'PIN_SESSION_SECRET must be at least 32 characters'),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  SESSION_SECRET: z
    .string()
    .min(32, 'SESSION_SECRET must be at least 32 characters'),

  // CORS
  FRONTEND_URL: z.string().url().default('http://localhost:3000'),

  // S3 Storage
  S3_ENDPOINT: z.string().url('S3_ENDPOINT must be a valid URL'),
  S3_BUCKET: z.string().min(1, 'S3_BUCKET is required'),
  S3_ACCESS_KEY: z.string().min(1, 'S3_ACCESS_KEY is required'),
  S3_SECRET_KEY: z.string().min(1, 'S3_SECRET_KEY is required'),
  S3_REGION: z.string().default('us-east-1'),
  S3_PUBLIC_URL: z.string().url().optional(),
});

/**
 * Parse and validate environment variables
 * Throws an error with detailed information if validation fails
 */
const parseEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors
        .map((err) => `  - ${err.path.join('.')}: ${err.message}`)
        .join('\n');
      throw new Error(
        `\n❌ Invalid environment variables:\n${missingVars}\n\nPlease check your .env file.\n`
      );
    }
    throw error;
  }
};

// Parse and validate on module load (fail-fast)
const env = parseEnv();

/**
 * Typed and validated configuration object
 * Provides type-safe access to all environment variables
 */
export const config = {
  // Server
  port: env.PORT,
  nodeEnv: env.NODE_ENV,
  isDevelopment: env.NODE_ENV !== 'production',
  isProduction: env.NODE_ENV === 'production',

  // Database
  databaseUrl: env.DATABASE_URL,

  // Admin Panel
  admin: {
    email: env.ADMIN_EMAIL,
    password: env.ADMIN_PASSWORD,
  },

  // Security Secrets
  secrets: {
    pinSession: env.PIN_SESSION_SECRET,
    jwt: env.JWT_SECRET,
    session: env.SESSION_SECRET,
  },

  // CORS
  frontendUrl: env.FRONTEND_URL,

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
    endpoint: env.S3_ENDPOINT,
    bucket: env.S3_BUCKET,
    accessKey: env.S3_ACCESS_KEY,
    secretKey: env.S3_SECRET_KEY,
    region: env.S3_REGION,
    publicUrl: env.S3_PUBLIC_URL || `https://${env.S3_BUCKET}.s3.regru.cloud`,
  },
} as const;

export type Config = typeof config;
