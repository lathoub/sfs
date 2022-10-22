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

function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

function get(serviceUrl, collectionId, query, options, callback) {

  debug(`items ${serviceUrl}`)

  var document = {}
  document.name = collectionId
  document.files = []

  var dir = path.join(global.dataDirectory, collectionId)

  fs.readdirSync(dir).forEach(filename => {
    const name = path.parse(filename).name;
    const ext = path.parse(filename).ext;
    const filepath = path.resolve(dir, filename);
    const stat = fs.statSync(filepath);
    const isFile = stat.isFile();
    const atime = new Date(stat.atimeMs).toLocaleString()
    const fsize = formatBytes(stat.size)
    const fname = name.concat(ext)

    if (isFile) document.files.push({ fname, atime, fsize });
  });

  var content = getMetaData(serviceUrl, document)

  if (callback)
    return callback(undefined, content)
  return content
}

module.exports = {
  get
}