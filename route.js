const router = require('express').Router()
const path = require('path');

const landingPage = require('./controllers/landingPage')
const collections = require('./controllers/collections')
const collection = require('./controllers/collection')
const items = require('./controllers/items')
const item = require('./controllers/item')
//const api = require('./controllers/api')

const multer = require("multer")

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, callback) {
            var collectionId = req.params.collectionId
            // TODO: check if path exists
            callback(null, path.join(global.dataDirectory, collectionId))
        },
        filename: function (req, file, callback) {
            callback(null, file.originalname)
        }
    })
})

// 7.5 The server SHOULD support the HTTP 1.1 method HEAD for all 
// resources that support the method GET.

// The app.get() function is automatically called for the HTTP HEAD method 
// in addition to the GET method if app.head() was not called for the path 
// before app.get().

// Requirement 7 A, Express.js conforms to HTTP 1.1 (no HTTPS for the moment)
// Recommendation 2 A, The server SHOULD support the HTTP 1.1 method HEAD for all resources that support the method GET.

// Requirement 1 A: The server SHALL support the HTTP GET operation at the path /
// (ext in index.js)
router.get('/', landingPage.get)

// Requirement 5 A: The server SHALL support the HTTP GET operation at the path /conformance
//router.get('/conformance.:ext?', conformance.get)

// Requirement 11 A: The server SHALL support the HTTP GET operation at the path /collections.
router.get('/collections.:ext?', collections.get)

// The server SHALL support the HTTP GET operation at the path /collections/{collectionId}.
router.get('/collections/:collectionId.:ext?', collection.get)

// For every file collection identified in the file collections response (path /collections), 
// the server SHALL support the HTTP GET operation at the path /collections/{collectionId}/items.
router.get('/collections/:collectionId/items', items.get)
router.post('/collections/:collectionId/items', upload.single("file"), items.post)

// For every file in a file collection (path /collections/{collectionId}), 
// the server SHALL support the HTTP GET operation at the path /collections/{collectionId}/items/{fileName}.
router.get('/collections/:collectionId/items/:fileName', item.get)
router.delete('/collections/:collectionId/items/:fileName', item.remove)
router.patch('/collections/:collectionId/items/:fileName', item.patch)

//0io
//router.get('/api.:ext?', api.get)

module.exports = router
