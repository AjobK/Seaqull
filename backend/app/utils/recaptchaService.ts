import Axios from 'axios'

class RecaptchaService {
    public static verifyHCAPTCHA = async (token: string): Promise<boolean> => {
      const params = new URLSearchParams()
      params.append('secret', process.env.RECAPTCHA_SECRET_KEY)
      params.append('response', token)

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }

      const hCaptcha = await Axios.post('https://hcaptcha.com/siteverify/', params, config)

      console.log(hCaptcha.data)

      return hCaptcha.data['success']
    }
}

export default RecaptchaService
