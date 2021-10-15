import { Module } from '@nestjs/common';
import { AuthorizationController } from '../controllers/authorization.controller';
import { AuthorizationService } from '../services/authorization.service';

@Module({
  controllers: [AuthorizationController],
  providers: [AuthorizationService]
})
export class AuthorizationModule {}
