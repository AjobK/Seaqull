import { Module } from '@nestjs/common';
import { RoleController } from '../controllers/role.controller';
import { RoleService } from '../services/role.service';

@Module({
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule {}
