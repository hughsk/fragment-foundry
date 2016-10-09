const stringify = require('glsl-token-string')
const tokenize = require('glsl-tokenizer')

module.exports = processShader

function processShader (src) {
  const tokens = tokenize(src)
  const data = {}

  data.display = checkDisplay(tokens)

  return {
    code: stringify(tokens),
    data: data
  }
}

function checkDisplay (tokens) {
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]
    if (token.type !== 'preprocessor') continue
    var pragma = token.data.match(/^\#pragma\s+(.+)$/)
    if (!pragma) continue
    if (pragma[1].trim() !== 'display') continue

    tokens.splice(i, 1)
    tokens[i].data = tokens[i].data.replace(/^\n/, '')

    return true
  }

  return false
}
