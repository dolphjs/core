/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
/* eslint-disable class-methods-use-this */
const os = require('os');

const getAddress = () => {
  const ifaces = os.networkInterfaces();
  // get the first ipv4 address
  for (const dev in ifaces) {
    if (ifaces.hasOwnProperty(dev)) {
      const iface = ifaces[dev];
      for (const alias of iface) {
        if (alias.family === 'IPv4' && alias.address !== '.address') {
          const ip = alias;
          return ip;
        }
      }
    }
  }
};

const getIpAdress = () => {
  const ifaces = os.networkInterfaces();
  // get the first ipv4 address
  for (const dev in ifaces) {
    if (ifaces.hasOwnProperty(dev)) {
      const iface = ifaces[dev];
      for (const alias of iface) {
        if (alias.family === 'IPv4' && alias.address !== '.address') {
          const ip = alias.address;
          return ip;
        }
      }
    }
  }
};

const getMacAddress = () => {
  const ifaces = os.networkInterfaces();
  for (const dev in ifaces) {
    if (ifaces.hasOwnProperty(dev)) {
      const iface = ifaces[dev];
      for (const alias of iface) {
        if (alias.family === 'IPv4' && alias.address !== '.address') {
          const { mac } = alias;
          return mac;
        }
      }
    }
  }
};

module.exports = { getAddress, getIpAdress, getMacAddress };
