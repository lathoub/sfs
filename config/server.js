var config = module.exports

config.express = {
  host: '0.0.0.0',
  port: process.env.EXPRESS_PORT || 8080,
}

config.encodings = ['application/json', 'application/json', 'text/html', 'model/gltf-binary']
