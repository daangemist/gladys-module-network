var Promise = require('bluebird'),
  getDevice = require('./getDevice.js');

/**
 * Retrieves the list of ips/hosts to check and adds them as devices to Gladys.
*/
module.exports = function() {
  return new Promise(function(resolve, reject) {
    gladys.param.getValue('network.ping.hosts').then(function(value) {
      var hosts = value.split('|');

      Promise.each(hosts, function(host) {
        getDevice(host).then(function(device) {
          console.info('Network device for ' + host + ' exists.');
        }).catch(function(err) {
          console.info('Network device for ' + host + ' does not exist. Creating.');
          var obj = {
            device: {
                name: host,
                identifier: host,
                protocol: 'ping',
                service: 'network'
            },
            types: [
                {
                    type: 'binary',
                    min: 0,
                    max: 1
                }
            ]
          };
          gladys.device.create(obj);
        });
      }).then(function() {
        resolve();
      });
    }).catch(function(err) {
      reject(new Error('network.ping.hosts value not found.'));
    });
  });
};
