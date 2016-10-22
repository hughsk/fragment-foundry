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

// gather titles etc. on the first pass
exports.chapterTitles = {}
exports.chapters.forEach((name) => chapter(name))

const chapterList = exports.chapters.map((name) => {
  return `<li>
    <a href="${name}.html">
      <span class="done-mark">&#x2713;&nbsp;&nbsp;</span> ${exports.chapterTitles[name]}
    </a>
  </li>`
}).join('\n')

function chapter (name) {
  const src = path.resolve(__dirname, '..', 'chapters', name)
  const text = fs.readFileSync(src + '.md', 'utf8')
  const glsl = fs.readFileSync(src + '.glsl', 'utf8')
  const html = marked(text, {
    highlight: (src, lang) => {
      return src
    }
  })

  const chapterData = processShader(glsl)
  const $ = cheerio.load(html)
  const title = $($('h1')[0]).text()
  exports.chapterTitles[name] = title

  $($('h1')[0]).remove()

  return fs.readFileSync(chapterTemplateFile, 'utf8')
    .replace(/\{\{html\}\}/g, $.html())
    .replace(/\{\{name\}\}/g, name)
    .replace(/\{\{title\}\}/g, title)
    .replace(/\{\{chapterList\}\}/g, chapterList)
    .replace(/\{\{chapterData\}\}/g, JSON.stringify(chapterData))
}
