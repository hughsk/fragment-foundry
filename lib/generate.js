const cheerio = require('cheerio')
const marked = require('marked')
const path = require('path')
const fs = require('fs')

exports.chapter = chapter

exports.chapterDir = path.resolve(__dirname, '..', 'chapters')
exports.chapters = fs.readdirSync(exports.chapterDir)
  .filter((name) => name.match(/\.md$/g))
  .map((name) => name.replace(/\.md$/g, ''))

const chapterTemplateFile = path.join(exports.chapterDir, '_template.html')

function chapter (name) {
  const src = path.resolve(__dirname, '..', 'chapters', name + '.md')
  const text = fs.readFileSync(src, 'utf8')
  const html = marked(text)

  const $ = cheerio.load(html)
  const title = $($('h1')[0]).text()

  $($('h1')[0]).remove()

  return fs.readFileSync(chapterTemplateFile, 'utf8')
    .replace(/\{\{html\}\}/g, $.html())
    .replace(/\{\{name\}\}/g, name)
    .replace(/\{\{title\}\}/g, title)
}
