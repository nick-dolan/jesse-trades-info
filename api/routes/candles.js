const { Router } = require('express')

const router = Router()

// const axios = require('axios')

router.post('/test-api', function (req, res) {
  res.json({
    data: 'test data'
  })
})

module.exports = router
