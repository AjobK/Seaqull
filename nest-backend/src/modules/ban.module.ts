import { Module } from '@nestjs/common'
import { BanController } from '../controllers/ban.controller'
import { BanService } from '../services/ban.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BanRepository } from '../repositories/ban.repository'
import { RoleRepository } from '../repositories/role.repository'

@Module({
  imports: [TypeOrmModule.forFeature([
    RoleRepository,
    BanRepository
  ])],
  controllers: [BanController],
  providers: [BanService],
  exports: [BanService]
})
export class BanModule {}
