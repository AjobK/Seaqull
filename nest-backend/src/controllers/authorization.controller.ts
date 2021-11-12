import { Controller, Get, Post, Req, Res, UnauthorizedException } from '@nestjs/common'
import { AuthorizationService } from '../services/authorization.service'
import { Request, Response } from 'express'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Authorization')
@Controller('auth')
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @Get('/login-verify')
  public async loginVerify(@Req() req: Request): Promise<any> {
    // if (!req.cookies?.token) throw new UnauthorizedException({ loggedIn: false })

    try {
      const profile = await this.authorizationService.loginVerify(req.cookies.token)

      return profile
    } catch (error) {
      throw new UnauthorizedException({ loggedIn: false })
    }

  }

  @Post('/login')
  public login(): any {

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
}
