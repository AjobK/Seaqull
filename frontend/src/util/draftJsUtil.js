import { convertFromRaw } from 'draft-js'

class DraftJsUtil {
  static getRawContentFromData(data) {
    try {
      return convertFromRaw(data).getPlainText()
    } catch (e) {
      return data
    }
  }

  static getRawContentFromBlocks(data) {
    return data.blocks.map((block) => block.text).join(' ')
  }
}

export default DraftJsUtil
