/**
 * AppError Class
 *
 * Custom error class for consistent error handling across the application.
 * Extends the native Error class with HTTP status codes and error codes.
 */

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;

  /**
   * Creates an instance of AppError
   *
   * @param message - Human-readable error message
   * @param statusCode - HTTP status code (default: 500)
   * @param code - Application-specific error code (default: 'internal_error')
   * @param isOperational - Whether the error is operational (expected) or programming error (default: true)
   */
  constructor(
    message: string,
    statusCode: number = 500,
    code: string = 'internal_error',
    isOperational: boolean = true
  ) {
    super(message);

    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    Error.captureStackTrace(this, this.constructor);

    // Set the prototype explicitly to support instanceof checks
    Object.setPrototypeOf(this, AppError.prototype);
  }

  /**
   * Factory methods for common HTTP errors
   */

  static badRequest(message: string, code: string = 'bad_request'): AppError {
    return new AppError(message, 400, code);
  }

  static unauthorized(
    message: string = 'Unauthorized',
    code: string = 'unauthorized'
  ): AppError {
    return new AppError(message, 401, code);
  }

  static forbidden(
    message: string = 'Forbidden',
    code: string = 'forbidden'
  ): AppError {
    return new AppError(message, 403, code);
  }

  static notFound(
    message: string = 'Resource not found',
    code: string = 'not_found'
  ): AppError {
    return new AppError(message, 404, code);
  }

  static pinRequired(
    message: string = 'PIN required to access this resource',
    code: string = 'pin_required'
  ): AppError {
    return new AppError(message, 403, code);
  }

  static conflict(
    message: string = 'Resource conflict',
    code: string = 'conflict'
  ): AppError {
    return new AppError(message, 409, code);
  }

  static internal(
    message: string = 'Internal server error',
    code: string = 'internal_error'
  ): AppError {
    return new AppError(message, 500, code, false);
  }
}
