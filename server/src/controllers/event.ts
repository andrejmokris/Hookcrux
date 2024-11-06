import * as eventService from '@app/services/v1/event';
import { generateSessionToken } from '@app/utils/crypto';
import { logger } from '@app/utils/logger';
import { NextFunction, Request, Response } from 'express';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const operationResult = await eventService.createEvent(req.params.id, req);
    res.json(operationResult);
  } catch (error) {
    next(error);
  }
};

export const subscribe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionId = req.params.id;
    const clientId = generateSessionToken();

    await eventService.subscribe(sessionId, clientId, res);

    req.on('close', () => {
      logger.info(`Client ${clientId} unsubscribed from session ${sessionId}`);
      eventService.unsubscribe(sessionId, clientId);
    });
  } catch (error) {
    next(error);
  }
};
