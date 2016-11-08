
var timeout = 15000,
  getDevices = require('./getDevices.js'),
  Promise = require('bluebird'),
  ping = require('./ping.js');

/**
 * Checks if all devices are present, and if they are, kicks off an interval check
 * that pings the configured hostnames.
*/
module.exports = scan;

function scan(devices)
{
  getDevices()
    .then(function(devices) {
      console.info('Scanning for ' + devices.length + ' devices...');
      Promise.each(devices, function(obj) {
        return ping(obj.device.identifier)
          .then(processPingResult);
      })
      .finally(function() {
        setTimeout(scan, timeout);
      });
    })
    .catch(function(err) {
      console.error('Cannot check devices', err);
  });
}

/**
 * @param object result An object with two attributes, host and alive. host
 * is the name of the scanned host, and alive is a boolean, indicating the status.
 * @return Promise
 */
function processPingResult(result)
{
  console.log('Setting deviceStatus for host ' + result.host + ', device is ' + (result.alive ? 'up' : 'down'));
  var state = {
    value: result.alive
  };

  return gladys.deviceState.createByDeviceTypeIdentifier(result.host, 'network', state);
}
