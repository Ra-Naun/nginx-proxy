import express from 'express';
import next from 'next';

import { isDev, port } from '@app/config/server';
import { domain } from '@app/config/site';
import logger from '@app/utils/logger';

import { withMiddlewares } from './HOC/withMiddlewares';
import { withRoutes } from './HOC/withRoutes';
import sitesProvider from '@app/services/nginx-conf/SitesProvider';
import nginxConfProvider from '@app/services/nginx-conf/NginxConfProvider';

const app = next({ dev: isDev, hostname: domain, port });
const handle = app.getRequestHandler();

const createServer = () => {
  const server = express();
  withMiddlewares(server);
  withRoutes(server, handle);

  server.listen(port, (err?: any) => {
    if (err) {
      throw err;
    }
    logger.log(`✅ > Ready on https://localhost/, env: ${process.env.NODE_ENV}`);
  });
};

(async () => {
  try {
    await app.prepare();

    createServer();

    await sitesProvider.init();
    await nginxConfProvider.sync();
  } catch (error: any) {
    logger.log(error.stack);
    process.exit(1);
  }
})();
