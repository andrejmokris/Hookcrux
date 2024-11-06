import { logger } from '@app/utils/logger';
import { createClient } from 'redis';

export const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('connect', () => {
  logger.info('Redis client connected');
});

redisClient.on('error', (err) => {
  logger.error('Redis client error, disconnecting...', err);
  redisClient.disconnect();
});

// Connect to the Redis server
redisClient.connect().catch(logger.error);
