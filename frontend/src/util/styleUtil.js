class StyleUtil {
  static generateStyleString = (styleBase, styleValue) => {
    return styleBase + styleValue.charAt(0).toUpperCase() + styleValue.slice(1)
  }
}

export default StyleUtil
