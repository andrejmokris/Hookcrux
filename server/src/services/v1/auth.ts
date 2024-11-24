import { config } from '@app/config/defaults';
import { db } from '@app/db/prisma';
import { GitHubUser } from '@app/types/github-user';
import { comparePasswords, generateAccessToken, hashPassword } from '@app/utils/crypto';
import { ConflictError, UnauthorizedError } from '@app/utils/errors';
import { logger } from '@app/utils/logger';
import { logInSchema, signUpSchema } from '@app/validations/password-login';
import { z } from 'zod';

export const githubCallback = async (code: string) => {
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: config.auth.github.clientId,
      client_secret: config.auth.github.clientSecret,
      code,
    }),
  });

  const tokenResponseJson = await tokenResponse.json();
  const accessToken: string | undefined = tokenResponseJson.access_token;

  if (tokenResponseJson.error || !accessToken) {
    throw new UnauthorizedError('Error while fetching GitHub token: ' + tokenResponseJson.error);
  }

  logger.info('GitHub token received: ' + accessToken);

  const githubUserResponse = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!githubUserResponse.ok) {
    throw new UnauthorizedError('Error while fetching GitHub user');
  }

  const githubUser: GitHubUser = await githubUserResponse.json();

  const user = await db.user.upsert({
    where: {
      githubId: githubUser.id,
    },
    update: {
      email: githubUser.email,
      name: githubUser.name,
      avatar_url: githubUser.avatar_url,
    },
    create: {
      githubId: githubUser.id,
      email: githubUser.email,
      name: githubUser.name,
      avatar_url: githubUser.avatar_url,
      verifiedEmail: githubUser.email ? true : false,
    },
  });

  return generateAccessToken(user.id);
};

export const passwordLogin = async (data: z.infer<typeof logInSchema>) => {
  const user = await db.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user || !user.password) {
    throw new UnauthorizedError('Invalid email or password');
  }

  const isPasswordCorrect = await comparePasswords(data.password, user.password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError('Invalid email or password');
  }

  return generateAccessToken(user.id);
};

export const passwordSignUp = async (data: z.infer<typeof signUpSchema>) => {
  const user = await db.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (user) {
    throw new ConflictError('Email already used');
  }

  const hashedPassword = await hashPassword(data.password);

  await db.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
    },
  });
};
