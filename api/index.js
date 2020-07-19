const express = require('express')

const app = express()

const candles = require('./routes/candles')
const files = require('./routes/files')

app.use(candles)
app.use(files)

module.exports = {
  path: '/api',
  handler: app
}
