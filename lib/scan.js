
var timeout = 5000,
  addDevices = require('./addDevices.js');

/**
 * Checks if all devices are present, and if they are, kicks of an interval check
 * that checks the devices.
*/
module.exports = function(sails) {
  addDevices().then(function() {
      scan();
  }).catch(function(err) {
    console.error('Cannot check devices', err);
  });
};

function scan()
{
  console.info('Scanning...');
  setTimeout(this, timeout);
}
