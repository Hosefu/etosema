/**
 * Wait for database to be ready
 * Simple script that tries to connect using Prisma until success
 */

// Ensure we're in the backend directory where Prisma schema is located
// This script should be run from /app/backend directory

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['error'],
});

async function waitForDatabase(maxAttempts = 30, delayMs = 1000) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await prisma.$connect();
      console.log('✅ Database is ready!');
      await prisma.$disconnect();
      return true;
    } catch (error) {
      if (attempt < maxAttempts) {
        console.log(`⏳ Waiting for database... (attempt ${attempt}/${maxAttempts})`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      } else {
        console.error('❌ Failed to connect to database after', maxAttempts, 'attempts');
        console.error(error.message || error);
        await prisma.$disconnect().catch(() => {});
        process.exit(1);
      }
    }
  }
}

waitForDatabase()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Unexpected error:', error.message || error);
    process.exit(1);
  });
