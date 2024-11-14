import { config } from '@app/config/defaults';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt, { JwtPayload } from 'jsonwebtoken';
import moment from 'moment';

export function generateSessionToken() {
  const randomBytes = crypto.randomBytes(16);
  return randomBytes.toString('hex');
}

export interface accessToken {
  accessToken: string;
  accessTokenExpiresAt: Date;
}

export interface refreshToken {
  refreshToken: string;
  refreshTokenExpiresAt: Date;
}

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(config.auth.saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePasswords = async (plainTextPassword: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const generateAccessToken = (userId: string): accessToken => {
  const token = jwt.sign({}, config.auth.secret, {
    algorithm: 'HS256',
    expiresIn: config.auth.accessTokenExpiration,
    subject: userId,
    issuer: config.server.hostname,
  });

  return {
    accessToken: token,
    accessTokenExpiresAt: moment().add(config.auth.accessTokenExpiration, 'seconds').toDate(),
  };
};

export const generateRefreshToken = (): refreshToken => {
  // generate a opaque refresh token
  const token = crypto.randomBytes(128).toString('hex');

  return {
    refreshToken: token,
    refreshTokenExpiresAt: moment().add(config.auth.refreshTokenExpiration, 'seconds').toDate(),
  };
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const payload = jwt.verify(token, config.auth.secret, {
      algorithms: ['HS256'],
      issuer: config.server.hostname,
    }) as JwtPayload;
    return payload;
  } catch (error) {
    return null;
  }
};
