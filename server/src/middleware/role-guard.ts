import { db } from '@app/db/prisma';
import { ProjectRole } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { AuthRequest } from './authentication';

export const roleGuard = (role: ProjectRole) => async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as AuthRequest).userId;
  const projectId = req.params.id;

  const projectMembership = await db.projectMember.findFirst({
    where: {
      userId: userId,
      projectId: projectId,
    },
  });

  if (!projectMembership || projectMembership.role < role) {
    return next({
      status: 401,
      message: 'You do not have permission to access this resource',
    });
  }

  next();
};
