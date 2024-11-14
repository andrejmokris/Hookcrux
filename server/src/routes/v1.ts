import * as authController from '@app/controllers/auth';
import * as eventController from '@app/controllers/event';
import * as sessionController from '@app/controllers/session';
import * as userController from '@app/controllers/user';
import { authenticate } from '@app/middleware/authentication';
import { validate } from '@app/middleware/validate';
import { githubLoginSchema } from '@app/validations/github-login';
import { logInSchema, signUpSchema } from '@app/validations/password-login';
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

export const v1Routes = router;
