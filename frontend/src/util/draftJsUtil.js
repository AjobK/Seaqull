import { convertFromRaw } from 'draft-js'

class DraftJsUtil {
  static getRawContentFromData(data) {
    try {
      return convertFromRaw(data).getPlainText()
    } catch (e) {
      return data
    }
  }
}

export default DraftJsUtil
