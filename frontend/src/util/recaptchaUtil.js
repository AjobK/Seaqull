class RecaptchaUtil {
  static loadRecaptchaScript = (recaptchaSiteKey, callback) => {
    const recaptchaScriptUrl =
      `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`
    const id = 'recaptcha-key'

    const isScriptExist = document.getElementById(id)

    if (isScriptExist) {
      if (callback) {
        callback()
      }

      return
    }

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = recaptchaScriptUrl
    script.id = id

    script.onload = function () {
      if (callback) callback()
    }

    document.body.appendChild(script)
  }

  static executeRecaptcha = async (recaptchaSiteKey) => {
    return window.grecaptcha.execute(recaptchaSiteKey, { action: 'submit' })
  }
}

export default RecaptchaUtil
