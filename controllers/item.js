const debug = require('debug')('controller')
var path = require('path');
var fs = require('fs');

function removeExtension(filename) {
  return filename.substring(0, filename.lastIndexOf('.')) || filename;
}

function get(req, res) {

  var fileNameNoExt = removeExtension(req.params.fileName)
  var collectionId = req.params.collectionId

  var accept = req.headers['accept']

  if (accept == 'model/gltf-binary') {
    var fileName = fileNameNoExt + '.glb'
    const fileFullPath = path.join(global.dataDirectory, collectionId, fileName)
    res.download(fileFullPath);
  }
  else
    res.json(400, "{'code': 'InvalidParameterValue', 'description': 'Invalid accept, only accepting model/gltf-binary'}")
}

function remove(req, res) {

  var collectionId = req.params.collectionId

  var fileName = req.params.fileName
  const fileFullPath = path.join(global.dataDirectory, collectionId, fileName)

  fs.unlink(fileFullPath, function (err) {
    if (err) {
      res.json(404, "{'code': 'Not found', 'description': 'File not found'}")
    }
    res.status(204).end()
  });
}

function patch(req, res) {
  var fileNameNoExt = req.params.fileName

}

module.exports = {
  get, remove, patch
}