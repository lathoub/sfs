const debug = require('debug')('models')

function getMetaData(serviceUrl, document) {

  var content = {}
  content.id = document.name // required
  content.title = document.name
  content.description = 'files for coCreatie'
  content.links = []
  // Requirement 15 A and B
  content.links.push({ href: `${serviceUrl}/collections/${content.title}/items?f=json`, rel: `items`, type: `application/geo+json`, title: `This document` })
  content.links.push({ href: `${serviceUrl}/collections/${content.title}/items?f=html`, rel: `items`, type: `text/html`, title: `This document in HTML` })
  // Requirement 16 A and B
  content.itemType = 'file'

  return content
}

function get(serviceUrl, collectionId, callback) {

  debug(`collection ${serviceUrl}`)

  var content = {}
  if (collectionId == 'coCreatie') {
    var document = {}
    document.name = collectionId

    content = getMetaData(serviceUrl, document)
  }

  if (callback)
    return callback(undefined, content)
  return content
}

module.exports = {
  get,
  getMetaData,
}