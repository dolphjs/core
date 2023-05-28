/**
 * Create an object composed of the picked object properties
 * [Example]: `const filter = pick(req.query, ['limit', 'page'])`; would get the limit and page properties from the query object.
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */

const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});
};
exports.pick = pick;
