const browserify = require('browserify')
const generate = require('./generate')
const uglify = require('uglify-js')
const path = require('path')
const fs = require('fs')

buildBundle(function (err) {
  if (err) throw err
  console.log('/bundle.js')
  buildChapters()
})

function buildChapters () {
  generate.chapters.forEach(function (name) {
    const html = generate.chapter(name)
    const dst = path.resolve(generate.chapterDir, name + '.html')

    console.log('/chapters/' + name + '.html')
    fs.writeFileSync(dst, html)
  })
}

function buildBundle (next) {
  const src = path.join(__dirname, '..', 'index.js')
  const dst = path.join(__dirname, '..', 'bundle.js')

  browserify(src).bundle(function (err, result) {
    if (err) return next(err)

    result = uglify.minify(String(result), {
      fromString: true,
      compress: true,
      mangle: true,
      warnings: true
    })

    fs.writeFile(dst, result.code, next)
  })
}
