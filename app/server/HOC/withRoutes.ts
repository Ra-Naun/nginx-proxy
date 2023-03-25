import { Express } from 'express-serve-static-core';
import { IncomingMessage, ServerResponse } from 'http';
import { RequestHandler } from 'next/dist/server/next';
import { controllers } from '@app/server/API/controllers';

export const withRoutes = (server: Express, handle: RequestHandler): void => {
  controllers.forEach(({ method, route, controller }) => server[method](route, controller as any));

  server.all('*', (req: IncomingMessage, res: ServerResponse) => {
    return handle(req, res);
  });
};
