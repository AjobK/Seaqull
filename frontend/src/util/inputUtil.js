class InputUtil {
  static handleInput = (input, cb) => {
    input.value = ''

    if (input.target.files && input.target.files.length > 0) {
      const reader = new FileReader()

      reader.addEventListener('load', () => {
        cb(reader.result)
      })
      reader.readAsDataURL(input.target.files[0])
    }
  }
}

export default InputUtil
