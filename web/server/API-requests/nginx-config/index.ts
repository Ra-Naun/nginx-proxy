import axios from 'axios';
import logger from '@app/utils/logger';
import { NGINX_CONFIG } from '@app/server/API/routes';
import { Site } from '@app/store/siteStore/types';
import { setSecureCookie } from '../security/utils';

export const getSites = async () => {
  try {
    await setSecureCookie();
    const response = await axios.request<Site[]>({
      method: 'get',
      url: NGINX_CONFIG.GET_SITES,
    });

    return response;
  } catch (err: any) {
    logger.error(err.message);

    throw new Error('Failed to get Sites');
  }
};

export const addSite = async (site: Omit<Site, 'id'>) => {
  try {
    await setSecureCookie();
    const response = await axios.request<void>({
      method: 'post',
      url: NGINX_CONFIG.ADD_SITE,
      data: {
        site,
      },
    });

    return response;
  } catch (err: any) {
    logger.error(err.message);

    throw new Error('Failed to add Site');
  }
};

export const updateSite = async (site: Site) => {
  try {
    await setSecureCookie();
    const response = await axios.request<void>({
      method: 'post',
      url: NGINX_CONFIG.UPDATE_SITE,
      data: {
        site,
      },
    });

    return response;
  } catch (err: any) {
    logger.error(err.message);

    throw new Error('Failed to update Site');
  }
};

export const removeSite = async ({ id }: { id: Site['id'] }) => {
  try {
    await setSecureCookie();

    const response = await axios.request<void>({
      method: 'post',
      url: NGINX_CONFIG.REMOVE_SITE,
      data: {
        id,
      },
    });

    return response;
  } catch (err: any) {
    logger.error(err.message);

    throw new Error('Failed to remove Site');
  }
};

export const rebuildNginxConf = async () => {
  try {
    await setSecureCookie();
    const response = await axios.request<void>({
      method: 'post',
      url: NGINX_CONFIG.REBUILD_NGINX_CONF,
    });

    return response;
  } catch (err: any) {
    logger.error(err.message);

    throw new Error('Failed to rebuild Nginx Conf');
  }
};
