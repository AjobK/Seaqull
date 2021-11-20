import Axios from 'axios'

class CaptchaService {
    public static verifyHCaptcha = async (token: string): Promise<boolean> => {
      const params = new URLSearchParams()
      params.append('secret', process.env.NODE_ENV === 'development'
        ? process.env.HCAPTCHA_DEV_SECRET_KEY
        : process.env.HCAPTCHA_PROD_SECRET_KEY)
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

export default CaptchaService
