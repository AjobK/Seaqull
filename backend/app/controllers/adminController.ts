import { Response } from 'express'
import AccountDAO from '../daos/accountDAO'
import BanDAO from '../daos/banDAO'
import PostDAO from '../daos/postDAO'
import ProfileDAO from '../daos/profileDAO'
import Post from '../entities/post'
import BanService from '../utils/banService'

class AdminController {
    private accountDao: AccountDAO
    private postDAO: PostDAO
    private profileDAO: ProfileDAO
    private banService: BanService

    constructor() {
        this.accountDao = new AccountDAO()
        this.postDAO = new PostDAO()
        this.profileDAO = new ProfileDAO()
        this.banService = new BanService()
    }

    public tempBanUser = async (req: any, res: Response): Promise<Response> => {
        const { username, days, reason } = req.body
        if( !username || !days || !reason ) return res.status(400).json({ 'error': ['Invalid data'] })

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
        const userProfile = await this.profileDAO.getProfileByUsername(user.user_name)
        const posts = await this.postDAO.getOwnedPosts(userProfile)

        this.hidePosts(posts)

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
