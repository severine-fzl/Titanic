import crypto from 'crypto';

export function sha256(value, secret = process.env.APP_HASH_SALT) {
  return crypto.createHmac('sha256', secret).update(value).digest('hex');
}
