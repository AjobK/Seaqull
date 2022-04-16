import { Module } from '@nestjs/common'
import { ProfileController } from '../controllers/profile.controller'
import { ProfileService } from '../services/profile.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProfileRepository } from '../repositories/profile.repository'
import { ProfileFollowedByRepository } from '../repositories/profile_followed_by.repository'
import { AccountRepository } from '../repositories/account.repository'
import { TitleRepository } from '../repositories/title.repository'
import { BanRepository } from '../repositories/ban.repository'
import { AuthModule } from './auth.module'
import { RoleRepository } from '../repositories/role.repository'
import { AttachmentRepository } from '../repositories/attachment.repository'
import { ConfigService } from '@nestjs/config'
import { FileService } from '../services/file.service'
import { CaptchaService } from '../services/captcha.service'
import { VerificationRepository } from '../repositories/verification.repository'

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      ProfileRepository,
      ProfileFollowedByRepository,
      AccountRepository,
      TitleRepository,
      BanRepository,
      RoleRepository,
      AttachmentRepository,
      VerificationRepository
    ])
  ],
  controllers: [ProfileController],
  providers: [ProfileService, ConfigService, FileService, CaptchaService]
})
export class ProfileModule {}
