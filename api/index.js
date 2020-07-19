const express = require('express')

const app = express()

const candles = require('./routes/candles')
const upload = require('./routes/upload')

app.use(candles)
app.use(upload)

module.exports = {
  path: '/api',
  handler: app
}
