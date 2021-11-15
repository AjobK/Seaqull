import { Module } from '@nestjs/common'
import { RoleController } from '../controllers/role.controller'
import { RoleService } from '../services/role.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthorizationModule } from './authorization.module'
import { RoleRepository } from '../repositories/role.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoleRepository
    ]),
    AuthorizationModule
  ],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule {}
