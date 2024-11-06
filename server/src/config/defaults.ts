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
    cookieOptions: {
      httpOnly: true,
      secure: true,
      sameSite: true,
    },
  },
  server: {
    port: Number(getEnvironmentValue('PORT', '3000')),
    hostname: 'strv-addressbook-mokris-andrej.onrender.com',
  },
  logger: {
    level: 'info',
  },
};

const environmentConfigs = {
  development: devConfig,
};

// @ts-expect-error: TypeScript may not recognize all possible environment strings
const targetConfig = environmentConfigs[defaultConfig.env] || defaultConfig;

export const config: Config = mergeDeepRight(defaultConfig, targetConfig);
