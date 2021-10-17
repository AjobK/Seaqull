import { ReCAPTCHA } from 'node-grecaptcha-verify'

class RecaptchaService {
    public static verifyReCAPTCHA = async (token: string): Promise<boolean> => {
      const reCaptcha = new ReCAPTCHA(process.env.RECAPTCHA_SECRET_KEY, .6)
      const verificationResult = await reCaptcha.verify(token)

      console.log(verificationResult)

      return verificationResult.isHuman
    }
}

export default RecaptchaService
