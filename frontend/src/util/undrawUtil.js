class UndrawUtil {
  static imagesMap

  static getUndrawImage = (imageKeyword) => {
    if (!this.imagesMap) {
      this.initUndrawImages()
    }

    return this.imagesMap.get(imageKeyword)
  }

  static initUndrawImages = () => {
    this.imagesMap = new Map()

    this.imagesMap
      .set('socialNetwork', require('../static/undraw/social_network.svg'))
      .set('serverDown', require('../static/undraw/server_down.svg'))
  }
}

export default UndrawUtil
