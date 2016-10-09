const debounce = require('frame-debounce')

const figure = document.querySelector('#display')
const canvas = figure.querySelector('canvas')
const caption = figure.querySelector('figcaption')

const PAGE_OFFSET = 7 * 16

class Display {
  constructor (figure, canvas, caption) {
    this.figure = figure
    this.canvas = canvas
    this.caption = caption
    this.gl = (
      this.canvas.getContext('webgl') ||
      this.canvas.getContext('experimental-webgl')
    )

    this.currDisplay = null
    this.displays = []
    this.recalcTops = debounce(this.recalcTops.bind(this), false)
    this._visible = false

    window.addEventListener('scroll', debounce(() => this.onScroll()), false)

    var self = this

    loop()
    function loop () {
      window.requestAnimationFrame(loop)
      if (!self.currDisplay) return
      self.currDisplay.step(self.gl)
    }
  }

  get visible () { return this._visible }
  set visible (next) {
    if (this._visible === next) return
    this._visible = next
    if (next) {
      document.body.classList.remove('canvas-hidden')
    } else {
      document.body.classList.add('canvas-hidden')
    }
  }

  register (element, options, init, step, exit) {
    this.displays.push({ element, options, init, step, exit, top: null })
    this.recalcTops()
  }

  recalcTops () {
    var displays = this.displays
    var scroll = window.scrollY

    for (var i = 0; i < displays.length; i++) {
      displays[i].top = displays[i].element.getBoundingClientRect().top + scroll + PAGE_OFFSET
    }

    displays.sort(function (a, b) {
      return b.top - a.top
    })
  }

  onScroll () {
    var scroll = window.scrollY
    var height = window.innerHeight
    var displays = this.displays
    var center = scroll + height * 0.35

    var closestIdx = -1
    var closestDst = Infinity

    for (var i = 0; i < displays.length; i++) {
      var display = displays[i]
      var distance = display.top - scroll
      if (distance < 0) continue
      if (distance > height * 0.9) continue

      var closeness = Math.abs(display.top - center)
      if (closeness > closestDst) continue

      closestDst = closeness
      closestIdx = i
    }

    this.visible = closestIdx !== -1
    this.changeDisplay(this.visible ? displays[closestIdx] : null)
  }

  changeDisplay (next) {
    var curr = this.currDisplay
    if (curr === next) return
    if (curr) curr.exit(this.gl)
    if (next) next.init(this.gl)
    this.currDisplay = next
  }
}

module.exports = new Display(figure, canvas, caption)
