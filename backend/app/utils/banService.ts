import BanDAO from '../daos/banDAO'
import Account from '../entities/account'
import Ban from '../entities/ban'

class BanService {
    private banDAO: BanDAO

    constructor() {
        this.banDAO = new BanDAO()
    }

    async checkIfUserIsBanned(account: Account) {
        const ban = await this.banDAO.getBanByUser(account)

        if (ban && ban.banned_to > Date.now()) {
            const bannedDateobject = new Date(ban.banned_to * 1)
            const date = `
                ${ bannedDateobject.getDate() }-${ bannedDateobject.getMonth() }-${ bannedDateobject.getFullYear() } 
                ${ bannedDateobject.getHours() }:${ bannedDateobject.getMinutes()}
            `

            return { errors: [`Account banned until ${date}.`] }
        }
        return null
    }

    async banUser(user: Account, admin: Account, reason: string, adress: string, banTime: number): Promise<Ban> {
        const ban = new Ban()
        ban.user_account = user
        ban.staff_account = admin
        ban.reason = reason
        ban.banned_at = new Date()
        ban.banned_to = new Date().setDate(ban.banned_at.getDate()+banTime)
        ban.ip_ban = adress

        return await this.banDAO.saveBan(ban)
    }
}

export default BanService
