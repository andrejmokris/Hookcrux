import { AuthRequest } from '@app/middleware/authentication';
import { getUser } from '@app/services/v1/user';
import { NextFunction, Request, Response } from 'express';

export const me = async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as AuthRequest).userId;

  try {
    const operationResult = await getUser(userId);
    res.json(operationResult);
  } catch (error) {
    next(error);
  }
};
