class Slider {
  constructor(settings) {
    this.app = document.getElementById(settings.app)
    this.$slider = this.app.querySelector('#slide')
    this.$slide = this.$slider.querySelectorAll('.slide .slide-item')
    this.timeout = settings.timeout || 0
  }
  slide(val) {
    if (!val) {
      this.$slide.forEach((s, i) => {
        if (s.classList.contains('active')) {
          this.slider(i)
          this.badge(i)
        }
      })
    } else {
      this.$slide.forEach((s) => {
        if (s.classList.contains('active')) {
          s.classList.remove('active')
        }
      })
      this.$slide[val].classList.add('active')
      this.slider(val)
      this.badge(val)
    }
  }
  slider(val) {
    this.$slider.style.transform = `translate3d(${-100 * val}%, 0px, 0px)`
  }
  buttonCreate() {
    const $button = document.createElement('div')
    const $prev = document.createElement('div')
    const $next = document.createElement('div')
    const $prevIcon = document.createElement('div')
    const $nextIcon = document.createElement('div')
    $button.id = 'button'
    $prev.id = 'prev'
    $next.id = 'next'
    $prevIcon.classList.add('carousel-control-prev-icon')
    $nextIcon.classList.add('carousel-control-next-icon')
    $prev.appendChild($prevIcon)
    $next.appendChild($nextIcon)
    $button.appendChild($prev)
    $button.appendChild($next)
    this.app.appendChild($button)
    this.left = this.app.querySelector('#prev')
    this.right = this.app.querySelector('#next')
  }
  badgeCreate() {
    this.buttonCreate()
    const containerBadge = document.createElement('div')
    containerBadge.classList.add('container__badge')
    for (let i = 0; i < this.$slide.length; i++) {
      const badgeElement = document.createElement('div')
      badgeElement.id = 'badge'
      badgeElement.dataset.slide = `${i}`
      badgeElement.classList.add('badge')
      containerBadge.append(badgeElement)
    }
    this.app.appendChild(containerBadge)
    this.badgeEvent()
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
  badgeEvent() {
    const badgeElement = this.app.querySelectorAll('.badge')
    badgeElement.forEach((badge) => {
      badge.addEventListener('click', (e) => {
        this.slide(e.target.dataset.slide)
      })
    })
  }
  handleRight() {
    this.right.addEventListener('click',() => {
      this.setTimeout()
      let index = 0
      this.$slide.forEach((s, i) => {
        if (s.classList.contains('active')) {
          index = i
        }
      })
      this.$slide[index].classList.remove('active')
      if (index+1 === this.$slide.length) {
        this.$slide[0].classList.add('active')
      } else {
        this.$slide[index+1].classList.add('active')
      }
      this.slide()
    })
  }
  handleLeft() {
    this.left.addEventListener('click',() => {
      this.setTimeout()
      let index = 0
      this.$slide.forEach((s, i) => {
        if (s.classList.contains('active')) {
          index = i
        }
      })
      this.$slide[index].classList.remove('active')
      if (index === 0) {
        this.$slide[this.$slide.length-1].classList.add('active')
      } else {
        this.$slide[index-1].classList.add('active')
      }
      this.slide()
    })
  }
  autoInterval() {
    const setSliderInterval = () => {
      let index = 0
      this.$slide.forEach((s, i) => {
        if (s.classList.contains('active')) {
          index = i
        }
      })
      this.$slide[index].classList.remove('active')
      if (index+1 === this.$slide.length) {
        this.$slide[0].classList.add('active')
      } else {
        this.$slide[index+1].classList.add('active')
      }
      this.slide()
    }
    if (this.timeout !== 0) {
      this.interval = setInterval(setSliderInterval, this.timeout)
    }
  }
  stopInterval() {
    clearInterval(this.interval)
    this.interval = 0
  }
  setTimeout() {
    this.stopInterval()
    setTimeout(() => {
      if (this.interval === 0) {
        this.autoInterval()
      }
    }, this.timeout * 2)
  }
  init() {
    this.badgeCreate()
    this.slide()
    this.handleLeft()
    this.handleRight()
    if (this.timeout !== 0) {
      this.autoInterval()
    }
  }
}
