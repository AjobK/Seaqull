import { Request, Response } from 'express'
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

        const ban = new Ban()
        ban.user_account = user
        ban.staff_account = admin
        ban.reason = req.body.reason
        ban.banned_at = new Date()
        ban.banned_to = new Date(new Date().setDate(ban.banned_at.getDate()+30))

        console.log(req)
        const createdBan = await this.banDAO.saveBan(ban)
        return res.status(200).json({ message: 'succes' })
    }
}

export default AdminController
