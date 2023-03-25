import { createHash } from 'crypto';
import { isProd } from '@app/config/server';
import { badHashSalt, secureHashSalt } from './config';
import { Controller } from '@app/server/API/types';
import logger from '@app/utils/logger';

type GetSaltProps = { userAgent: string; referrer: string };

export const handleGetSalt = ({ userAgent, referrer }: GetSaltProps) => {
  if (!(userAgent || !referrer) && isProd) {
    return { salt: badHashSalt };
  }

  const botUA = 'Mozilla/5.0 ( compatible )';
  const isBot = userAgent === botUA || referrer.startsWith('https%3A%2F%2F');

  return { salt: isBot ? badHashSalt : secureHashSalt };
};

const isValidHash = (userAgent: string, requestHash: string) => {
  const encoder = new TextEncoder();
  const hash = createHash('sha256')
    .update(encoder.encode(`${secureHashSalt}_${userAgent}`))
    .digest('hex');

  return hash && hash === requestHash;
};

export const withAllowedToAccess = (controller: Controller) =>
  (async (req, res) => {
    const isAllowedToAccess =
      req.cookies.sh && isValidHash(req.headers['user-agent'] as string, req.cookies.sh);

    if (!isAllowedToAccess) {
      const msg = `Access denied. Secure data is not correct. Route: ${req.url}`;
      logger.error(msg);
      return res.status(403).end(msg);
    }

    return controller(req, res);
  }) as Controller;
