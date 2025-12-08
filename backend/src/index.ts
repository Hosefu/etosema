/**
 * Etosema Portfolio Backend
 *
 * Main entry point for the Express server.
 * Provides JSON API for portfolio website and AdminJS panel.
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { config } from './config/env';
import { prisma, disconnectPrisma } from './db/prisma';
import { attachPinContext } from './modules/pin/pin.middleware';
import { CasesService } from './modules/cases/cases.service';
import { createCasesRouter } from './modules/cases/cases.router';
import pinRouter from './modules/pin/pin.router';
import profileRouter from './modules/profile/profile.router';
import adminRouter from './modules/admin/admin.router';
import designRouter from './modules/design/design.router';
import publicDesignRouter from './modules/design/public.router';

// ============================================================================
// CREATE EXPRESS APP
// ============================================================================

const app = express();

// ============================================================================
// MIDDLEWARE
// ============================================================================

// Security headers
app.use(helmet({
  contentSecurityPolicy: false, // Disable for AdminJS
}));

// CORS - allow any localhost port in development
app.use(cors({
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
}));

// Compression
app.use(compression());

// Logging
if (config.isDevelopment) {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parsing
app.use(cookieParser());

// ============================================================================
// PUBLIC API ROUTES
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
// APPLY ROUTES
// ============================================================================

app.use('/api/public', attachPinContext);
app.use('/api/public/cases', casesRouter);
app.use('/api/public/pin', pinRouter);
app.use('/api/public/profile', profileRouter);
app.use('/api/public/design', publicDesignRouter);

// ============================================================================
// ADMIN API
// ============================================================================

/**
 * Admin API routes (protected)
 */
app.use('/api/admin/design', designRouter);
app.use('/api/admin', adminRouter);

// ============================================================================
// ERROR HANDLING
// ============================================================================

/**
 * 404 handler
 */
app.use((req, res) => {
  res.status(404).json({
    error: {
      code: 'not_found',
      message: 'Endpoint not found',
    },
  });
});

/**
 * Global error handler
 */
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);

  res.status(500).json({
    error: {
      code: 'internal_error',
      message: config.isDevelopment ? err.message : 'An internal error occurred',
    },
  });
});

// ============================================================================
// SERVER START
// ============================================================================

/**
 * Start the server
 */
async function start() {
  try {
    // Test database connection
    await prisma.$connect();
    console.log('✓ Database connected');

    // Start listening
    const server = app.listen(config.port, () => {
      console.log('');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('  Etosema Portfolio Backend');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('');
      console.log(`  Environment:  ${config.nodeEnv}`);
      console.log(`  Server:       http://localhost:${config.port}`);
      console.log(`  API:          http://localhost:${config.port}/api/public`);
      console.log(`  Admin Panel:  http://localhost:${config.port}/admin`);
      console.log('');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('');
    });

    // Graceful shutdown
    const shutdown = async () => {
      console.log('\nShutting down gracefully...');

      server.close(async () => {
        await disconnectPrisma();
        console.log('✓ Server closed');
        process.exit(0);
      });

      // Force shutdown after 10 seconds
      setTimeout(() => {
        console.error('Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start if running directly
if (require.main === module) {
  start();
}

export default app;
