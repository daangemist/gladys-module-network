var bluePing = require('ping-bluebird'),
  Promise = require('bluebird');

/**
 * @param string host The ip or hostname to ping.
 * @return Promise Resolves to an object { host: "xxx", "alive": bool}
 */
module.exports = function ping(host) {
  return bluePing(host);
}
