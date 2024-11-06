export class AppError extends Error {
  type: string;
  status: number;

  constructor(message: string, type: string, status: number) {
    super(message);
    this.name = this.constructor.name;
    this.type = type;
    this.status = status;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message?: string) {
    super(message || 'Invalid or missing request data.', 'BAD_REQUEST', 400);
  }
}

export class NotFoundError extends AppError {
  constructor(message?: string) {
    super(message || 'Resource not found.', 'NOT_FOUND', 404);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message?: string) {
    super(message || 'Site access denied.', 'UNAUTHORIZED', 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message?: string) {
    super(message || 'You do not have permission to access this resource.', 'FORBIDDEN', 403);
  }
}

export class ConflictError extends AppError {
  constructor(message?: string) {
    super(
      message || 'The request could not be completed due to a conflict with the current state of the resource.',
      'CONFLICT',
      409,
    );
  }
}

export class InternalServerError extends AppError {
  constructor(message?: string) {
    super(message || 'Something went wrong. Please try again later or contact support.', 'INTERNAL_SERVER', 500);
  }
}
