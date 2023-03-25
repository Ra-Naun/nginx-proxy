export enum SECURITY {
  SALT = '/api/security/salt',
}

export enum NGINX_CONFIG {
  SET_SITES = '/api/nginx-config/set-sites',
  GET_SITES = '/api/nginx-config/get-sites',
  ADD_SITE = '/api/nginx-config/add-site',
  UPDATE_SITE = '/api/nginx-config/update-site',
  REMOVE_SITE = '/api/nginx-config/remove-site',
  REBUILD_NGINX_CONF = '/api/nginx-config/rebuild-nginx-conf',
}
