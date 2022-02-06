import { Module } from '@nestjs/common'
import { RoleController } from '../controllers/role.controller'
import { RoleService } from '../services/role.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth.module'
import { RoleRepository } from '../repositories/role.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoleRepository
    ]),
    AuthModule
  ],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule {}
