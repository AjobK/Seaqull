import { ReCAPTCHA } from 'node-grecaptcha-verify'

class ReCaptchaService {
    public async isCaptchaValid(token: string): Promise<boolean> {
        const reCaptcha = new ReCAPTCHA(process.env.RECAPTCHA_SECRET_KEY, 0.5)
        const verificationResult = await reCaptcha.verify(token)

        if (!verificationResult.isHuman) {
            return false
        }
        return true
    }
}

export default ReCaptchaService
