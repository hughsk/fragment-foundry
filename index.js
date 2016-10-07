console.log('hello world?')

document.body.classList.add('canvas-hidden')
setInterval(function () {
  document.body.classList.toggle('canvas-hidden')
}, 1000)
