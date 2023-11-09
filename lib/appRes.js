const { config } = require('dotenv');

config({});

class AppRes extends Error {
  /**
   *
   * @param {string|number} statusCode
   * @param {string|object} message
   * @param {boolean} isOperational
   * @param {string} stack
   */
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack && process.env.NODE_ENV === 'development') {
      this.stack = stack;
    } else if (!stack) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = AppRes;
