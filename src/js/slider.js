class Slider {
  constructor(settings) {
    this.app = document.getElementById(settings.app)
    this.$slider = this.app.querySelector('#slide')
    this.$slide = this.$slider.querySelectorAll('.slide .slide-item')
    this.interval = settings.interval || 0
    this.timeout = settings.timeout || 3000
    this.index = 0
  }
  sliderEvent() {
    this.app.addEventListener('click', (e) => {
      this.slideActive()
      switch (e.target.id) {
        case 'badge':
          this.badgeEvent(e.target.dataset.slide)
          break
        case 'prev':
          this.handleLeft()
          break
        case 'prev-icon':
          this.handleLeft()
          break
        case 'next':
          this.handleRight()
          break
        case 'next-icon':
          this.handleRight()
          break
      }
    })
  }
  slideActive() {
    this.$slide.forEach(s => {
      if (s.classList.contains('active')) {
        this.index = +s.dataset.slide
      }
    })
  }
  slideInit() {
    this.badgeCreate()
    this.$slide.forEach((s, i) => {
      s.dataset.slide = `${i}`
      if (s.classList.contains('active')) {
        this.slider(i)
        this.badge(i)
      }
    })
    this.sliderEvent()
  }
  slide(val) {
    this.$slide.forEach((s) => {
      if (s.classList.contains('active')) {
        s.classList.remove('active')
      }
    })
    this.$slide[val].classList.add('active')
    this.slider(val)
    this.badge(val)
  }
  slider(val) {
    this.$slider.style.transform = `translate3d(${-100 * val}%, 0px, 0px)`
  }
  buttonCreate() {
    const $button = this.create()
    const $prev = this.create()
    const $next = this.create()
    const $prevIcon = this.create()
    const $nextIcon = this.create()
    $button.id = 'button'
    $prev.id = 'prev'
    $next.id = 'next'
    $prevIcon.id = 'prev-icon'
    $nextIcon.id = 'next-icon'
    $prevIcon.classList.add('carousel-control-prev-icon')
    $nextIcon.classList.add('carousel-control-next-icon')
    this.append($prev, $prevIcon)
    this.append($next, $nextIcon)
    this.append($button, $prev)
    this.append($button, $next)
    this.append(this.app, $button)
    this.left = this.app.querySelector('#prev')
    this.right = this.app.querySelector('#next')
  }
  badgeCreate() {
    this.buttonCreate()
    const containerBadge = this.create()
    containerBadge.classList.add('container__badge')
    for (let i = 0; i < this.$slide.length; i++) {
      const badgeElement = this.create()
      badgeElement.id = 'badge'
      badgeElement.dataset.slide = `${i}`
      badgeElement.classList.add('badge')
      this.append(containerBadge, badgeElement)
    }
    this.append(this.app, containerBadge)
    // this.badgeElement = this.app.querySelectorAll('.badge')
  }
  badge(val) {
    const badge = this.app.querySelectorAll('#badge')
    badge.forEach((b) => {
      if (b.classList.contains('badge_active')) {
        b.classList.remove('badge_active')
      }
    })
    badge[val].classList.add('badge_active')
  }
  badgeEvent(slide) {
    this.setTimeout()
    this.slide(slide)
  }
  handleRight() {
    this.setTimeout()
    if (this.index + 1 === this.$slide.length) {
      this.index = 0
      this.slide(0)
    } else {
      this.slide(this.index + 1)
    }
  }
  handleLeft() {
    this.setTimeout()
    if (this.index === 0) {
      this.slide(this.$slide.length-1)
    } else {
      this.slide(this.index - 1)
    }
  }
  autoInterval() {
    const setSliderInterval = () => {
      if (this.index + 1 >= this.$slide.length) {
        this.index = 0
        this.slide(0)
      } else {
        this.slide(this.index += 1)
      }
    }
    if (this.interval !== 0) {
      this.intervalId = setInterval(setSliderInterval, this.interval)
    }
  }
  stopInterval() {
    clearInterval(this.intervalId)
    this.intervalId = 0
  }
  setTimeout() {
    this.stopInterval()
    setTimeout(() => {
      if (this.intervalId === 0) {
        this.autoInterval()
      }
    }, this.timeout)
  }
  create() {
    return document.createElement('div')
  }
  append(element, child) {
    element.appendChild(child)
  }
  init() {
    this.slideInit()
    if (this.interval !== 0) {
      this.autoInterval()
    }
  }
}
