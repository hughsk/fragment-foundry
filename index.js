const navToggle = document.querySelector('.nav-toggle')

require('./editor')()

navToggle.addEventListener('click', function (e) {
  document.body.classList.toggle('nav-enabled')
  return e.preventDefault() && false
}, false)
