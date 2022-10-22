const express = require('express')
const favicon = require('serve-favicon')
const route = require('./route')
const cors = require('cors');
const path = require('path');

global.dataDirectory = path.join(process.env.DATA_PATH || './public/data')

var encodings = require('./middlewares/encodings')

const app = express()
app.disable('x-powered-by');

app.use(favicon('./public/favicon.ico'))

// for html rendering
app.set('views', './views');
app.set('view engine', 'pug')

app.use(cors());
app.use(express.static('./public'));

// setup middleware to decode the content-type
// see http://docs.opengeospatial.org/is/17-069r3/17-069r3.html#_encodings
app.use(encodings)

app.use('/v1.0', route)

module.exports = app
