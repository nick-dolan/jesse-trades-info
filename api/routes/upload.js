const { Router } = require('express')
const multer = require('multer')

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

  res.send(file)
})

module.exports = router
