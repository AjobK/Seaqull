import { Controller, Get, Post } from '@nestjs/common'
import { AuthorizationService } from '../services/authorization.service'

@Controller('auth')
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @Get('/login-verify')
  public loginVerfiy(): any {

  }

  @Post('/login')
  public login(): any {

  }

  @Post('/logout')
  public logout(): any {

  }
}
