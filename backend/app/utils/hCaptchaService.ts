import Axios from 'axios'

class hCaptchaService {
    public static verifyHCAPTCHA = async (token: string): Promise<boolean> => {
      const params = new URLSearchParams()
      params.append('secret', process.env.HCAPTCHA_SECRET_KEY)
      params.append('response', token)

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }

      const hCaptcha = await Axios.post('https://hcaptcha.com/siteverify/', params, config)

      return hCaptcha.data['success']
    }
}

export default hCaptchaService
