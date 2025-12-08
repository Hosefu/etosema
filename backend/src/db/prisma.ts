/**
 * Prisma Client Singleton
 *
 * Ensures only one instance of PrismaClient is created and reused across the application.
 * This prevents connection pool exhaustion in development with hot reloading.
 */

import { PrismaClient } from '@prisma/client';

declare global {
  // Prevent multiple instances during development hot reloading
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

/**
 * Prisma Client instance with logging configuration
 */
export const prisma = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development'
    ? ['query', 'error', 'warn']
    : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

/**
 * Graceful shutdown handler
 */
export async function disconnectPrisma(): Promise<void> {
  await prisma.$disconnect();
}
