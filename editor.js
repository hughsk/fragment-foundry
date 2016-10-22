const triangle = require('a-big-triangle')
const CodeMirror = require('codemirror')
const insert = require('defaultcss')
const unescape = require('unescape')
const Shader = require('gl-shader')
const Fit = require('canvas-fit')
const fs = require('fs')

require('./editor-mode-glsl')(CodeMirror)
insert('cmtheme', fs.readFileSync(require.resolve('codemirror/theme/xq-light.css'), 'utf8'))
insert('cm-main', fs.readFileSync(require.resolve('codemirror/lib/codemirror.css'), 'utf8'))

module.exports = createEditor

function createEditor () {
  var container = document.querySelector('.editor')
  var data = JSON.parse(unescape(document.getElementById('chapter-data').innerHTML))
  var vert = `
    precision mediump float;

    attribute vec2 position;
    varying vec2 uv;

    void main() {
      uv = position * 0.5 + 0.5;
      gl_Position = vec4(position, 1, 1);
    }
  `

  var cOpts = { preserveDrawingBuffer: true }
  var displayQuestion = document.querySelector('#canvas-us')
  var displaySolution = document.querySelector('#canvas-them')
  var canvasQuestion = displayQuestion.appendChild(document.createElement('canvas'))
  var canvasSolution = displaySolution.appendChild(document.createElement('canvas'))
  var glq = canvasQuestion.getContext('webgl', cOpts) || canvasQuestion.getContext('experimental-webgl', cOpts)
  var gls = canvasSolution.getContext('webgl', cOpts) || canvasSolution.getContext('experimental-webgl', cOpts)
  glq.getExtension('OES_standard_derivatives')
  gls.getExtension('OES_standard_derivatives')
  var shaderQuestion = Shader(glq, vert, getFrag(data.question))
  var shaderSolution = Shader(gls, vert, getFrag(data.solution))

  var currTime = 0
  var start = Date.now()
  var shape = []

  var fitQuestion = Fit(canvasQuestion)
  var fitSolution = Fit(canvasSolution)
  var rem = 16

  function resize (e) {
    var height = window.innerHeight - 5 * rem - 2
    displayQuestion.parentNode.style.minWidth = Math.ceil(height / 2) + 'px'
    fitQuestion(e)
    fitSolution(e)
    canvasSolution.width = canvasQuestion.width
    canvasSolution.height = canvasQuestion.height
    matchOffset = 0
  }

  function loop () {
    currTime = (Date.now() - start) / 100
    window.requestAnimationFrame(loop)

    draw(glq, shaderQuestion)
    draw(gls, shaderSolution)
    matchPoll()
  }

  // omg loads of work to compare buffers
  var matchLabel = document.querySelector('.mainui .checker span')
  var pixelBuffer1 = new Uint8Array(4 * 512 * 512)
  var pixelBuffer2 = new Uint8Array(4 * 512 * 512)
  var failedMatch = false
  var passedMatch = false
  var matchOffset = 0
  var matchStepSize = 16
  var incr = 0
  function matchPoll () {
    var width = canvasSolution.width
    var height = canvasSolution.height
    if (passedMatch) return
    if (failedMatch) return
    if ((incr++ % 5)) return
    if (matchOffset + matchStepSize >= height) {
      passedMatch = true
      matchLabel.innerHTML = 'Got it! Nice work :D'
      return
    }
    var threshold = 3 * 0.01 * 255
    var total = 3 * width * matchStepSize
    var missed = 0
    glq.readPixels(0, matchOffset, width, matchStepSize, glq.RGBA, glq.UNSIGNED_BYTE, pixelBuffer1)
    gls.readPixels(0, matchOffset, width, matchStepSize, gls.RGBA, gls.UNSIGNED_BYTE, pixelBuffer2)
    for (var y = 0, i = 0; y < matchStepSize; y++) {
      for (var x = 0; x < width; x++, i++) {
        var r1 = pixelBuffer1[i], r2 = pixelBuffer2[i++]
        var g1 = pixelBuffer1[i], g2 = pixelBuffer2[i++]
        var b1 = pixelBuffer1[i], b2 = pixelBuffer2[i++]
        var diff = Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2)
        if (diff > threshold) missed++
      }
    }
    var error = missed / total
    if (error > 0.01) {
      failedMatch = true
      matchLabel.innerHTML = ''
      return
    }
    var completion = 100 * matchOffset / height
    matchLabel.innerHTML = 'Checking Answer: ' + completion.toFixed(2) + '%...'
    matchOffset += matchStepSize
  }

  function draw (gl, shader) {
    var width = gl.canvas.width
    var height = gl.canvas.height
    gl.viewport(0, 0, width, height)
    shape[0] = width
    shape[1] = height
    shader.bind()
    shader.uniforms.iResolution = shape
    shader.uniforms.iGlobalTime = currTime

    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    triangle(gl)
  }

  var editor = new CodeMirror(container, {
    value: data.question,
    theme: 'xq-light',
    viewportMargin: Infinity,
    lineNumbers: true
  })

  var noop = function(){}
  editor.on('change', function () {
    var warn = console.warn
    try {
      console.warn = noop
      shaderQuestion.update(vert, getFrag(editor.getValue()))
      console.warn = warn
    } catch (e) { return }
    failedMatch = false
    passedMatch = false
    matchOffset = 0
  })

  function getFrag (src) {
    return '#extension GL_OES_standard_derivatives : enable\nprecision highp float;\n' + data.prefix + src + data.suffix
  }

  resize()
  window.addEventListener('resize', resize)
  window.requestAnimationFrame(loop)
}

// #extension GL_OES_standard_derivatives : enable
//
// vec3 red = vec3(1, 0, 0);
// vec3 green = vec3(0, 1, 0);
// vec3 blue = vec3(0, 0, 1);
// vec3 cyan = vec3(0, 1, 1);
// vec3 magenta = vec3(1, 0, 1);
// vec3 yellow = vec3(1, 1, 0);
// vec3 white = vec3(1, 1, 1);
//
// float aastep (float threshold, float value) {
//   float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
//   return smoothstep(threshold-afwidth, threshold+afwidth, value);
// }
//
// void main() {
//   vec3 color = vec3(0);
//
//   color += aastep(0.0, length(p) - 1.0) * white;
//
//   gl_FragColor = vec4(color, 1);
// }
