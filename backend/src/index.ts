/**
 * Etosema Portfolio Backend
 *
 * Main entry point that starts the Express server.
 * Application setup is in app.ts for better separation of concerns.
 */

import app from './app';
import { config } from './config/env';
import { prisma, disconnectPrisma } from './db/prisma';
import { logger } from './utils/logger';
import { startMonitoringService } from './modules/monitoring/monitoring.service';

// ============================================================================
// SERVER START
// ============================================================================

/**
 * Start the server
 */
async function start(): Promise<void> {
  try {
    // Test database connection
    await prisma.$connect();
    logger.info('Database connected');

    const stopMonitoring = startMonitoringService(prisma);

    // Start listening
    const server = app.listen(config.port, () => {
      logger.info('');
      logger.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      logger.info('  Etosema Portfolio Backend');
      logger.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      logger.info('');
      logger.info(`  Environment:  ${config.nodeEnv}`);
      logger.info(`  Server:       http://localhost:${config.port}`);
      logger.info(`  API:          http://localhost:${config.port}/api/public`);
      logger.info(`  Admin Panel:  http://localhost:${config.port}/admin`);
      logger.info('');
      logger.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      logger.info('');
    });

    // Graceful shutdown
    const shutdown = async (): Promise<void> => {
      logger.info('Shutting down gracefully...');
      stopMonitoring?.();

      server.close(async () => {
        await disconnectPrisma();
        logger.info('Server closed');
        process.exit(0);
      });

      // Force shutdown after 10 seconds
      setTimeout(() => {
        logger.error('Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    logger.fatal({ err: error }, 'Failed to start server');
    process.exit(1);
  }
}

// Start if running directly
if (require.main === module) {
  start();
}
