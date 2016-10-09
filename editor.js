const triangle = require('a-big-triangle')
const CodeMirror = require('codemirror')
const display = require('./display')
const insert = require('defaultcss')
const Shader = require('gl-shader')
const fs = require('fs')

require('./editor-mode-glsl')(CodeMirror)
insert('cmtheme', fs.readFileSync(require.resolve('codemirror/theme/mdn-like.css'), 'utf8'))
insert('cm-main', fs.readFileSync(require.resolve('codemirror/lib/codemirror.css'), 'utf8'))

module.exports = createEditor

function createEditor (element, content, info) {
  var container = document.createElement('div')
  element.parentNode.insertBefore(container, element)
  element.parentNode.removeChild(element)

  var editor = new CodeMirror(container, {
    value: content,
    theme: 'mdn-like',
    viewportMargin: Infinity
  })

  var shader
  var vert = `
    precision mediump float;

    attribute vec2 position;
    varying vec2 uv;

    void main() {
      uv = position * 0.5 + 0.5;
      gl_Position = vec4(position, 1, 1);
    }
  `

  editor.on('change', function () {
    if (!shader) return
    shader.update(vert, 'precision mediump float;\n' + editor.getValue())
  })

  display.register(container, {}, function (gl) {
    shader = shader || Shader(gl, vert, 'precision mediump float;\n' + editor.getValue())
  }, function (gl) {
    shader.bind()
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    triangle(gl)
  }, function (gl) {

  })
}
