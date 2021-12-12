import { Module } from '@nestjs/common'
import { ProfileController } from '../controllers/profile.controller'
import { ProfileService } from '../services/profile.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProfileRepository } from '../repositories/profile.repository'
import { ProfileFollowedByRepository } from '../repositories/profile_followed_by.repository'
import { AccountRepository } from '../repositories/account.repository'
import { TitleRepository } from '../repositories/title.repository'
import { BanRepository } from '../repositories/ban.repository'
import { AuthorizationModule } from './authorization.module'
import { RoleRepository } from '../repositories/role.repository'
import { AttachmentRepository } from '../repositories/attachment.repository'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [
    AuthorizationModule,
    TypeOrmModule.forFeature([
      ProfileRepository,
      ProfileFollowedByRepository,
      AccountRepository,
      TitleRepository,
      BanRepository,
      RoleRepository,
      AttachmentRepository
    ])
  ],
  controllers: [ProfileController],
  providers: [ProfileService, ConfigService]
})
export class ProfileModule {}
