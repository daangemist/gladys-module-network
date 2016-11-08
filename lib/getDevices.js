var Promise = require('bluebird');

/**
 * Retrieves the list of ips/hosts to check and adds them as devices to Gladys.
*/
module.exports = function() {
    return gladys.param.getValue('network.ping.hosts')
      .then(readDevices)
      .catch(function(err) {
        Promise.reject(new Error('network.ping.hosts value not found.'));
      });
};

function readDevices(paramValue) {
    var hosts = paramValue.split('|'),
      devices = [];

    return Promise.each(hosts, function(host) {
      return gladys.device.getByIdentifier(host, 'network').then(function(device) {
        console.info('Network device for ' + host + ' exists.');
        devices.push(device);
      }).catch(function(err) {
        console.info('Network device for ' + host + ' does not exist.', err);
        var obj = {
          device: {
              name: host,
              identifier: host,
              protocol: 'ping',
              service: 'network'
          },
          types: [
              {
                  identifier: host,
                  type: 'binary',
                  min: 0,
                  max: 1,
                  sensor: true
              }
          ]
        };
        return gladys.device.create(obj)
          .then(function(device) {
            devices.push(device);
          });
      });
    }).then(function() {
      return devices;
    });
}
