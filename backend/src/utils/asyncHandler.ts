/**
 * Async Handler Utility
 *
 * Wrapper for async route handlers to automatically catch errors
 * and pass them to the error handling middleware.
 *
 * This eliminates the need for try-catch blocks in every route handler.
 */

import { Request, Response, NextFunction } from 'express';

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown>;

/**
 * Wraps an async function to catch any errors and pass them to next()
 *
 * @param fn - Async route handler function
 * @returns Wrapped function with error handling
 *
 * @example
 * router.get('/users', asyncHandler(async (req, res) => {
 *   const users = await userService.getAll();
 *   res.json({ data: users });
 * }));
 */
export const asyncHandler = (fn: AsyncFunction) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
