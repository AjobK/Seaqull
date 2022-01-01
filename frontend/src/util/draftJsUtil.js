import { convertFromRaw } from 'draft-js'

class DraftJsUtil {
  static getRawContentFromData(data) {
    try {
      const parsedText = JSON.parse(data)

      return convertFromRaw(parsedText).getPlainText()
    } catch (e) {
      return data
    }
  }
}

export default DraftJsUtil
