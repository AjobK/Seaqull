import Axios from 'axios'

class CaptchaService {
    public static verifyHCaptcha = async (token: string): Promise<boolean> => {
      const { NODE_ENV, HCAPTCHA_DEV_SECRET_KEY, HCAPTCHA_PROD_SECRET_KEY } = process.env

      const secretKey = NODE_ENV === 'development'
        ? HCAPTCHA_DEV_SECRET_KEY
        : HCAPTCHA_PROD_SECRET_KEY

      const params = new URLSearchParams()
      params.append('secret', secretKey)
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
