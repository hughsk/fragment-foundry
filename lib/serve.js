const browserify = require('browserify')
const generate = require('./generate')
const watchify = require('watchify')
const router = require('course')()
const http = require('http')
const path = require('path')
const fs = require('fs')

const index = path.join(__dirname, '..', 'index.html')
const style = path.join(__dirname, '..', 'index.css')
router.get('/', function (req, res) {
  res.setHeader('content-type', 'text/html')
  fs.createReadStream(index).pipe(res)
})

router.get('/index.css', function (req, res) {
  res.setHeader('content-type', 'text/css')
  fs.createReadStream(style).pipe(res)
})

const entry = path.resolve(__dirname, '..', 'index.js')
const bundler = browserify(entry, {
  cache: {},
  packageCache: {},
  plugin: [watchify]
})

router.get('/bundle.js', function (req, res, next) {
  bundler.bundle(function (err, result) {
    if (err) return next(err)
    res.setHeader('content-type', 'text/javascript')
    res.end(result)
  })
})

generate.chapters.forEach(function (name) {
  router.get('/chapters/' + name + '.html', function (req, res) {
    res.setHeader('content-type', 'text/html')
    res.end(generate.chapter(name))
  })
})

http.createServer(function (req, res) {
  router(req, res, function (err) {
    if (err) {
      res.statusCode = 500
      res.setHeader('content-type', 'text/plain')
      return res.end(err.message)
    }

    res.statusCode = 404
    res.setHeader('content-type', 'text/plain')
    res.end('404: ' + req.url)
  })
}).listen(9999, function (err) {
  if (err) throw err
  console.log('http://localhost:9999')
})
