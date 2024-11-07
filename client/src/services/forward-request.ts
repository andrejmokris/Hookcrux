import { HookEvent } from '@app/types/event';
import { logger } from '@app/utils/logger';
import chalk from 'chalk';

export const forwardRequest = async (forwardURL: string, request: HookEvent) => {
  try {
    await fetch(forwardURL, {
      method: request.method,
      headers: request.headers,
      body: JSON.stringify(request.body),
    });
    logger.info(chalk.green('✓ Request forwarded successfully'));
  } catch (e) {
    logger.error('Error forwarding request: ' + e);
  }
};
