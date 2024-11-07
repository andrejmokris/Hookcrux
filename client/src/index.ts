#!/usr/bin/env node

import chalk from 'chalk';
import { Command } from 'commander';
import EventSource from 'eventsource';
import { forwardRequest } from './services/forward-request';
import { HookEvent, InfoEvent } from './types/event';
import { logger } from './utils/logger';

const program = new Command();

program
  .name('hookcrux')
  .description('Hookcrux CLI - webhook monitoring and forwarding tool')
  .version('0.0.1')
  .argument('<sessionId>', 'Session ID to monitor')
  .option('-f, --forward <url>', 'URL to forward webhooks to', 'http://localhost:3000')
  .option('-s, --server <url>', 'Server URL', 'https://mokris.fit')
  .action((sessionId, options) => {
    const { forward, server } = options;
    startWebhookMonitor(sessionId, forward, server);
  });

program.parse();

async function startWebhookMonitor(sessionId: string, forwardURL: string, baseServerURL: string) {
  const serverURL = `${baseServerURL}/api/v1/webhook-sessions/${sessionId}/events`;
  const es = new EventSource(serverURL);

  es.onopen = () => {
    logger.info(chalk.green('✓ Connected to event stream'));
  };

  es.onerror = (error) => {
    logger.error(chalk.red('Connection error, exiting...'));
    process.exit(1);
  };

  es.addEventListener('hook-event', async (event) => {
    logger.info('Hook event received');
    const data: HookEvent = JSON.parse(event.data);
    await forwardRequest(forwardURL, data);
  });

  es.addEventListener('info', (event) => {
    const data: InfoEvent = JSON.parse(event.data);
    logger.info(`Info received: ${chalk.green(data.message)}`);
  });
}
