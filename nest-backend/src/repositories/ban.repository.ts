import { EntityRepository, Repository } from 'typeorm'
import { Ban } from '../entities/ban.entity'
import { Account } from '../entities/account.entity'

@EntityRepository(Ban)
export class BanRepository extends Repository<Ban> {

  public async checkIfUserIsBanned(account: Account): Promise<string> {
    const ban = await this.getBanByUser(account)

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

  public async getBanByUser(account: Account): Promise<Ban> {
    const ban = await this.findOne({ where: { user: account.id } })

    return ban
  }

  public async banUser(
    user: Account,
    admin: Account,
    reason: string,
    remoteAddress: string,
    days: number
  ): Promise<void> {
    const ban = new Ban()
    ban.user = user
    ban.staff = admin
    ban.reason = reason
    ban.banned_at = new Date()
    ban.banned_to = new Date(new Date().setDate(ban.banned_at.getDate() + days))
    ban.ip_ban = remoteAddress

    await this.save(ban)
  }
}
