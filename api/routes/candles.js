const { Router } = require('express')
const { Pool } = require('pg')

const router = Router()

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

router.get('/candles', function (req, res) {
  const {
    symbol,
    exchange,
    entry_candle_timestamp: entryTimestamp,
    exit_candle_timestamp: exitTimestamp
  } = req.query

  pool
    .query(`SELECT * FROM candle
            WHERE symbol='${symbol}'
            AND exchange='${exchange}'
            AND timestamp BETWEEN ${entryTimestamp} AND ${exitTimestamp}`)
    .then((result) => {
      res.json({
        data: result.rows
      })
    })
    .catch(err =>
      res.status(500).json(err.stack)
    )
})

module.exports = router
