module.exports = function(sails) {

    var ping = require('./lib/ping.js');

    return {
        ping: ping
    };
};
