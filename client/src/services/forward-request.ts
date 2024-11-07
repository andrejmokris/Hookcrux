import { HookEvent } from '@app/types/event';
import { logger } from '@app/utils/logger';
import chalk from 'chalk';

export const forwardRequest = async (forwardURL: string, request: HookEvent) => {
  const urlWithParams = new URL(forwardURL);
  urlWithParams.search = new URLSearchParams(request.query).toString();

  try {
    await fetch(urlWithParams, {
      method: request.method,
      headers: request.headers,
      body: JSON.stringify(request.body),
    });
    logger.info(chalk.green('✓ Request forwarded successfully'));
  } catch (e) {
    logger.error('Error forwarding request: ' + e);
  }
};

export const printRequest = (request: HookEvent) => {
  logger.info(
    chalk.green('✓ Request received: ') +
      chalk.yellow(`${request.method.toUpperCase()} `) +
      chalk.blue(request.path) +
      (Object.keys(request.query).length > 0
        ? '?' +
          Object.keys(request.query)
            .map((key) => key + '=' + request.query[key])
            .join('&')
        : ''),
  );
};
