import { Config } from '@app/types/config';
import { getEnvironmentValue } from '@app/utils/environments';
import { mergeDeepRight } from 'ramda';
import { devConfig } from './devConfig';

const defaultConfig: Config = {
  env: getEnvironmentValue('NODE_ENV', 'development'),
  auth: {
    secret: getEnvironmentValue('JWT_SECRET', 'changemepls'),
    saltRounds: 10,
    accessTokenExpiration: 60 * 15, // 15 minutes
    refreshTokenExpiration: 60 * 60 * 24 * 30, // 30 days
    algorithm: 'HS256',
    github: {
      clientId: getEnvironmentValue('GITHUB_CLIENT_ID', 'changemepls'),
      clientSecret: getEnvironmentValue('GITHUB_CLIENT_SECRET', 'changemepls'),
    },
    cookieOptions: {
      httpOnly: true,
      secure: true,
      sameSite: true,
    },
    inviteTokenExpiration: 60 * 60 * 24 * 7, // 7 days
  },
  server: {
    port: Number(getEnvironmentValue('PORT', '3000')),
    hostname: 'api.mokris.fit',
    corsOptions: {
      origin: ['https://mokris.fit'],
    },
  },
  logger: {
    level: 'info',
  },
  allowedHeaders: [
    'content-type',
    'authorization',
    'user-agent',
    'E-tag',
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
  ],
  blockedHeaders: ['content-length'],
};

const environmentConfigs = {
  development: devConfig,
};

// @ts-expect-error: TypeScript may not recognize all possible environment strings
const targetConfig = environmentConfigs[defaultConfig.env] || defaultConfig;

export const config: Config = mergeDeepRight(defaultConfig, targetConfig);
