import { config } from '@app/config/defaults';
import { db } from '@app/db/prisma';
import { redisClient } from '@app/db/redis';
import { HookSession } from '@app/types/session';
import { NotFoundError } from '@app/utils/errors';
import { logger } from '@app/utils/logger';

export const createSession = async () => {
  const newSession = await db.hookSession.create({
    data: { allowedHeaders: config.allowedHeaders },
  });

  await redisClient.set(`session-${newSession.id}`, JSON.stringify(newSession));

  logger.info(`New session created: ${newSession.id}`);

  return newSession;
};

export const getSession = async (sessionId: string) => {
  let session: HookSession | null = null;
  let foundInRedis = false;

  const redisSession = await redisClient.get(`session-${sessionId}`);
  if (redisSession) {
    logger.info(`Session ${sessionId} found in Redis`);
    session = JSON.parse(redisSession);
    foundInRedis = true;
  } else {
    logger.info(`Session ${sessionId} not found in Redis, fetching from DB`);
    session = await db.hookSession.findUnique({ where: { id: sessionId } });
  }

  if (!session) {
    throw new NotFoundError('Session not found');
  }

  if (!foundInRedis) {
    await redisClient.set(`session-${session.id}`, JSON.stringify(session));
  }

  // Retrieve the number of connected clients for the session
  const connectedUsers = await redisClient.sMembers(`sse-clients:${sessionId}`);

  return { ...session, connectedUsers: connectedUsers.length };
};
