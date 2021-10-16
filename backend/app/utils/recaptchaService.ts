import { ReCAPTCHA } from 'node-grecaptcha-verify'

class RecaptchaService {
    public static verifyReCAPTCHA = async (token: string): Promise<boolean> => {
      const reCaptcha = new ReCAPTCHA(process.env.RECAPTCHA_SECRET_KEY, 0.5)
      const verificationResult = await reCaptcha.verify(token)

      return verificationResult.isHuman
    }
}

export default RecaptchaService
