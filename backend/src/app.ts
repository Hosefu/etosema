/**
 * Express Application Setup
 *
 * Configures and exports the Express application with all middleware and routes.
 * Separated from server startup for better testability.
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import pinoHttp from 'pino-http';
import cookieParser from 'cookie-parser';
import { config } from './config/env';
import { logger } from './utils/logger';
import { prisma } from './db/prisma';
import { attachPinContext } from './modules/pin/pin.middleware';
import { CasesService } from './modules/cases/cases.service';
import { createCasesRouter } from './modules/cases/cases.router';
import pinRouter from './modules/pin/pin.router';
import profileRouter from './modules/profile/profile.router';
import adminRouter from './modules/admin/admin.router';
import designRouter from './modules/design/design.router';
import publicDesignRouter from './modules/design/public.router';
import {
  errorHandler,
  notFoundHandler,
  setupGlobalErrorHandlers,
} from './middleware/errorHandler';

// ============================================================================
// SETUP GLOBAL ERROR HANDLERS
// ============================================================================

setupGlobalErrorHandlers();

// ============================================================================
// CREATE EXPRESS APP
// ============================================================================

const app = express();

// ============================================================================
// MIDDLEWARE
// ============================================================================

// Security headers
app.use(
  helmet({
    contentSecurityPolicy: false, // Disable for AdminJS
  })
);

// CORS - allow any localhost port in development
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);

      // In development, allow any localhost port
      if (origin.match(/^http:\/\/localhost:\d+$/)) {
        return callback(null, true);
      }

      // In production, only allow configured frontend URL
      if (origin === config.frontendUrl) {
        return callback(null, true);
      }

      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

// Compression
app.use(compression());

// HTTP Request Logging with Pino
app.use(
  pinoHttp({
    logger,
    autoLogging: {
      ignore: (req) => req.url === '/api/health', // Don't log health checks
    },
  })
);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parsing
app.use(cookieParser());

// ============================================================================
// DEPENDENCY INJECTION SETUP
// ============================================================================

/**
 * Initialize services with dependencies
 */
const casesService = new CasesService(prisma);

/**
 * Create routers with injected services
 */
const casesRouter = createCasesRouter(casesService);

// ============================================================================
// API ROUTES
// ============================================================================

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

/**
 * Public API routes
 * All public routes use PIN context middleware
 */
app.use('/api/public', attachPinContext);
app.use('/api/public/cases', casesRouter);
app.use('/api/public/pin', pinRouter);
app.use('/api/public/profile', profileRouter);
app.use('/api/public/design', publicDesignRouter);

/**
 * Admin API routes (protected)
 */
app.use('/api/admin/design', designRouter);
app.use('/api/admin', adminRouter);

// ============================================================================
// ERROR HANDLING
// ============================================================================

/**
 * 404 handler - must be after all routes
 */
app.use(notFoundHandler);

/**
 * Global error handler - must be last
 */
app.use(errorHandler);

// ============================================================================
// EXPORT
// ============================================================================

export default app;
