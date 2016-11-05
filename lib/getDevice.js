
module.exports = function(host) {
  return gladys.device.getByIdentifier(host, 'networkping');
}
