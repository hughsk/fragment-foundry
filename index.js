const createEditor = require('./editor')
const unescape = require('unescape')

const shaders = document.querySelectorAll('pre code.lang-glsl')

for (var i = 0; i < shaders.length; i++) {
  var element = shaders[i]
  var content = element.querySelector('[data-shader-content]')
  var info = element.querySelector('[data-shader-info]')
  content = content && unescape(content.innerHTML || '')
  info = info && JSON.parse(unescape(info.innerHTML || '{}'))
  if (!info || !content) continue

  createEditor(element.parentNode, content, info)
}
