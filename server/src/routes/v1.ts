import * as eventController from '@app/controllers/event';
import * as sessionController from '@app/controllers/session';
import { Router } from 'express';

const router = Router();

router.get('/webhook-sessions/:id', sessionController.get);
// Create new socket session
router.post('/webhook-sessions/new', sessionController.create);

// Get new event from the producer
router.post('/webhook-sessions/:id/send-event/*', eventController.create);

router.get('/webhook-sessions/:id/events', eventController.subscribe);

export const v1Routes = router;
