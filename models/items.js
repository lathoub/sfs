const debug = require('debug')('models')
var item = require('./item.js')
var utils = require('../utils/utils')
var path = require('path');
var fs = require('fs');

function getMetaData(serviceUrl, document) {

  var content = {}
  content.name = document.name
  content.type = 'FileCollection'
  content.links = []
  content.links.push({ href: `${serviceUrl}/collections/${document.name}/items?f=html`, rel: `alternate`, type: `html/text`, title: `This document in HTML` })
  content.links.push({ href: `${serviceUrl}/collections/${document.name}/items?f=json`, rel: `self`, type: `application/json`, title: `This document` })
  content.numberReturned = document.files.length
  content.timeStamp = utils.ISODateString(new Date())
  content.files = document.files

  // TODO Next
  // var next = `&offset=${startIndex + limit}` // <<<
  // content.links.push({ href: `${serviceUrl}/collections/${document.name}/items?f=html` + next, rel: `next`, type: `application/json`, title: `This document in HTML` } )
  // content.links.push({ href: `${serviceUrl}/collections/${document.name}/items?f=json` + next, rel: `next`, type: `application/json`, title: `This document` } )

  content.numberMatched = document.files.length

  return content
}

function get(serviceUrl, collectionId, query, options, callback) {

  debug(`items ${serviceUrl}`)

  var document = {}
  document.name = collectionId
  document.files = []

  var dir = path.join(global.dataDirectory, collectionId)

  fs.readdirSync(dir).forEach(filename => {
    if (filename.startsWith('.')) return; // ignore . files

    var content = item.getMetaData(serviceUrl, collectionId, dir, filename)
    document.files.push({ name: content.name, links: content.links, size: content.size, kind: content.kind, time: content.mtime });
  });

  var content = getMetaData(serviceUrl, document)

  if (callback)
    return callback(undefined, content)
  return content
}

module.exports = {
  get
}