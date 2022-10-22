const debug = require('debug')('models')
var utils = require('../utils/utils')
var path = require('path');
var fs = require('fs');

function getMetaData(serviceUrl, document) {

  var content = {}
  content.name = document.name
  content.type = 'FileCollection'
  content.links = []
  content.links.push({ href: `${serviceUrl}/collections/${document.name}/items?f=html`, rel: `alternate`, type: `html/text`, title: `This document in HTML` })
  content.links.push({ href: `${serviceUrl}/collections/${document.name}/items?f=json`, rel: `self`, type: `application/geo+json`, title: `This document` })
  content.numberReturned = document.files.length // Requirement 30 A and B
  content.timeStamp = utils.ISODateString(new Date()) // Requirement 29 A
  content.files = document.files

  // TODO Next
  // var next = `&offset=${startIndex + limit}` // <<<
  // content.links.push({ href: `${serviceUrl}/collections/${document.name}/items?f=html` + next, rel: `next`, type: `application/geo+json`, title: `This document in HTML` } )
  // content.links.push({ href: `${serviceUrl}/collections/${document.name}/items?f=json` + next, rel: `next`, type: `application/geo+json`, title: `This document` } )

   content.numberMatched  = document.files.length // Requirement 30 A and B

  return content
}

function get(serviceUrl, collectionId, query, options, callback) {

  debug(`items ${serviceUrl}`)

  var document = {}
  document.name = collectionId
  document.files = fs.readdirSync(path.join(global.dataDirectory, collectionId))

  var content = getMetaData(serviceUrl, document)

  debug(`items content ${content}`)

  if (callback)
    return callback(undefined, content)
  return content
}

module.exports = {
  get
}