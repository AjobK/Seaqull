import Axios from 'axios'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class CaptchaService {

  constructor(private readonly configService: ConfigService) { }

  public async verifyHCaptcha(token: string): Promise<boolean> {
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

    const hCaptcha = await Axios.post(this.configService.get('HCAPTCHA_SITE_VERIFY'), params, config)

    return hCaptcha.data.success
  }
}
