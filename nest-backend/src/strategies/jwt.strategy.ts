import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtPayload } from '../interfaces/jwt-payload.interface'
import { Account } from '../entities/account.entity'
import { AuthorizationService } from '../services/authorization.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.token
        },
      ]),
    })
  }

  public async validate(payload: JwtPayload): Promise<Account> {
    const { user_name } = payload

    const account = await this.authorizationService.getAccountByUsername(user_name)

    if (!account) {
      throw new UnauthorizedException('Missing or invalid token')
    }

    return account
  }
}
