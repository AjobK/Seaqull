import { Module } from '@nestjs/common'
import { AuthController } from '../controllers/auth.controller'
import { AuthService } from '../services/auth.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccountRepository } from '../repositories/account.repository'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from '../strategies/jwt.strategy'
import { ProfileRepository } from '../repositories/profile.repository'
import { TitleRepository } from '../repositories/title.repository'
import { AttachmentRepository } from '../repositories/attachment.repository'
import { BanRepository } from '../repositories/ban.repository'
import {CaptchaService} from "../services/captcha.service";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      AccountRepository,
      ProfileRepository,
      TitleRepository,
      BanRepository,
      AttachmentRepository
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: `${configService.get('JWT_EXPIRATION')}s` }
        }
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, CaptchaService],
  exports: [JwtStrategy, PassportModule, JwtModule]
})
export class AuthModule {}
