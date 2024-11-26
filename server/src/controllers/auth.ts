import * as authService from '@app/services/v1/auth';
import { githubLoginSchema } from '@app/validations/github-login';
import { logInSchema, signUpSchema } from '@app/validations/password-login';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export const githubCallback = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqBody = req.body as z.infer<typeof githubLoginSchema>;
    const operationResult = await authService.githubCallback(reqBody.code);
    res.status(200).json(operationResult);
  } catch (error) {
    next(error);
  }
};

export const passwordSignIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqBody = req.body as z.infer<typeof logInSchema>;
    const operationResult = await authService.passwordLogin(reqBody);
    res.status(200).json(operationResult);
  } catch (error) {
    next(error);
  }
};

export const passwordSignUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqBody = req.body as z.infer<typeof signUpSchema>;
    const operationResult = await authService.passwordSignUp(reqBody);
    res.status(201).json(operationResult);
  } catch (error) {
    next(error);
  }
};
