import { config } from '@app/config/defaults';
import { AppError, InternalServerError } from '@app/utils/errors';
import { logger } from '@app/utils/logger';
import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware = (error: Error | AppError, req: Request, res: Response, next: NextFunction) => {
  let respError;

  if (!(error instanceof AppError)) {
    respError = new InternalServerError(error.message);
    logger.error(respError);
  } else {
    respError = error;
    logger.info(respError);
  }

  res.status(respError.status).json({
    type: respError.type,
    message: respError.message,
    stack: config.env === 'development' ? respError.stack : '',
  });
};

export default errorMiddleware;
