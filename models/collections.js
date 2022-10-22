const debug = require('debug')('models')
var collection = require('./collection.js')
var path = require('path');
var fs = require('fs');

function getMetaData(serviceUrl, documents) {

  var content = {}
  content.links = [] 
  content.links.push({ href: `${serviceUrl}/collections?f=json`, rel: `self`, type: `application/json`, title: `this document in json` })
  content.links.push({ href: `${serviceUrl}/collections?f=html`, rel: `alternate`, type: `text/html`, title: `this document as HTML` })
  content.collections = [] 
  documents.forEach(document => {
    content.collections.push(collection.getMetaData(serviceUrl, document)) 
  })

  return content
}

function getDataDirectories() {
  return getDirectories(global.dataDirectory)
}

function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path + '/' + file).isDirectory();
  });
}

function get(serviceUrl, callback) {

  debug(`collections ${serviceUrl}`)

  var root = serviceUrl.pathname.replace(/^\/+/, '') // remove any trailing /

  var dirs = getDataDirectories()

  var documents = []
  dirs.forEach(function (name) {
    var document = {}
    document.name = name
    documents.push(document)
  });

  var content = getMetaData(serviceUrl, documents)

  if (callback)
    return callback(undefined, content);
  return content
}

module.exports = {
  get, getDataDirectories
}