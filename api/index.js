const express = require('express')

const app = express()

const candles = require('./routes/candles')

app.use(candles)

module.exports = {
  path: '/api',
  handler: app
}
