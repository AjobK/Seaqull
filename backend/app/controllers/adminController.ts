import { Response } from 'express'
import AccountDAO from '../daos/accountDAO'
import BanDAO from '../daos/banDAO'
import Ban from '../entities/ban'

class AdminController {
    private accountDao: AccountDAO
    private banDAO: BanDAO

    constructor() {
        this.accountDao = new AccountDAO()
        this.banDAO = new BanDAO()
    }

    public tempBanUser = async (req: any, res: Response): Promise<Response> => {
        const user = await this.accountDao.getAccountByUsername(req.body.username)
        const admin = await this.accountDao.getAccountByUsername(req.decoded.username)
        const existingBan = await this.banDAO.getBanByUser(user)
        if ( existingBan ) return res.status(400).json({ 'error': ['The user is already banned'] })
        const banTime = req.body.days

        const ban = new Ban()
        ban.user_account = user
        ban.staff_account = admin
        ban.reason = req.body.reason
        ban.banned_at = new Date()
        ban.banned_to = new Date().setDate(ban.banned_at.getDate()+parseInt(banTime))
        ban.ip_ban = req.connection.remoteAddress

        const createdBan = await this.banDAO.saveBan(ban)
        return res.status(200).json({ ban: createdBan })
    }
}

export default AdminController
