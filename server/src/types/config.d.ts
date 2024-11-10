export type Config = {
  env: string;
  auth: {
    secret: string;
    saltRounds: number;
    accessTokenExpiration: number;
    refreshTokenExpiration: number;
    algorithm: string;
    cookieOptions: {
      httpOnly: boolean;
      secure: boolean;
      sameSite: boolean;
    };
  };
  server: {
    port: number;
    hostname: string;
    corsOptions: {
      origin: string[];
    };
  };
  logger: {
    level: string;
  };
  allowedHeaders: string[];
  blockedHeaders: string[];
};
