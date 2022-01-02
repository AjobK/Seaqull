import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BanRepository } from '../repositories/ban.repository'
import { Account } from '../entities/account.entity'
import { BanUserDTO } from '../dtos/ban-user.dto'
import { AccountRepository } from '../repositories/account.repository'

@Injectable()
export class BanService {
  constructor(
    @InjectRepository(BanRepository) private readonly banRepository: BanRepository,
    @InjectRepository(AccountRepository) private readonly accountRepository: AccountRepository
  ) { }

  public async banUser(banUserDTO: BanUserDTO, account: Account, remoteAddress: string): Promise<void> {
    const { username, days, reason } = banUserDTO

    const user = await this.accountRepository.getAccountByUsername(username)
    const admin = await this.accountRepository.getAccountByUsername(account.user_name)

    if (!user) throw new BadRequestException({ error: ['User not found'] })
    if (!admin) throw new BadRequestException({ error: ['Admin not found'] })

    const existingBan = await this.banRepository.checkIfUserIsBanned(user)

    if (existingBan) throw new BadRequestException({ error: ['The user is already banned'] })

    await this.banRepository.banUser(user, admin, reason, remoteAddress, days)
  }
}
