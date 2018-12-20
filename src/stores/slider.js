import { types } from 'mobx-state-tree'
import styles from '../components/slider/slider.scss'

const defaults = {
  activeSlide: 1,
  data: [],
  amountSlide: 0,
  animation: ''
}

const Slider = types
  .model('Slider', {
    activeSlide: types.optional(types.number, defaults.activeSlide),
    amountSlide: types.optional(types.number, defaults.amountSlide),
    animation: types.optional(types.string, defaults.animation),
    timer: true,
    stepSize: 1
  })
  .actions(self => ({
    load (start = 1, amount, animation, timer, stepSize) {
      self.activeSlide = start
      self.amountSlide = amount
      self.animation = animation
      self.timer = timer
      self.stepSize = stepSize
    },
    forceTo (slide) {
      // this function slides to the next or previous and its based on the step size of the slider
      if (slide === self.activeSlide) {
        self.activeSlide = slide - 1
      }
      if (slide > self.activeSlide + 1 || slide < self.activeSlide - 1) {
        self.activeSlide = slide - 1
      }
      if (slide - self.activeSlide < 0) {
        if (self.activeSlide - self.stepSize <= 0) {
          self.activeSlide = self.amountSlide - -(self.activeSlide - self.stepSize)
        } else {
          self.activeSlide -= self.stepSize
        }
      } else {
        if (self.activeSlide + self.stepSize <= self.amountSlide) {
          self.activeSlide += self.stepSize
        } else {
          self.activeSlide = -(self.amountSlide - (self.activeSlide + self.stepSize))
        }
      }
    },
    setAnimationClass (slideNr, arrow) {
      // this function give the right class on base of the animation.
      let classNames = [styles.slide]
      if (self.animation) {
        if (self.animation === 'fade') {
          classNames.push(styles.fadeAnimation)
        } else if (self.animation === 'slide' && slideNr !== self.activeSlide) {
          classNames.push(styles.slideAnimation)
        } else if (self.animation === 'touch' && slideNr !== self.activeSlide) {
          classNames.push(styles.touchAnimation)
        }
      }
      // sets the active slide
      if (slideNr === self.activeSlide) {
        if (self.animation === 'slide') {
          classNames.push(styles.slideCurrent)
        } else if (self.animation === 'fade') {
          classNames.push(styles.fadeCurrent)
        } else if (self.animation === 'touch') {
          classNames.push(styles.touchCurrent)
        } else {
          classNames.push(styles.current)
        }
      } else {
        if (self.animation === 'fade') {
          classNames.push(styles.hideFade)
        } else {
          classNames.push(styles.hide)
        }
        /*
        //This if statement gives the next slide a nextslide class
        // and if the prev slide is the last slide it will give it the right class name
        // same if the next slide is the first slide
        */
        if (!arrow) {
          if (self.animation === 'touch' && slideNr !== self.activeSlide && slideNr > self.activeSlide) {
            if (slideNr !== self.amountSlide || slideNr === self.activeSlide + 1) {
              classNames.push(styles.hideTouchNext)
            } else if (self.animation === 'touch') {
              classNames.push(styles.hideTouch)
            }
          } else if (slideNr === 1 && slideNr + 1 !== self.activeSlide) {
            classNames.push(styles.hideTouchNext)
          } else if (self.animation === 'touch') {
            classNames.push(styles.hideTouch)
          }
        } else {
          if (self.animation === 'touch' && slideNr !== self.activeSlide && slideNr > self.activeSlide) {
            if (slideNr !== self.amountSlide || slideNr === self.activeSlide + 1) {
              classNames.push(styles.hideTouchNextArrow)
            } else if (self.animation === 'touch') {
              classNames.push(styles.hideTouchArrow)
            }
          } else if (slideNr === 1 && slideNr + 1 !== self.activeSlide) {
            classNames.push(styles.hideTouchNextArrow)
          } else if (self.animation === 'touch') {
            classNames.push(styles.hideTouchArrow)
          }
        }
      }
      return classNames
    },
    touchMove (event, start) {
      let touchMoved = event.touches[0].clientX - start
      let style = {}
      // checks if the slider has to go to the next or prev slide on base of touchposition
      if (touchMoved <= -120) {
        if (!self.done) {
          touchMoved = 0
          self.forceTo(self.activeSlide + 1)
        }
        self.done = true
      } else if (touchMoved >= 120) {
        if (!self.done) {
          touchMoved = 0
          self.forceTo(self.activeSlide - 1)
        }
        self.done = true
      }
      // gives the slide a opacity on base of its position
      if (touchMoved >= 0 && touchMoved <= 120) {
        if (!self.done) {
          style = {
            left: touchMoved,
            opacity: -touchMoved / 150 + 1
          }
        }
      } else if (touchMoved <= 0 && touchMoved >= -120) {
        if (!self.done) {
          style = {
            left: touchMoved,
            opacity: touchMoved / 150 + 1.5
          }
        }
      }
      return style
    },
    touchEnd () {
      self.done = false
      let style = {
        transition: 'left 1s, opacity 2s',
        opacity: 1,
        left: 0
      }
      return style
    },
    changeAmountSlide (amount) {
      self.amountSlide = amount
    }
  }))
export default Slider
