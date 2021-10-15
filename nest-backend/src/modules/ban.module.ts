import { Module } from '@nestjs/common';
import { BanController } from '../controllers/ban.controller';
import { BanService } from '../services/ban.service';

@Module({
  controllers: [BanController],
  providers: [BanService]
})
export class BanModule {}
