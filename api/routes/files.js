const fs = require('fs')
const path = require('path')
const { Router } = require('express')
const multer = require('multer')
const JSON5 = require('json5')

const storage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })

const router = Router()

router.post('/upload', upload.single('backtest'), (req, res, next) => {
  const file = req.file

  if (file === undefined) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }

  res.send(path.parse(file.originalname).name)
})

router.get('/read-file', (req, res, next) => {
  const { fileName } = req.query

  fs.readFile(`uploads/${fileName}.json`, 'utf8', (err, data) => {
    if (err) {
      const error = new Error('Something wrong with file.')
      error.httpStatusCode = 400
      return next(error)
    }

    res.send(JSON5.parse(data))
  })
})

/*
* Get already uploaded backtests' file names
* */
router.get('/files-list', (req, res) => {
  const jsonFiles = fs
    .readdirSync('uploads/')
    .filter(el => /\.json$/.test(el))
    .map(item => path.parse(item).name)

  res.send(jsonFiles)
})

router.delete('/delete-file', (req, res) => {
  fs.unlink(`uploads/${req.query.file_name}.json`, (err) => {
    if (err) {
      res.status(500).json(err)
    }

    res.send('Backtest removed.')
  })
})

module.exports = router
