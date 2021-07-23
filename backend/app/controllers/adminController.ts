import { Response } from 'express'
import AccountDAO from '../daos/accountDAO'
import BanDAO from '../daos/banDAO'
import PostDAO from '../daos/postDAO'
import ProfileDAO from '../daos/profileDAO'
import Ban from '../entities/ban'
import Post from '../entities/post'

class AdminController {
    private accountDao: AccountDAO
    private banDAO: BanDAO
    private postDAO: PostDAO
    private profileDAO: ProfileDAO

    constructor() {
        this.accountDao = new AccountDAO()
        this.banDAO = new BanDAO()
        this.postDAO = new PostDAO()
        this.profileDAO = new ProfileDAO()
    }

    public tempBanUser = async (req: any, res: Response): Promise<Response> => {
        const { username, days, reason } = req.body
        if( !username || !days || !reason ) return res.status(400).json({ 'error': ['Invalid data'] })

        const user = await this.accountDao.getAccountByUsername(username)
        const admin = await this.accountDao.getAccountByUsername(req.decoded.username)

        const existingBan = await this.banDAO.getBanByUser(user)
        if ( existingBan ) return res.status(400).json({ 'error': ['The user is already banned'] })

        const banTime = parseInt(days)
        if ( isNaN(banTime) ) return res.status(400).json({ 'error': ['Invalid data'] })

        const ban = new Ban()
        ban.user_account = user
        ban.staff_account = admin
        ban.reason = reason
        ban.banned_at = new Date()
        ban.banned_to = new Date().setDate(ban.banned_at.getDate()+banTime)
        ban.ip_ban = req.connection.remoteAddress

        const userProfile = await this.profileDAO.getProfileByUsername(user.user_name)
        const posts = await this.postDAO.getOwnedPosts(userProfile)
        this.hidePosts(posts)

        const createdBan = await this.banDAO.saveBan(ban)
        return res.status(200).json({ ban: createdBan })
    }

    private hidePosts(posts: Post[]) {
        posts.forEach(post => {
            post.hidden_at = Date.now()
            this.postDAO.updatePost(post)
        })
    }
}

export default AdminController
