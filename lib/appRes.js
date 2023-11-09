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
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = AppRes;
