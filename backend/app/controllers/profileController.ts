import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import isEmail from 'validator/lib/isEmail'
import { ReCAPTCHA } from 'node-grecaptcha-verify'
import * as bcrypt from 'bcrypt'
import Account from '../entities/account'
import Profile from '../entities/profile'
import Title from '../entities/title'
import RoleDao from '../daos/roleDAO'
import ProfileDAO from '../daos/profileDAO'
import TitleDAO from '../daos/titleDAO'
import AccountDAO from '../daos/accountDAO'
import attachmentDAO from '../daos/attachmentDAO'
import FileService from '../utils/fileService'
import Attachment from '../entities/attachment'
import ProfileFollowedBy from '../entities/profile_followed_by'

const jwt = require('jsonwebtoken')
const matches = require('validator/lib/matches')
const isStrongPassword = require('validator/lib/isStrongPassword')

const expirationtimeInMs = process.env.JWT_EXPIRATION_TIME
const { SECURE } = process.env

class ProfileController {
    private dao: ProfileDAO
    private titleDAO: TitleDAO
    private accountDAO: AccountDAO
    private roleDAO: RoleDao
    private attachmentDAO: attachmentDAO
    private fileService: FileService

    constructor() {
        this.dao = new ProfileDAO()
        this.titleDAO = new TitleDAO()
        this.accountDAO = new AccountDAO()
        this.roleDAO = new RoleDao()
        this.attachmentDAO = new attachmentDAO()
        this.fileService = new FileService()
    }

    public updateProfile = async (req: any, res: Response): Promise<Response> => {
        const updateUser = req.body

        if (req.decoded.username != updateUser.username) {
            return res.status(401).json({ 'error': 'Unauthorized' })
        }

        const profile = await this.dao.getProfileByUsername(updateUser.username)

        for (let i = 0; i < Object.keys(updateUser).length; i++) {
            profile[Object.keys(updateUser)[i]] = updateUser[Object.keys(updateUser)[i]]
        }

        await this.dao.saveProfile(profile)
        return res.status(200).json({ 'message': 'Succes' })
    }

    public updateProfilePicture = async (req: any, res: Response): Promise<Response> => {
        const isImage = await this.fileService.isImage(req.file)

        if (!isImage) {
            return res.status(400).json({ 'error': 'Only images are allowed' })
        } else {
            const profile = await this.dao.getProfileByUsername(req.decoded.username)
            const attachment = await this.dao.getProfileAttachment(profile.id)
            const location = await this.fileService.storeImage(req.file)

            await this.fileService.convertImage(location)

            let profileAttachment = attachment

            if (attachment.path != 'default/default.png') {
                this.fileService.deleteImage(attachment.path)
                profileAttachment.path = location

                this.attachmentDAO.saveAttachment(profileAttachment)
            } else {
                const newAttachment = new Attachment()
                profileAttachment = newAttachment
                profileAttachment.path = location

                const storedAttachment = await this.attachmentDAO.saveAttachment(profileAttachment)
                profile.avatar_attachment = storedAttachment

                await this.dao.saveProfile(profile)
            }

            return res.status(200).json({ 'message': 'succes' , 'url': 'http://localhost:8000/' + profileAttachment.path })
        }
    }

    public getProfile = async (req: Request, res: Response): Promise<Response> => {
        const { token } = req.cookies
        let decodedToken: any

        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        } catch (e) {
            decodedToken = null
        }

        let receivedUsername = req.params.username

        if (!receivedUsername) {
            if (decodedToken && decodedToken.username) {
                receivedUsername = decodedToken.username
            } else {
                return res.status(404).json({ error: 'No username was given' })
            }
        }

        const profile = await this.dao.getProfileByUsername(receivedUsername)

        if (!profile) return res.status(404).json({ 'message': 'User not found' })

        const title: Title = await this.titleDAO.getTitleByUserId(profile.id) || null
        let isOwner = false

        if (receivedUsername && decodedToken)
            isOwner = receivedUsername == decodedToken.username

        let following = false

        if (!isOwner && decodedToken && decodedToken.username) {
            const profileFollowedBy: ProfileFollowedBy = new ProfileFollowedBy()
            profileFollowedBy.follower = (await this.dao.getProfileByUsername(decodedToken.username)).id
            profileFollowedBy.profile = profile.id

            following = await this.dao.isFollowing(profileFollowedBy)
        }

        const payload = {
            isOwner: isOwner,
            following: following,
            username: receivedUsername,
            title: title ? title.name : 'Title not found...',
            description: profile.description
        }
        const attachment = await this.dao.getProfileAttachment(profile.id)

        if (attachment)
            payload['avatar'] = 'http://localhost:8000/' + attachment.path

        return res.status(200).json({ 'profile': payload })
    }

    public register = async (req: any, res: Response): Promise<Response> => {
        const userRequested = req.body
        const errors = {
            username: [],
            email: [],
            password: [],
            recaptcha: []
        }

        const isUsernamNotValid = await this.checkValidUsername(userRequested.username)

        if (isUsernamNotValid) {
            errors.username = [isUsernamNotValid]
        }

        const isEmailNotValid = await this.checkValidEmail(userRequested.email)

        if (isEmailNotValid) {
            errors.email = [isEmailNotValid]
        }

        const isPasswordNotStrong = this.checkPasswordStrength(userRequested.password)

        if (isPasswordNotStrong) {
            errors.password = [isPasswordNotStrong]
        }

        const isRecaptchaNotValid = await this.checkReCAPTCHA(userRequested.recaptcha)
        if (isRecaptchaNotValid) {
            errors.recaptcha = [isRecaptchaNotValid]
        }

        if (isUsernamNotValid || isEmailNotValid || isPasswordNotStrong) {
            return res.status(401).json({ errors: errors })
        }

        const createAccount = await this.saveProfile(req)

        const newAccount = this.cleanAccount(createAccount)

        const payload = {
            role: createAccount.role.id,
            username: createAccount.user_name,
            expiration: Date.now() + parseInt(expirationtimeInMs)
        }

        if (req.cookies['token']) res.clearCookie('token')

        const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET)

        res.setHeader('Set-Cookie', `token=${token}; HttpOnly; ${ SECURE == 'true' ? 'Secure;' : '' } expires=${+new Date(new Date().getTime()+86409000).toUTCString()}; path=/`)
        res.status(200).json({
            user: newAccount
        })
        res.send()
        return res
    }

    public follow = async (req: Request, res: Response): Promise<Response> => {
        const { token } = req.cookies
        let decodedToken: any

        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        } catch (e) {
            decodedToken = null

            return res.status(401).json({ error: 'Unauthorized' })
        }

        let follower: Profile | null = null

        if (decodedToken && decodedToken.username) {
            follower = await this.dao.getProfileByUsername(decodedToken.username)
        } else {
            return res.status(404).json({ error: 'No username to follow was given' })
        }

        let profile: Profile | null = null

        if (req.params.username)
            profile = await this.dao.getProfileByUsername(req.params.username)

        if (!follower || !profile)
            return res.status(422).json({ error: 'No profile to follow or follower found in request' })

        if (follower.id == profile.id)
            return res.status(422).json({ error: 'Following yourself is not possible' })

        const profileFollowedBy: ProfileFollowedBy = new ProfileFollowedBy()
        profileFollowedBy.follower = follower.id
        profileFollowedBy.profile = profile.id

        const followedProfile = await this.dao.follow(profileFollowedBy)

        return res.status(200).json({ message: `Succesfully ${followedProfile ? '' : 'un'}followed profile`, following: followedProfile })
    }

    private async checkValidUsername (username: string): Promise<string> {
        if (!matches(username, '^[a-zA-Z0-9_.-]*$')) {
            return 'Invalid characters in username'
        } else if (username.length < 4) {
            return 'Username too short'
        }

        const isUsernameTaken = await this.dao.getProfileByUsername(username)
        if (isUsernameTaken) {
            return 'Username not available'
        }
        return null
    }

    // todo verify email by sending an email to user
    private async checkValidEmail (email: string): Promise<string> {
        if (!isEmail(email)) {
            return 'Invalid email adress'
        }

        const isEmailTaken = await this.dao.getUserByEmail(email)
        if (isEmailTaken) {
            return 'Email not available'
        }

        return null
    }

    private checkPasswordStrength(password: string): string {
        if (!isStrongPassword(password, { minSymbols: 0 })) {
            return 'Password is too weak.\nUse lowercase letter(s), uppercase letter(s) and number(s).\nShould be atleast 8 characters long.'
        }
        return null
    }

    private async checkReCAPTCHA(token: string): Promise<string> {
        const reCaptcha = new ReCAPTCHA(process.env.RECAPTCHA_SECRET_KEY, 0.5)
        const verificationResult = await reCaptcha.verify(token)

        if (!verificationResult.isHuman) {
            return 'Invalid captcha'
        }
        return null
    }

    private async saveProfile(req: Request):Promise<Account> {
        const u = req.body

        let newProfile = new Profile()

        newProfile.avatar_attachment = await this.attachmentDAO.getAttachment(1)
        newProfile.title = await this.titleDAO.getTitleByTitleId(1)
        newProfile.display_name = u.username
        newProfile.custom_path = uuidv4()
        newProfile.rows_scrolled = 0
        newProfile.description = 'Welcome to my profile!'
        newProfile = await this.dao.saveProfile(newProfile)

        const acc = new Account()
        acc.last_ip = req.ip
        acc.profile = newProfile
        acc.email = u.email
        acc.password = await bcrypt.hash(u.password, 10)
        acc.user_name = u.username
        acc.role = await this.roleDAO.getRoleById(1)
        const createdAccount = await this.accountDAO.saveAccount(acc)
        return createdAccount
    }

    // function removes all unnecessary data
    private cleanAccount = (account: Account): Account => {
        delete account.password
        delete account.changed_pw_at
        delete account.login_attempts_counts
        delete account.last_ip
        delete account.locked_to

        return account
    }
}

export default ProfileController
