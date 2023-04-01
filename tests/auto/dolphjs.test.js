/* eslint-disable camelcase */
/* eslint-disable no-undef */
const Dolph = require('../../lib/Dolph');
// const { ErrorMsgs } = require('../../lib/messages/errors');

describe('DolphJs', () => {
  test('test dolphjs application', () => {
    const dolph_one = new Dolph([], 9000, 'development', { options: null, url: null }, []);
    const listen = dolph_one.listen();
    expect(listen).not.toBeUndefined();
    listen.close();
  });
});
