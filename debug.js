var ping = require('./lib/ping.js');

ping('127.0.0.1').then(function(result) {
  console.log(result ? 'up' : 'down');
});
