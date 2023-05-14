/* eslint-disable class-methods-use-this */
const express = require('express');
const httpStatus = require('http-status');
const { connect, set, default: mongoose, connection } = require('mongoose');
// eslint-disable-next-line no-unused-vars
const { Server, IncomingMessage, ServerResponse } = require('http');
const helmet = require('helmet');

// eslint-disable-next-line no-unused-vars
const configs = require('../config/config');
const { morganErrorHandler, successHandler } = require('../config/morgan');
const AppRes = require('./appRes');
const logger = require('../config/logger');
const catchAsync = require('./catchAsync');
const { errorConverter, errorHandler } = require('./error');
const { ErrorMsgs } = require('./messages/errors');
const { MESSAGES } = require('./messages/messages');
const { pick } = require('../utils/pick');
const { Ip } = require('./Ip');
const mediaParser = require('./mediaParser');

let server;

class Dolph {
  app;

  env;

  port;

  /**
   *
   * @param {Array<{path?: string; router:  import("express").Router}>} routes
   * @param {string|number} port
   * @param {string|number} env
   * @param {{url:string, options:Object}} mongodbConfigz
   * @param {Array<any>} externalMiddlewares
   */
  constructor(routes, port, env, mongodbConfig, externalMiddlewares) {
    this.app = express();
    this.env = env || 'development';
    this.port = port || 8181;

    this.#initializeConfig(env);
    this.#incrementHandlers();
    this.#initalizeMiddleWares();
    this.initExternalMiddleWares(externalMiddlewares || []);
    this.#initalizeRoutes(routes);
    this.#initializeErrorHandlers();
    this.#initializeNotFoundHandler();
    // this.#initClosureHandler();
    this.#initMongo(mongodbConfig || null);
  }

  /**
   * @returns {Server<typeof IncomingMessage, typeof ServerResponse>}
   * function returns the dolphjs server which
   * can be used for websocket connections
   */
  listen() {
    server = this.app.listen(this.port, () => {
      logger.info(MESSAGES.DOLPH_APP_RUNNING(this.env, this.port));
    });
    return server;
  }

  /**
   * closes active mongoDB connection
   */
  closeMongoConnection() {
    connection.close();
  }

  #initMongo(config) {
    if (config) {
      if (config?.url !== null) {
        const ustring = config.url.split(':');
        // checks if the connection string is for mongodb
        if (ustring[0] !== 'mongodb') {
          if (ustring[0] !== 'mongodb+srv') {
            throw new Error(ErrorMsgs.NOT_MONGOOSE_DB);
          }
        }

        const db = () => {
          try {
            set('strictQuery', false);

            connect(config.url, config.options)
              // eslint-disable-next-line no-unused-vars
              .then((_result) => {
                logger.info(MESSAGES.MONGO_DB_CONNECTED);
              })
              .catch((err) => {
                logger.error(`'MongoErr': ${err}`);
              });
          } catch (error) {
            throw new Error(error);
          }
        };
        db();
      }
    }
  }

  /**
   *
   * @returns {express.Express}
   * exposes the express application
   */
  server() {
    return this.app;
  }

  /**
   *
   * @param {Array<{path?: string; router: import("express").Router}>}  routes
   */
  #initalizeRoutes(routes) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  #incrementHandlers() {
    process.setMaxListeners(15);
  }

  #initalizeMiddleWares() {
    // can change between test and development depending on the needs.
    if (this.env === 'development') {
      this.app.use(successHandler);
      this.app.use(morganErrorHandler);
    }

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(helmet());
  }

  /**
   *
   * @param {Array<any>} middlewares
   * property adds middlewares to the `express application`
   */
  initExternalMiddleWares(middlewares) {
    if (middlewares?.length) {
      middlewares.forEach((middleware) => {
        this.app.use(middleware);
      });
    }
  }

  #initializeNotFoundHandler() {
    this.app.use((req, res) => {
      res.status(404).send(new AppRes(httpStatus.NOT_FOUND, 'end-point not found'));
    });
  }

  #initializeConfig(env) {
    configs.conifgLoader(env);
  }

  #initializeErrorHandlers() {
    this.app.use(errorConverter);
    this.app.use(errorHandler);
  }

  exitHandler() {
    if (server) {
      server.close(() => {
        logger.info('Server closed');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  }

  #unexpectedErrorHandler = (error) => {
    logger.error(error);
    this.exitHandler();
  };

  #initClosureHandler() {
    process.on('uncaughtException', this.#unexpectedErrorHandler);
    process.on('unhandledRejection', this.#unexpectedErrorHandler);

    process.on('SIGTERM', () => {
      logger.info('SIGTREM received');
      if (server) {
        server.close();
      }
    });
  }
}

// eslint-disable-next-line prefer-destructuring
const Router = express.Router;

// eslint-disable-next-line no-multi-assign
exports = module.exports = Dolph;

exports.pick = pick;
exports.catchAsync = catchAsync;
exports.logger = logger;
exports.Router = Router;
exports.httpStatus = httpStatus;
exports.AppRes = AppRes;
exports.Ip = Ip;
exports.mediaParser = mediaParser;
/**
 * Mongoose would be faster if used with the Dolph-Factory and in the future,
 * dolphjs would have a lot of out-of-the-box supports for mongodb using the mongoose ORM
 */
exports.mongoose = mongoose;
