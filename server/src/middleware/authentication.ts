import { verifyToken } from '@app/utils/crypto';
import { UnauthorizedError } from '@app/utils/errors';
import { NextFunction, Request, Response } from 'express';

export interface AuthRequest extends Request {
  userId: string;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  let token = '';
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  } else {
    next(new UnauthorizedError('Token not found'));
  }

  const tokenPayload = verifyToken(token);

  if (!tokenPayload || !tokenPayload.sub) {
    return next(new UnauthorizedError('Invalid token'));
  }

  (req as AuthRequest).userId = tokenPayload.sub;
  next();
};
