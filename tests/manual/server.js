/* eslint-disable no-console */
/* eslint-disable max-classes-per-file */
// const io = require('socket.io');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const { catchAsync, Router, AppRes, httpStatus, mediaParser } = require('../../index');
const Dolph = require('../../index');
const User = require('./model');
const User2 = require('./mySqlModel');
// const sequelize = require('./mysqldbConf');

class TestController {
  getMsg = catchAsync(async (req, res) => {
    res.json({
      message: 'Welcome to this endpoint',
    });
  });

  getData = catchAsync(async (req, res) => {
    const data = await User.find({}).lean();
    res.json(data);
  });

  sendMsg = catchAsync(async (req, res, next) => {
    const { body, file } = req;
    if (!body.name) return next(new AppRes(httpStatus.BAD_REQUEST, 'provide a name field in the body object'));
    const user = await User.create(body);
    res.status(200).json({ user, file });
  });

  sendMsgMysql = catchAsync(async (req, res, next) => {
    const { body } = req;
    if (!body.name) return next(new AppRes(httpStatus.BAD_REQUEST, 'provide a name field in the body object'));
    const user = await User2.create(body);
    res.status(200).json(user);
  });
}

class TestRoute {
  path = '/test';

  router = Router();

  controller = new TestController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}`, this.controller.getMsg);
    this.router.get(`${this.path}/data`, this.controller.getData);
    this.router.post(
      `${this.path}`,
      mediaParser({ type: 'single', storage: {}, fieldname: 'upload' }),
      this.controller.sendMsg
    );
    this.router.post(`${this.path}/mysql`, this.controller.sendMsgMysql);
  }
}

// eslint-disable-next-line no-unused-vars
const mongoConfig = {
  url: 'mongodb://127.0.0.1:27017/dolphjs',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
    dbName: 'dolphjs',
  },
};
const routes = [new TestRoute()];
const middlewares = [cors({ origin: '*', credentials: true })];
// It is recommended to attach other services using prototyping
//  in order not to crowd the constructor initiaizer
const dolph = new Dolph(routes, '1313', 'development', { url: mongoConfig.url, options: mongoConfig.options }, middlewares);
// const server = dolph.listen();
dolph.listen();
// mongoose
//   .connect(mongoConfig.url, mongoConfig.options)
//   // eslint-disable-next-line no-unused-vars
//   .then((result) => {
//     console.info('MonogDB connected');
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// const socket = io(server, {
//   cors: {
//     origin: '*',
//     credentials: true,
//   },
// });

// global.onlineUsers = new Map();

// // eslint-disable-next-line no-shadow
// socket.on('connection', (socket) => {
//   console.log(socket);
//   socket.on('add-user', (userId) => {
//     // eslint-disable-next-line no-undef
//     onlineUsers.set(userId, socket.id);

//     // eslint-disable-next-line no-undef
//     if (onlineUsers.get(userId)) {
//       socket.emit('active', userId);
//     }
//   });
// });

// // In order to make use of another datbase you call it directly
// sequelize
//   .sync()
//   // eslint-disable-next-line no-unused-vars
//   .then((result) => {
//     dolph.listen();
//   })
//   .catch((err) => {
//     logger.error(err);
//   });
