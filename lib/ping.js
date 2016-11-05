var bluePing = require('ping-bluebird'),
  Promose = require('bluebird');

/**
 * @param string host The ip or hostname to ping.
 */
module.exports = function ping(host) {
  return new Promise(function(resolve, reject) {
    bluePing(host).then(function(result) {
      resolve(result.alive);
    }).catch(function(err) {
      reject(err);
    });
  });
}
