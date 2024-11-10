import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { config } from './config/defaults';
import { redisClient } from './db/redis';
import errorMiddleware from './middleware/error-handling';
import { v1Routes } from './routes/v1';
import { logger } from './utils/logger';

export const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(config.server.corsOptions));

// Initialize redis client
redisClient;

app.use('/api/v1', v1Routes);

app.use(errorMiddleware);

const port = config.server.port;

const server = app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});

process.once('SIGINT', () => {
  logger.info('Stopping the server...');
  server.close();
});

process.once('SIGTERM', () => {
  logger.info('Stopping the server...');
  server.close();
});
