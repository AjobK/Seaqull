import { types, destroy } from 'mobx-state-tree'
import Slider from './slider'

const sliderManager = types
  .model('Sliders', {
    sliders: types.optional(types.array(Slider), [])
  })
  .actions(self => ({
    addSlider (activeSlide, amountSlide, animation, timer, stepSize) {
      const slider = Slider.create({
        activeSlide,
        amountSlide,
        animation,
        timer,
        stepSize
      })
      self.sliders.push(slider)
      let id = self.sliders.length - 1
      return id
    },
    removeSliders () {
      destroy(self.sliders)
    }
  }))
export default sliderManager
