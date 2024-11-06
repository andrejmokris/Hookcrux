import * as sessionService from '@app/services/v1/session';
import { NextFunction, Request, Response } from 'express';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const operationResult = await sessionService.createSession();
    res.status(201).json(operationResult);
  } catch (error) {
    next(error);
  }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const operationResult = await sessionService.getSession(req.params.id);
    res.status(200).json(operationResult);
  } catch (error) {
    next(error);
  }
};
