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
import { AuthorizationService } from '../services/authorization.service'
import { Request, Response } from 'express'
import { ApiTags } from '@nestjs/swagger'
import { LoginDTO } from '../dtos/login.dto'
import { Profile } from '../entities/profile.entity'

@ApiTags('Authorization')
@Controller('auth')
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @Get('/login-verify')
  public async loginVerify(@Req() req: Request): Promise<Profile> {
    if (!req.cookies?.token) throw new UnauthorizedException({ loggedIn: false });

    try {
      const profile = await this.authorizationService.loginVerify(req.cookies.token)

      return profile
    } catch (error) {
      throw new UnauthorizedException({ loggedIn: false })
    }
  }

  @Post('/login')
  public async login(@Req() req: Request, @Res() res: Response, @Body() loginDTO: LoginDTO): Promise<void> {
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

  @Post('/logout')
  public logout(@Req() req: Request, @Res() res: Response): Promise<string> {
    if (req.cookies['token']) {
      res.clearCookie('token').status(200).json({
        message: 'Succesfully logged out'
      })

      return
    }

    throw new UnauthorizedException('Invalid JWT')
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
