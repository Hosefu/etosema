/**
 * AdminJS Configuration
 *
 * Sets up the admin panel for managing cases, blocks, PIN codes, and profile.
 */

import AdminJS, { type ActionRequest } from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/prisma';
import { PrismaClient } from '@prisma/client';
import { config } from '../config/env';
import { hashPin } from '../modules/pin/pin.service';

// Register Prisma adapter
AdminJS.registerAdapter({ Database, Resource });

/**
 * Create and configure AdminJS instance
 */
export function createAdmin(prisma: PrismaClient) {
  const admin = new AdminJS({
    resources: [
      // ======================================================================
      // CASE MANAGEMENT
      // ======================================================================
      {
        resource: { model: prisma.case, client: prisma },
        options: {
          navigation: {
            name: 'Portfolio',
            icon: 'Folder',
          },
          listProperties: ['title', 'year', 'slug', 'isNda', 'orderRank'],
          showProperties: [
            'id',
            'title',
            'shortTitle',
            'slug',
            'year',
            'summary',
            'isNda',
            'coverUrl',
            'orderRank',
            'createdAt',
            'updatedAt',
          ],
          editProperties: [
            'title',
            'shortTitle',
            'slug',
            'year',
            'summary',
            'isNda',
            'coverUrl',
            'orderRank',
          ],
          filterProperties: ['title', 'year', 'isNda', 'slug'],
          sort: {
            sortBy: 'orderRank',
            direction: 'asc',
          },
        },
      },

      // ======================================================================
      // CASE BLOCKS
      // ======================================================================
      {
        resource: { model: prisma.caseBlock, client: prisma },
        options: {
          navigation: {
            name: 'Portfolio',
            icon: 'Layers',
          },
          listProperties: ['id', 'caseId', 'layout', 'orderRank'],
          editProperties: ['caseId', 'layout', 'orderRank'],
          sort: {
            sortBy: 'orderRank',
            direction: 'asc',
          },
        },
      },

      // ======================================================================
      // CASE BLOCK MEDIAS
      // ======================================================================
      {
        resource: { model: prisma.caseBlockMedia, client: prisma },
        options: {
          navigation: {
            name: 'Portfolio',
            icon: 'Image',
          },
          listProperties: ['id', 'blockId', 'type', 'position', 'url'],
          editProperties: [
            'blockId',
            'type',
            'position',
            'url',
            'alt',
            'aspectRatio',
          ],
          sort: {
            sortBy: 'position',
            direction: 'asc',
          },
        },
      },

      // ======================================================================
      // PIN CODES
      // ======================================================================
      {
        resource: { model: prisma.pinCode, client: prisma },
        options: {
          navigation: {
            name: 'Access Control',
            icon: 'Lock',
          },
          listProperties: ['label', 'accessAll', 'expiresAt', 'createdAt'],
          showProperties: [
            'id',
            'label',
            'accessAll',
            'expiresAt',
            'createdAt',
            'updatedAt',
          ],
          editProperties: ['label', 'accessAll', 'expiresAt'],
          properties: {
            codeHash: {
              isVisible: false, // Hide hash from UI
            },
          },
          actions: {
            // Custom action for creating PIN with plain text code
            new: {
              before: async (request: ActionRequest) => {
                if (request.payload?.plainPin) {
                  const hash = await hashPin(request.payload.plainPin);
                  request.payload.codeHash = hash;
                  delete request.payload.plainPin;
                }
                return request;
              },
            },
          },
        },
      },

      // ======================================================================
      // PIN CODE CASES (many-to-many)
      // ======================================================================
      {
        resource: { model: prisma.pinCodeCase, client: prisma },
        options: {
          navigation: {
            name: 'Access Control',
            icon: 'Link',
          },
          listProperties: ['pinCodeId', 'caseId'],
          editProperties: ['pinCodeId', 'caseId'],
        },
      },

      // ======================================================================
      // PIN USAGE (read-only analytics)
      // ======================================================================
      {
        resource: { model: prisma.pinUsage, client: prisma },
        options: {
          navigation: {
            name: 'Analytics',
            icon: 'Activity',
          },
          listProperties: ['ip', 'success', 'pinCodeId', 'createdAt'],
          showProperties: [
            'id',
            'ip',
            'userAgent',
            'success',
            'pinCodeId',
            'createdAt',
          ],
          actions: {
            new: { isVisible: false },
            edit: { isVisible: false },
            delete: { isVisible: false },
          },
        },
      },

      // ======================================================================
      // PROFILE
      // ======================================================================
      {
        resource: { model: prisma.profile, client: prisma },
        options: {
          navigation: {
            name: 'Content',
            icon: 'User',
          },
          listProperties: ['id', 'title'],
          editProperties: [
            'title',
            'description',
            'contactsJson',
            'projectsJson',
            'socialsJson',
          ],
          actions: {
            new: { isVisible: false }, // Only one profile should exist
            delete: { isVisible: false },
          },
        },
      },
    ],
    rootPath: '/admin',
    branding: {
      companyName: 'Etosema Portfolio',
      logo: false,
    },
  });

  return admin;
}

/**
 * Create AdminJS router with authentication
 */
export function createAdminRouter(admin: AdminJS) {
  // Simple authentication
  const authenticate = async (email: string, password: string) => {
    if (email === config.admin.email && password === config.admin.password) {
      return { email };
    }
    return null;
  };

  const router = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: config.secrets.session,
    },
    null,
    {
      resave: false,
      saveUninitialized: false,
      secret: config.secrets.session,
      cookie: {
        httpOnly: true,
        secure: config.isProduction,
      },
    }
  );

  return router;
}
