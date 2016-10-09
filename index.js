const createEditor = require('./editor')

const shaders = document.querySelectorAll('pre code.lang-glsl')

for (var i = 0; i < shaders.length; i++) {
  var element = shaders[i]
  var content = element.querySelector('[data-shader-content]')
  var info = element.querySelector('[data-shader-info]')
  content = content && content.innerHTML
  info = info && JSON.parse(info.innerHTML || '{}')
  if (!info || !content) continue

  createEditor(element.parentNode, content, info)
}
