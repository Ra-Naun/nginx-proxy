import { isProd } from '@app/config/server';
import { isServer } from './common.utils';

const logger = {
  log: (...messages: any[]) => {
    if (isProd && !isServer()) return;
    console.log(...messages);
  },

  error: (...messages: any[]) => {
    if (isProd && !isServer()) return;
    console.error(...messages);
  },
};

export default logger;
