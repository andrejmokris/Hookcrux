import * as authController from '@app/controllers/auth';
import * as eventController from '@app/controllers/event';
import * as projectController from '@app/controllers/project';
import * as sessionController from '@app/controllers/session';
import * as userController from '@app/controllers/user';
import { authenticate } from '@app/middleware/authentication';
import { roleGuard } from '@app/middleware/role-guard';
import { validate } from '@app/middleware/validate';
import { githubLoginSchema } from '@app/validations/github-login';
import { inviteReplySchema } from '@app/validations/invite-reply';
import { logInSchema, signUpSchema } from '@app/validations/password-login';
import { createProjectSchema } from '@app/validations/project';
import { Router } from 'express';

const router = Router();

router.post('/auth/github', validate(githubLoginSchema), authController.githubCallback);
router.post('/auth/sign-in', validate(logInSchema), authController.passwordSignIn);
router.post('/auth/sign-up', validate(signUpSchema), authController.passwordSignUp);

router.get('/users/me', authenticate, userController.me);

router.get('/webhook-sessions/:id', sessionController.get);
router.get('/webhook-sessions/:id/detail', sessionController.getWithEvents);

// Create new socket session
router.post('/webhook-sessions/new', sessionController.create);

// Get new event from the producer
router.all('/webhook-sessions/:id/send-event/*', eventController.create);
router.get('/webhook-sessions/:id/events', eventController.subscribe);

// Projects
router.get('/projects', authenticate, projectController.getAll);
router.get('/projects/invite', authenticate, projectController.getInvite);

router.get('/projects/:id', authenticate, projectController.get);
router.get('/projects/:id/members', authenticate, projectController.getMembers);
router.get('/projects/:id/invites', [authenticate, roleGuard('ADMIN')], projectController.getInvitesForProject);

router.post('/projects', [authenticate, validate(createProjectSchema)], projectController.create);
router.post('/projects/invite/reply', [authenticate, validate(inviteReplySchema)], projectController.replyInvite);
router.post('/projects/:id/invite', [authenticate, roleGuard('ADMIN')], projectController.generateInviteLink);
router.post(
  '/projects/:id/members/:assigneeId',
  [authenticate, validate(createProjectSchema)],
  projectController.addMember,
);

router.delete('/projects/:id', authenticate, projectController.deleteProject);

export const v1Routes = router;
