import crypto from 'crypto';

export function generateSessionToken() {
  const randomBytes = crypto.randomBytes(12);

  const timestamp = Date.now().toString();
  const tokenBytes = Buffer.concat([randomBytes, Buffer.from(timestamp)]);

  return tokenBytes.toString('hex');
}
