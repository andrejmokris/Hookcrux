import crypto from 'crypto';

export function generateSessionToken() {
  const randomBytes = crypto.randomBytes(16);

  return randomBytes.toString('hex');
}
