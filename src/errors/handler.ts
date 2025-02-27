import Log from 'simpl-loggar';
import { InternalError } from './index.js';
import type * as types from '../../types/index.js';
import type express from 'express';

const handleErr = (err: types.IFullError, res: express.Response): void => {
  Log.error('Router error handler', err.message, err.stack);

  let error: types.IFullError = err;

  if (!err.code) {
    error = new InternalError();
  }

  const { message, code, name, status } = error;
  res.status(!status ? 500 : status).send({
    error: {
      message,
      code,
      name,
    },
  });
};

export default handleErr;
