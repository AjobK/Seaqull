import { Module } from '@nestjs/common'
import { BanController } from '../controllers/ban.controller'
import { BanService } from '../services/ban.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BanRepository } from '../repositories/ban.repository'
import { RoleRepository } from '../repositories/role.repository'
import { AccountRepository } from '../repositories/account.repository'
import { AuthorizationModule } from './authorization.module'
import { RolePermissionRepository } from '../repositories/role_permission.repository'
import { PermissionRepository } from '../repositories/permission.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountRepository,
      RoleRepository,
      BanRepository,
      RolePermissionRepository,
      PermissionRepository
    ]),
    AuthorizationModule
  ],
  controllers: [BanController],
  providers: [BanService],
  exports: [BanService]
})
export class BanModule {}
