import { NextApiRequest, NextApiResponse } from 'next';
import type { Request as ExpressRequest } from 'express';
import type { NGINX_CONFIG, SECURITY } from './routes';
import { METHODS } from './config/methods';

type CustomRequest = NextApiRequest & ExpressRequest;

export type Controller = (
  req: CustomRequest,
  res: NextApiResponse<any>
) => Promise<void | NextApiResponse<any>>;

export type Route = {
  route: SECURITY | NGINX_CONFIG;
  controller: Controller;
  method: METHODS;
};

export type WrapErrorHandler = (controller: Controller) => Controller;
