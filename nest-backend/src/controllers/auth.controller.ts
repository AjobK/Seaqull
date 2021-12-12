import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException
} from '@nestjs/common'
import { AuthService } from '../services/auth.service'
import { Request, Response } from 'express'
import { ApiTags } from '@nestjs/swagger'
import { LoginDTO } from '../dtos/login.dto'
import { Profile } from '../entities/profile.entity'
import { CaptchaService } from '../services/captcha.service'
import { AllowAny } from '../decorators/allow-any.decorator'

@ApiTags('Auth')
@Controller('')
export class AuthController {
  constructor(private readonly authorizationService: AuthService, private readonly captchaService: CaptchaService) {}

  @Get('/logout')
  public logout(@Req() req: Request, @Res() res: Response): Promise<string> {
    if (req.cookies['token']) {
      res.clearCookie('token').status(200).json({
        message: 'Succesfully logged out'
      })

      return
    }

    throw new UnauthorizedException('Invalid JWT')
  }

  @Get('/login-verify')
  public async loginVerify(@Req() req: Request): Promise<Profile> {
    if (!req.cookies?.token) throw new UnauthorizedException({ loggedIn: false })

    try {
      const profile = await this.authorizationService.loginVerify(req.cookies.token)

      return profile
    } catch (error) {
      throw new UnauthorizedException({ loggedIn: false })
    }
  }

  @Post('/login')
  @AllowAny()
  public async login(@Req() req: Request, @Res() res: Response, @Body() loginDTO: LoginDTO): Promise<void> {
    const isCaptchaValid = await this.captchaService.verifyHCaptcha(loginDTO.captcha)

    if (!isCaptchaValid) throw new ForbiddenException('We could not verify that you are not a robot')

    const account = await this.authorizationService.getAccountByUsername(loginDTO.username)

    if (!account) throw new ForbiddenException({ errors: ['Incorrect username or password'] })

    const loginResponse = await this.authorizationService.login(account, loginDTO.password)

    if (req.cookies['token']) res.clearCookie('token')

    this.setJWTCookieHeader(res, loginResponse.token)

    res.status(200).json({
      user: loginResponse.account
    })

    res.send()
  }

  private setJWTCookieHeader(res: Response, token: string): Response {
    res.setHeader(
      'Set-Cookie',
      `token=${token}; HttpOnly; ${process.env.SECURE == 'true' ? 'Secure;' : ''} expires=${+new Date(
        new Date().getTime() + 86409000
      ).toUTCString()}; path=/`
    )

    return res
  }
}
