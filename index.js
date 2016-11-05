module.exports = function(sails) {

    var ping = require('./lib/ping.js'),
      scan = require('./lib/scan.js');

    gladys.on('ready', function() {
      scan();
    });

    return {
        ping: ping
    };
};
