/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const Benchmark = require('benchmark');
const Table = require('cli-table3');
const Dolph = require('../..');

const suite = new Benchmark.Suite('Check speed of dolphjs engine');

const router = Dolph.Router();
router.get('/', (req, res) => {
  res.send('Benchmark Reached');
});

router.post('/', (req, res) => {
  res.send(req.body);
});

suite
  .add('Dolph JS GET REQUEST', {
    defer: true,
    fn(defferred) {
      const server = new Dolph([{ path: '/', router }], 3300, 'test', null, []);
      const req = { method: 'GET', url: '/' };
      const res = { send: () => defferred.resolve() };
      router(req, res);
    },
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    const table = new Table({
      head: ['Benchmark', 'Ops/sec', 'Margin of error'],
      colWidths: [30, 15, 30],
    });
    this.forEach(function (result) {
      table.push([
        result.name,
        result.hz.toLocaleString('en-US', { maximumFractionDigits: 0 }),
        `±${result.stats.rme.toFixed(2)}%`,
      ]);
    }).on('error', function (event) {
      console.error(event.target.error);
    });
    // console.log(table.toString());
    // console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  .add('Dolph JS POST REQUEST', {
    defer: true,
    fn(defferred) {
      const server = new Dolph([{ path: '/', router }], 3300, 'test', null, []);
      const req = { method: 'POST', url: '/', body: { message: 'message sent from function' } };
      const res = { send: () => defferred.resolve() };
      router(req, res);
    },
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    const table = new Table({
      head: ['Benchmark', 'Ops/sec', 'Margin of error'],
      colWidths: [30, 15, 30],
    });
    this.forEach(function (result) {
      table.push([
        result.name,
        result.hz.toLocaleString('en-US', { maximumFractionDigits: 0 }),
        `±${result.stats.rme.toFixed(2)}%`,
      ]);
    });
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
    // console.log(suite.stats);
    // console.log(suite.hz);
    console.log(table.toString());
    // console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  .on('error', function (event) {
    console.error(event.target.error);
  })
  .run({ async: true });
