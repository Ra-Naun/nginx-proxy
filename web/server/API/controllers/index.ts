import type { Route } from '@app/server/API/types';
import { SECURITY, NGINX_CONFIG } from '@app/server/API/routes';
import wrapErrorHandler from '@app/server/API/utils/wrapErrorHandler';
import { METHODS } from '@app/server/API/config/methods';

import { saltController } from './security/salt';
import { withAllowedToAccess } from './security/salt/utils';
import { nginxConfigController } from './nginx-config';

export const controllers: Route[] = [
  {
    route: SECURITY.SALT,
    controller: wrapErrorHandler(saltController.getSalt),
    method: METHODS.GET,
  },
  {
    route: NGINX_CONFIG.GET_SITES,
    controller: wrapErrorHandler(withAllowedToAccess(nginxConfigController.getSites)),
    method: METHODS.GET,
  },
  {
    route: NGINX_CONFIG.ADD_SITE,
    controller: wrapErrorHandler(withAllowedToAccess(nginxConfigController.addSite)),
    method: METHODS.POST,
  },
  {
    route: NGINX_CONFIG.UPDATE_SITE,
    controller: wrapErrorHandler(withAllowedToAccess(nginxConfigController.updateSite)),
    method: METHODS.POST,
  },
  {
    route: NGINX_CONFIG.REMOVE_SITE,
    controller: wrapErrorHandler(withAllowedToAccess(nginxConfigController.removeSite)),
    method: METHODS.POST,
  },
  {
    route: NGINX_CONFIG.REBUILD_NGINX_CONF,
    controller: wrapErrorHandler(withAllowedToAccess(nginxConfigController.rebuildNginxConf)),
    method: METHODS.POST,
  },
];
