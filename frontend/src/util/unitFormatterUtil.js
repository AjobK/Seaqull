class unitFormatterUtil {
  static getNumberSuffix(value) {
    if (value === undefined)
      return ''

    const suffixes = ['', 'K', 'M', 'B', 'T']
    let newValue = value
    let suffixNum = 0

    while (newValue >= 1000 && suffixNum < suffixes.length - 1) {
      newValue /= 1000
      suffixNum++
    }

    if (suffixNum > 0)
      newValue = Math.round(newValue * 100) / 100

    return (newValue + suffixes[suffixNum]).toString()
  }
}

export default unitFormatterUtil
