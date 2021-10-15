import { Controller, Patch } from '@nestjs/common'
import { BanService } from '../services/ban.service'

@Controller('ban')
export class BanController {
  constructor(private readonly banService: BanService) {}

  @Patch('')
  public longBanUser(): any {

  }

  @Patch('/short')
  public shortBanUser(): any {

  }
}
