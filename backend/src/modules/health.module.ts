import { Module } from '@nestjs/common'
import { HealthController } from '../controllers/health.controller'

@Module({
  imports: [],
  controllers: [HealthController],
  providers: []
})
export class HealthModule {}
