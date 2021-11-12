import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BanRepository } from '../repositories/ban.repository'
import { Account } from '../entities/account.entity'

@Injectable()
export class BanService {
  constructor(
    @InjectRepository(BanRepository) private readonly banRepository: BanRepository
  ) {
  }

  async checkIfUserIsBanned(account: Account): Promise<string> {
    const ban = await this.banRepository.getBanByUser(account)

    if (!ban) return null

    const bannedToDate = ban.banned_to.getTime()

    if (bannedToDate > Date.now()) {
      const bannedDateobject = new Date(bannedToDate)
      const date =
        bannedDateobject.getDate() + ' ' +
        bannedDateobject.toLocaleString('default', { month: 'long' }) + ' ' +
        bannedDateobject.getFullYear() + ' ' +
        (bannedDateobject.getHours() > 9 ? '' : '0') + bannedDateobject.getHours() + ':' +
        (bannedDateobject.getMinutes() > 9 ? '' : '0') + bannedDateobject.getMinutes()

      return `Account banned until ${date}`
    }

    return null
  }
}
