import { ValidationError } from '@app/utils/errors';
import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  const parsedObject = await schema.safeParseAsync(req.body);
  if (parsedObject.error) {
    next(new ValidationError());
  }
  req.body = parsedObject.data;
  next();
};
