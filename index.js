const navToggle = document.querySelector('.nav-toggle')

require('./editor')()

navToggle.addEventListener('click', function (e) {
  document.body.classList.toggle('nav-enabled')
  return e.preventDefault() && false
}, false)

const doneMarks = document.querySelectorAll('.done-mark[data-name]')
if (window.localStorage) {
  for (var i = 0; i < doneMarks.length; i++) {
    var markEl = doneMarks[i]
    var markName = markEl.getAttribute('data-name')
    var markKey = 'lesson:' + markName
    var markValue = !!window.localStorage.getItem(markKey)
    if (markValue) {
      markEl.classList.add('is-done')
      markEl.parentNode && markEl.parentNode.classList.add('faded')
    }
  }
}
