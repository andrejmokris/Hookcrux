#!/usr/bin/env node

import chalk from 'chalk';
import { Command } from 'commander';
import EventSource from 'eventsource';
import { forwardRequest } from './services/forward-request';
import { HookEvent, InfoEvent } from './types/event';
import { logger } from './utils/logger';

let sessionId = '';
let forwardURL = 'http://localhost:3000';
let baseServerURL = `https://mokris.fit`;

const program = new Command();

program.name('hookcrux').description('Hookcrux CLI - webhook monitoring and forwarding tool').version('0.0.1');

program
  .argument('<sessionId>', 'Session ID to monitor')
  .option('-f, --forward <url>', 'URL to forward webhooks to')
  .option('-s, --server <url>', 'Server URL')
  .action((_sessionId: string, options) => {
    sessionId = _sessionId;
    forwardURL = options.forward || forwardURL;
    baseServerURL = options.server || baseServerURL;
  });

program.parse();

const serverURL = `${baseServerURL}/api/v1/webhook-sessions/${sessionId}/events`;

const es = new EventSource(serverURL);

es.onopen = () => {
  logger.info(chalk.green('✓ Connected to event stream'));
};

es.onerror = (error) => {
  logger.error(chalk.red('Connection error, exiting...'));
  process.exit(1);
};

es.addEventListener('hook-event', async (event: MessageEvent) => {
  logger.info('Hook event received');
  const data: HookEvent = JSON.parse(event.data);

  await forwardRequest(forwardURL, data);
});

es.addEventListener('info', (event: MessageEvent) => {
  const data: InfoEvent = JSON.parse(event.data);

  logger.info('Info received: ' + chalk.green(data.message));
});
