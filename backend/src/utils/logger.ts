/**
 * Logger Configuration
 *
 * Centralized logging using Pino for high-performance structured logging.
 * Replaces console.log with proper log levels and formatting.
 */

import pino from 'pino';
import { config } from '../config/env';

/**
 * Create Pino logger instance with environment-specific configuration
 */
export const logger = pino({
  level: config.isDevelopment ? 'debug' : 'info',
  transport: config.isDevelopment
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          ignore: 'pid,hostname',
          translateTime: 'HH:MM:ss.l',
          singleLine: false,
        },
      }
    : undefined, // In production, use default JSON output
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  serializers: {
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
    err: pino.stdSerializers.err,
  },
});

/**
 * Type-safe logger interface
 */
export type Logger = typeof logger;

/**
 * Create a child logger with additional context
 *
 * @param bindings - Additional fields to include in all logs from this logger
 * @returns Child logger instance
 */
export const createLogger = (bindings: Record<string, unknown>): Logger => {
  return logger.child(bindings);
};
