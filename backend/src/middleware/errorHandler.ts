/**
 * Global Error Handler Middleware
 *
 * Catches all errors thrown in the application and formats them
 * into consistent JSON responses. Integrates with AppError class
 * and logger for proper error tracking.
 */

import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { logger } from '../utils/logger';
import { config } from '../config/env';
import { ApiResponse } from '../types/api';

/**
 * Global error handling middleware
 *
 * Must be registered after all routes and other middleware.
 * Handles both operational (expected) and programming (unexpected) errors.
 *
 * @param err - Error object (can be AppError or generic Error)
 * @param req - Express request
 * @param res - Express response
 * @param next - Express next function
 */
export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  // Determine if this is an operational error (AppError) or programming error
  const isAppError = err instanceof AppError;
  const isOperational = isAppError && err.isOperational;

  // Extract error details
  const statusCode = isAppError ? err.statusCode : 500;
  const code = isAppError ? err.code : 'internal_error';
  const message = isOperational
    ? err.message
    : config.isDevelopment
      ? err.message
      : 'An internal error occurred';

  // Log the error with appropriate level
  if (isOperational) {
    // Operational errors are expected (e.g., validation errors, not found)
    logger.warn(
      {
        err,
        statusCode,
        code,
        method: req.method,
        path: req.path,
        ip: req.ip,
      },
      `Operational error: ${message}`
    );
  } else {
    // Programming errors are unexpected and should be investigated
    logger.error(
      {
        err,
        statusCode,
        method: req.method,
        path: req.path,
        body: req.body,
        query: req.query,
        params: req.params,
        ip: req.ip,
        userAgent: req.get('user-agent'),
      },
      `Programming error: ${message}`
    );
  }

  // Send error response
  const response: ApiResponse = {
    error: {
      code,
      message,
      // Include stack trace in development mode for programming errors
      ...(config.isDevelopment &&
        !isOperational && {
          stack: err.stack,
        }),
    },
  };

  res.status(statusCode).json(response);
};

/**
 * 404 Not Found Handler
 *
 * Catches requests to undefined routes and converts them to AppError.
 * Must be registered after all routes but before error handler.
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const error = AppError.notFound(
    `Route ${req.method} ${req.path} not found`,
    'route_not_found'
  );
  next(error);
};

/**
 * Unhandled Promise Rejection Handler
 *
 * Global handler for unhandled promise rejections.
 * Logs the error and exits the process in production.
 */
export const setupGlobalErrorHandlers = (): void => {
  process.on('unhandledRejection', (reason: Error | any) => {
    logger.fatal(
      { err: reason },
      'Unhandled Promise Rejection - shutting down'
    );

    if (config.isProduction) {
      process.exit(1);
    }
  });

  process.on('uncaughtException', (error: Error) => {
    logger.fatal({ err: error }, 'Uncaught Exception - shutting down');

    if (config.isProduction) {
      process.exit(1);
    }
  });
};
