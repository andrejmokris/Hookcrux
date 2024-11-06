import { HookEvent } from '@app/types/event';
import { logger } from '@app/utils/logger';
import chalk from 'chalk';

const FORWARD_HEADERS = [
  'content-type',
  'authorization',
  'user-agent',
  'x-hub-signature',
  'x-hub-signature-256',
  'x-github-event',
  'x-github-delivery',
  'x-github-hook-id',
  'x-stripe-event',
  'x-stripe-signature',
  'x-shopify-topic',
  'x-shopify-hmac-sha256',
  'x-slack-signature',
  'x-slack-request-timestamp',
  'x-request-id',
  'x-correlation-id',
  'x-api-key',
];

export const forwardRequest = async (forwardURL: string, request: HookEvent) => {
  const headers = new Headers();

  FORWARD_HEADERS.forEach((header) => {
    if (request.headers[header]) {
      headers.append(header, request.headers[header]);
    }
  });

  try {
    await fetch(forwardURL, {
      method: request.method,
      headers: headers,
      body: JSON.stringify(request.body),
    });
    logger.info(chalk.green('✓ Request forwarded successfully'));
  } catch (e) {
    logger.error('Error forwarding request: ' + e);
  }
};
