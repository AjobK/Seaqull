import { Response } from 'express'
import AccountDAO from '../daos/accountDAO'
import BanService from '../utils/banService'

class AdminController {
    private accountDao: AccountDAO
    private banService: BanService

    constructor() {
        this.accountDao = new AccountDAO()
        this.banService = new BanService()
    }

    public shortBanUser = async (req: any, res: Response): Promise<Response> => {
        if (parseInt(req.body.days) > 30 ) {
            return res.status(400).json({ 'error': ['The max amount of days you can ban a user is 30 days'] })
        }

        return await this.banUser(req, res)
    }

    public longBanUser = async (req: any, res: Response): Promise<Response> => {
        if (parseInt(req.body.days) > 1095 ) {
            return res.status(400).json({ error: ['The max amount of days you can ban a user is 1095 days'] })
        }

        return await this.banUser(req, res)
    }

    public banUser = async (req: any, res: Response): Promise<Response> => {
        const { username, days, reason } = req.body

        if (!username || !days || !reason) return res.status(400).json({ 'error': ['Invalid data'] })

        const user = await this.accountDao.getAccountByUsername(username)
        const admin = await this.accountDao.getAccountByUsername(req.decoded.username)

        if (!user) {
            res.status(400).json({ error: ['User not found'] })
        }

        if (!admin) {
            res.status(400).json({ error: ['Admin not found'] })
        }

        const existingBan = await this.banService.checkIfUserIsBanned(user)

        if (existingBan) return res.status(400).json({ 'error': ['The user is already banned'] })

        const banTime = parseInt(days)

        if (isNaN(banTime)) return res.status(400).json({ 'error': ['Invalid data'] })

        const createdBan = await this.banService.banUser(user, admin, reason, req.connection.remoteAddress, banTime)

        console.log(createdBan)

        return res.status(200).json({ ban: createdBan })
    }
}

export default AdminController
