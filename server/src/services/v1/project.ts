import { config } from '@app/config/defaults';
import { db } from '@app/db/prisma';
import { generateInviteToken } from '@app/utils/crypto';
import { ConflictError, NotFoundError, UnauthorizedError } from '@app/utils/errors';
import { createProjectSchema } from '@app/validations/project';
import moment from 'moment';
import { z } from 'zod';

export const create = async (userId: string, data: z.infer<typeof createProjectSchema>) => {
  const newProject = await db.project.create({
    data: data,
  });

  await db.projectMember.create({
    data: {
      userId: userId,
      projectId: newProject.id,
      role: 'OWNER',
    },
  });

  return newProject;
};

export const get = async (userId: string, projectId: string) => {
  const project = await db.project.findFirst({
    where: {
      id: projectId,
    },
    include: {
      members: {
        where: {
          userId: userId,
        },
      },
    },
  });

  if (!project) {
    throw new NotFoundError('Project not found');
  }

  if (project.members.length === 0) {
    throw new UnauthorizedError('You do not have permission to access this project');
  }

  return project;
};

// Get all projects that the user is a member of
export const getAll = async (userId: string) => {
  const projects = await db.project.findMany({
    where: {
      members: {
        some: {
          userId: userId,
        },
      },
    },
    include: {
      _count: {
        select: {
          members: true,
        },
      },
      members: {
        where: {
          userId: userId,
        },
        select: {
          role: true,
        },
      },
    },
  });

  return projects;
};

export const getMembers = async (userId: string, projectId: string) => {
  const userMembership = await db.projectMember.findFirst({
    where: {
      userId: userId,
      projectId: projectId,
    },
  });

  if (!userMembership) {
    throw new UnauthorizedError('You do not have permission to access this project');
  }

  const projectMembers = await db.projectMember.findMany({
    where: {
      projectId: projectId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar_url: true,
        },
      },
    },
  });

  return projectMembers;
};

export const deleteProject = async (userId: string, projectId: string) => {
  const projectMembership = await db.projectMember.findFirst({
    where: {
      userId: userId,
      projectId: projectId,
    },
  });

  if (!projectMembership || projectMembership.role !== 'OWNER') {
    throw new UnauthorizedError('You do not have permission to delete this project');
  }

  const project = await db.project.findFirst({
    where: {
      id: projectId,
    },
  });

  if (!project) {
    throw new NotFoundError('Project not found');
  }

  await db.project.delete({
    where: {
      id: projectId,
    },
  });
};

export const addMember = async (userId: string, projectId: string, assigneeId: string) => {
  const projectMembership = await db.projectMember.findFirst({
    where: {
      userId: userId,
      projectId: projectId,
    },
  });

  if (!projectMembership || projectMembership.role === 'MEMBER') {
    throw new UnauthorizedError('You do not have permission to add members to this project');
  }

  const isAssigneeAlreadyMember = await db.projectMember.findFirst({
    where: {
      userId: assigneeId,
      projectId: projectId,
    },
  });

  if (isAssigneeAlreadyMember) {
    throw new ConflictError('User is already a member of this project');
  }

  return db.projectMember.create({
    data: {
      userId: assigneeId,
      projectId: projectId,
      role: 'MEMBER',
    },
  });
};

export const updateMemberRole = async (
  userId: string,
  projectId: string,
  assigneeId: string,
  role: 'OWNER' | 'ADMIN' | 'MEMBER',
) => {
  const projectMembership = await db.projectMember.findFirst({
    where: {
      userId: userId,
      projectId: projectId,
    },
  });

  if (!projectMembership) {
    throw new NotFoundError('Project member not found');
  }

  if (projectMembership.role === 'MEMBER') {
    throw new UnauthorizedError('You do not have permission to update this project member');
  }

  const isAssigneeAlreadyMember = await db.projectMember.findFirst({
    where: {
      userId: assigneeId,
      projectId: projectId,
    },
  });

  if (!isAssigneeAlreadyMember) {
    throw new NotFoundError('User is not a member of this project');
  }

  return db.projectMember.update({
    where: {
      id: isAssigneeAlreadyMember.id,
    },
    data: {
      role: role,
    },
  });
};

export const generateInviteLink = async (userId: string, projectId: string) => {
  const token = generateInviteToken();

  const invite = await db.projectInvite.create({
    data: {
      projectId: projectId,
      createdById: userId,
      inviteToken: token,
      expiresAt: moment().add(config.auth.inviteTokenExpiration, 'seconds').toDate(),
    },
  });

  return invite;
};

export const getInvite = async (token: string) => {
  const invite = await db.projectInvite.findFirst({
    where: {
      inviteToken: token,
    },
    include: {
      project: true,
      createdBy: {
        select: {
          name: true,
          email: true,
          avatar_url: true,
        },
      },
    },
  });

  if (!invite) {
    throw new NotFoundError('Invite not found');
  }

  if (invite.acceptedById) {
    throw new ConflictError('Invite already accepted');
  }

  if (moment().isAfter(invite.expiresAt)) {
    throw new UnauthorizedError('Invite has expired');
  }

  return invite;
};

export const replyInvite = async (userId: string, inviteToken: string, accepted: boolean) => {
  const invite = await db.projectInvite.findFirst({
    where: {
      inviteToken: inviteToken,
    },
  });

  if (!invite) {
    throw new NotFoundError('Invite not found');
  }

  if (invite.acceptedById) {
    throw new ConflictError('Invite already accepted');
  }

  if (invite.expiresAt < moment().toDate()) {
    throw new UnauthorizedError('Invite has expired');
  }

  const projectMembership = await db.projectMember.findFirst({
    where: {
      userId: userId,
      projectId: invite.projectId,
    },
  });

  if (projectMembership) {
    throw new ConflictError('User is already a member of this project');
  }

  if (!accepted) {
    await db.projectInvite.update({
      where: {
        id: invite.id,
      },
      data: {
        expiresAt: moment().toDate(),
      },
    });
    return null;
  }

  await db.projectInvite.update({
    where: {
      id: invite.id,
    },
    data: {
      acceptedById: userId,
      accepterAt: moment().toDate(),
    },
  });

  const newMembership = await db.projectMember.create({
    data: {
      userId: userId,
      projectId: invite.projectId,
      role: invite.projectRole,
    },
  });

  return newMembership;
};
