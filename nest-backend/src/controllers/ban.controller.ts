import { BadRequestException, Body, Controller, Ip, Patch, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { BanService } from '../services/ban.service'
import { BanUserDTO } from '../dtos/ban-user.dto'
import { hasPermission } from '../guards/roles.guard'
import { AuthorizedUser } from '../decorators/jwt.decorator'
import { Account } from '../entities/account.entity'

@ApiTags('Ban')
@Controller('ban')
export class BanController {
  constructor(private readonly banService: BanService) {}

  @Patch('')
  @UseGuards(hasPermission('BAN_USERS'))
  public async longBanUser(
    @Body() banUserDTO: BanUserDTO,
    @AuthorizedUser() user: Account,
    @Ip() remoteAddress: string
  ): Promise<string> {
    if (banUserDTO.days > 30) {
      throw new BadRequestException({ error: ['The max amount of days you can ban a user is 30 days'] })
    }

    await this.banService.banUser(banUserDTO, user, remoteAddress)

    return 'User banned'
  }

  @Patch('/short')
  @UseGuards(hasPermission('SHORT_BAN_USERS'))
  public async shortBanUser(
    @Body() banUserDTO: BanUserDTO,
    @AuthorizedUser() user: Account,
    @Ip() remoteAddress: string
  ): Promise<string> {
    await this.banService.banUser(banUserDTO, user, remoteAddress)

    return 'User banned'
  }
}
