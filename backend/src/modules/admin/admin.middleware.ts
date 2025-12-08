/**
 * Admin Authentication Middleware
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../config/env';

export interface AdminRequest extends Request {
  admin?: {
    email: string;
  };
}

/**
 * Verify admin JWT token
 */
export function verifyAdminToken(
  req: AdminRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      error: {
        code: 'unauthorized',
        message: 'Admin token required',
      },
    });
  }

  try {
    const decoded = jwt.verify(token, config.secrets.jwt) as { email: string };
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      error: {
        code: 'invalid_token',
        message: 'Invalid admin token',
      },
    });
  }
}
