import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtPayload } from '../interfaces/jwt-payload.interface'
import { AccountRepository } from '../repositories/account.repository'
import { Account } from '../entities/account.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
        @InjectRepository(AccountRepository) private accountRepository: AccountRepository,
        private configService: ConfigService,
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

  async validate(payload: JwtPayload): Promise<Account> {
    const { user_name } = payload

    const account = this.accountRepository.getAccountByUsername(user_name)

    if (!account) {
      throw new UnauthorizedException('Missing or invalid token')
    }

    return account
  }
}
