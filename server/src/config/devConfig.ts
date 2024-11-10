import { getEnvironmentValue } from '@app/utils/environments';

export const devConfig = {
  auth: {
    accessTokenExpiration: 60 * 60, // 1 hour
    cookieOptions: {
      secure: false,
    },
  },
  server: {
    port: Number(getEnvironmentValue('PORT', '3000')),
    hostname: `localhost:${getEnvironmentValue('PORT', '3000')}`,
    corsOptions: {
      origin: ['http://localhost:5173'],
    },
  },
};
