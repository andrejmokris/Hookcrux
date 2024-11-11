import { db } from '@app/db/prisma';
import { redisClient } from '@app/db/redis';
import * as sessionService from '@app/services/v1/session';
import { HookEvent } from '@app/types/event';
import { NotFoundError } from '@app/utils/errors';
import { logger } from '@app/utils/logger';
import { Request, Response } from 'express';

const clientsMap: Map<string, Response> = new Map();

const SSE_CLIENTS_PREFIX = 'sse-clients';

export const createEvent = async (sessionId: string, req: Request) => {
  const session = await sessionService.getSession(sessionId);

  if (!session) {
    throw new NotFoundError('Session not found');
  }

  const reqPath = req.path.split('send-event').slice(1).join('');

  const forwardHeaders = new Headers();

  session.allowedHeaders.forEach((header) => {
    if (req.headers[header]) {
      forwardHeaders.append(header, String(req.headers[header]));
    }
  });

  const headersObj: Record<string, string> = {};
  forwardHeaders.forEach((value, key) => {
    headersObj[key] = value;
  });

  const newEvent: HookEvent = {
    sessionId: session.id,
    path: reqPath,
    body: req.body,
    headers: headersObj,
    method: req.method,
    query: req.query,
    hostname: String(req.hostname),
  };

  const savedEvent = await db.hookEvent.create({ data: newEvent });

  await forwardEvent(sessionId, { ...newEvent, id: savedEvent.id });

  return { ...newEvent, id: savedEvent.id };
};

export const forwardEvent = async (sessionId: string, event: HookEvent) => {
  const sessionClients = await redisClient.sMembers(`${SSE_CLIENTS_PREFIX}:${sessionId}`);

  for (const client of sessionClients) {
    const clientObject = clientsMap.get(client);
    if (clientObject) {
      logger.info(`Forwarding event to client ${client}`);
      clientObject.write(`event: hook-event\ndata: ${JSON.stringify(event)}\n\n`);
    }
  }
};

export const subscribe = async (sessionId: string, clientId: string, res: Response) => {
  // check if session exists
  await sessionService.getSession(sessionId);

  logger.info(`Client ${clientId} subscribed to session ${sessionId}`);

  await redisClient.sAdd(`${SSE_CLIENTS_PREFIX}:${sessionId}`, clientId);
  clientsMap.set(clientId, res);

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  res.write(`event: info\ndata: ${JSON.stringify({ message: 'connection successfull' })}\n\n`);
};

export const unsubscribe = async (sessionId: string, clientId: string) => {
  await redisClient.sRem(`${SSE_CLIENTS_PREFIX}:${sessionId}`, JSON.stringify(clientId));
  const client = clientsMap.get(clientId);
  if (client) {
    client.end();
    clientsMap.delete(clientId);
  }
};
