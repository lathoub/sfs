const debug = require('debug')('controller')
var path = require('path');
var fs = require('fs');
const accepts = require('accepts')

function removeExtension(filename) {
  return filename.substring(0, filename.lastIndexOf('.')) || filename;
}

function get(req, res) {

  var collectionId = req.params.collectionId

  var accept = accepts(req)

  const fileFullPath = path.join(global.dataDirectory, collectionId, req.params.fileName)
  res.download(fileFullPath);
}

function remove(req, res) {

  var collectionId = req.params.collectionId

  const fileFullPath = path.join(global.dataDirectory, collectionId, req.params.fileName)
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