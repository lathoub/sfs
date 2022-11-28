const debug = require('debug')('models')
var path = require('path');
var fs = require('fs');

function getMetaData(serviceUrl, collectionId, dir, filename) {

  var content = {}
  content.links = []
  content.links.push({ href: `${serviceUrl}/collections/${collectionId}/items/${filename}`, rel: `self`, /*type: `application/json`,*/ title: `This document` })

  content.name = path.parse(filename).name
  content.ext = path.parse(filename).ext
  content.filepath = path.resolve(dir, filename)

  var stat = fs.statSync(content.filepath)

  content.size = stat.size
  content.atime = new Date(stat.atimeMs).toISOString()
  content.ctime = new Date(stat.ctimeMs).toISOString()
  content.mtime = new Date(stat.mtimeMs).toISOString()
  content.kind = 0
  if (stat.isFile()) content.kind = 1
  else if (stat.isDirectory()) content.kind = 2

  return content
}

function get () {

  var content = {}

  return content;
}

module.exports = {
  get, getMetaData
}