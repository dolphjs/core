const mongoose = require('mongoose');
const httpStatus = require('http-status');
const configs = require('../config/config');
const logger = require('../config/logger');
const AppRes = require('./appRes');

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof AppRes)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new AppRes(statusCode, message, false, err.stack);
  }
  next(error);
};
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // eslint-disable-next-line prefer-const
  let { statusCode, message } = err;
  if (configs.conifgs.NODE_ENV === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(configs.conifgs.NODE_ENV === 'development' && { stack: err.stack }),
  };

  if (configs.conifgs.NODE_ENV !== 'test') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

module.exports.errorConverter = errorConverter;
module.exports.errorHandler = errorHandler;
