import axios from 'axios';
import logger from '@app/utils/logger';
import { SECURITY } from '@app/server/API/routes';

export const getActualSaltRequest = async () => {
  try {
    const response = await axios.request<{ salt: string }>({
      method: 'get',
      url: SECURITY.SALT,
    });

    return response;
  } catch (err: any) {
    logger.error(err.message);

    throw new Error('Failed to get Actual Salt');
  }
};
