import { redisClient } from '@app/db/redis';
import { HookSession } from '@app/types/session';
import { generateSessionToken } from '@app/utils/crypto';
import { NotFoundError } from '@app/utils/errors';
import moment from 'moment';

export const createSession = async () => {
  const newSession: HookSession = {
    id: generateSessionToken(),
    createdAt: moment().format(),
  };

  await redisClient.set(`session-${newSession.id}`, JSON.stringify(newSession));

  return newSession;
};

export const getSession = async (sessionId: string) => {
  const session = await redisClient.get(`session-${sessionId}`);

  if (!session) {
    throw new NotFoundError('Session not found');
  }

  return JSON.parse(session) as HookSession;
};
