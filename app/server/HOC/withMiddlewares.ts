import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { Express } from 'express-serve-static-core';

// server middlewares
import { validateUrl } from '@app/server/serverMiddlewares/validateUrl';
import { notForNextAssets } from '@app/utils/common.utils';

export const withMiddlewares = (server: Express): void => {
  server.use(validateUrl);

  //Request body support
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  //Request cookie support
  server.use(cookieParser());
};
