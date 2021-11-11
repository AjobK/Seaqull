import { Module } from '@nestjs/common'
import { AuthorizationController } from '../controllers/authorization.controller'
import { AuthorizationService } from '../services/authorization.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccountRepository } from '../repositories/account.repository'
import { PassportModule } from '@nestjs/passport'
import {JwtStrategy} from "../services/jwt.strategy";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([AccountRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: configService.get('JWT_EXPIRATION_TIME') }
        }
      }
    })
  ],
  controllers: [AuthorizationController],
  providers: [AuthorizationService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class AuthorizationModule {}
