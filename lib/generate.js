const processShader = require('./process-shader')
const highlight = new (require('highlights'))()
const escape = require('escape-html')
const cheerio = require('cheerio')
const marked = require('marked')
const path = require('path')
const fs = require('fs')

highlight.requireGrammarsSync({
  modulePath: require.resolve('language-glsl/package.json')
})

exports.chapter = chapter

exports.chapterDir = path.resolve(__dirname, '..', 'chapters')
exports.chapters = fs.readdirSync(exports.chapterDir)
  .filter((name) => name.match(/\.md$/g))
  .map((name) => name.replace(/\.md$/g, ''))

const chapterTemplateFile = path.join(exports.chapterDir, '_template.html')

function chapter (name) {
  const src = path.resolve(__dirname, '..', 'chapters', name + '.md')
  const text = fs.readFileSync(src, 'utf8')
  const html = marked(text, {
    highlight: (src, lang) => {
      if (lang === 'glsl') {
        var processed = processShader(src)
        var code = processed.code
        var data = processed.data
      }

      return `<div data-shader-content>${escape(code)}</div><div
        data-shader-info
        style="display:none"
        hidden>${escape(JSON.stringify(data || {}))}
      </div>`
    }
  })

  const $ = cheerio.load(html)
  const title = $($('h1')[0]).text()

  $($('h1')[0]).remove()

  return fs.readFileSync(chapterTemplateFile, 'utf8')
    .replace(/\{\{html\}\}/g, $.html())
    .replace(/\{\{name\}\}/g, name)
    .replace(/\{\{title\}\}/g, title)
}
