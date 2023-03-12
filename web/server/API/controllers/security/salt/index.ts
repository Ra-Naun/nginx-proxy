import { Controller } from '@app/server/API/types';
import { handleGetSalt } from './utils';

const getSalt: Controller = async (req, res) => {
  const userAgent = req.headers['user-agent'] as string;
  const referrer = (req.headers.referrer as string) || '';

  return res.send(await handleGetSalt({ userAgent, referrer }));
};

export const saltController = {
  getSalt,
};
