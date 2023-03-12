import { NextApiRequest, NextApiResponse } from 'next';
import logger from '../../../utils/logger';
import { requestStatus } from '../config/common';
import { WrapErrorHandler } from '../types';
import { ErrorWithMessage } from './ErrorWithMessage';

function onError(err: any, req: NextApiRequest, res: NextApiResponse) {
  logger.log(err.message);

  const message = err instanceof ErrorWithMessage ? err.message : 'Something went wrong';

  return res.send({
    status: requestStatus.ERROR,
    msg: message,
  });
}

const wrapErrorHandler: WrapErrorHandler = (controller) => async (req, res) => {
  try {
    return await controller(req, res);
  } catch (error) {
    return onError(error, req, res);
  }
};

export default wrapErrorHandler;
