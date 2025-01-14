import { AuthRequest } from '@app/middleware/authentication';
import * as projectService from '@app/services/v1/project';
import { inviteReplySchema } from '@app/validations/invite-reply';
import { createProjectSchema } from '@app/validations/project';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export const get = async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as AuthRequest).userId;

  try {
    const operationResult = await projectService.get(userId, req.params.id);
    res.json(operationResult);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as AuthRequest).userId;

  try {
    const operationResult = await projectService.getAll(userId);
    res.json(operationResult);
  } catch (error) {
    next(error);
  }
};

export const getMembers = async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as AuthRequest).userId;

  try {
    const operationResult = await projectService.getMembers(userId, req.params.id);
    res.json(operationResult);
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as AuthRequest).userId;

  try {
    const projectData = req.body as z.infer<typeof createProjectSchema>;
    const operationResult = await projectService.create(userId, projectData);
    res.status(201).json(operationResult);
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as AuthRequest).userId;

  try {
    await projectService.deleteProject(userId, req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const addMember = async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as AuthRequest).userId;

  try {
    const operationResult = await projectService.addMember(userId, req.params.id, req.params.assigneeId);
    res.status(201).json(operationResult);
  } catch (error) {
    next(error);
  }
};

export const generateInviteLink = async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as AuthRequest).userId;

  try {
    const operationResult = await projectService.generateInviteLink(userId, req.params.id);
    res.json(operationResult);
  } catch (error) {
    next(error);
  }
};

export const getInvite = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.query.token ?? '';

  try {
    const operationResult = await projectService.getInvite(token as string);
    res.json(operationResult);
  } catch (error) {
    next(error);
  }
};

export const replyInvite = async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as AuthRequest).userId;

  try {
    const replyData = req.body as z.infer<typeof inviteReplySchema>;

    const operationResult = await projectService.replyInvite(userId, replyData.inviteToken, replyData.accepted);
    if (operationResult) {
      res.status(201).json(operationResult);
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getInvitesForProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const operationResult = await projectService.getProjectInvites(req.params.id);
    res.json(operationResult);
  } catch (error) {
    next(error);
  }
};
