const stringify = require('glsl-token-string')
const tokenize = require('glsl-tokenizer')

module.exports = processShader

function processShader (src) {
  const tokens = tokenize(src)
  const data = {}

  data.bannedTokens = checkBanned(tokens)
  data.prefix = checkSection('prefix', tokens)
  data.suffix = checkSection('suffix', tokens)
  data.question = checkSection('question', tokens)
  data.solution = checkSection('solution', tokens)

  return data
}

function checkBanned (tokens) {
  var banned = []

  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]
    if (token.type !== 'preprocessor') continue
    var pragma = token.data.match(/^\#pragma\s+(.+)$/)
    if (!pragma) continue
    var result = pragma[1].trim()
    var startIndex = result.indexOf('banTokens:')
    if (startIndex) continue

    tokens.splice(i--, 1)
    banned = banned.concat(result.slice(10).trim().split(/\s+/))
  }

  return banned
}

function checkSection (section, tokens) {
  var activeStart = 0
  var active = false

  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]
    if (token.type !== 'preprocessor') continue

    var pragma = token.data.match(/^\#pragma\s+(.+)$/)
    if (!pragma) continue

    if (!active) {
      if (pragma[1].trim() !== section) continue
      active = true
      activeStart = i
      tokens.splice(i--, 1)
      continue
    } else {
      return flush()
    }
  }

  return active ? flush() : ''

  function flush () {
    tokens = tokens.splice(activeStart, i - activeStart)
    tokens = stringify(tokens)
    tokens = tokens.replace(/^\n/, '')
    return tokens
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
