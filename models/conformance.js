const debug = require('debug')('models')

function get (callback) {
  
  debug(`conformance`)

  var content = {};
  content.conformsTo = [];

  return callback(undefined, content);
}

module.exports = {
  get,
}