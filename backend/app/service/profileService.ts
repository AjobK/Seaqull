import { Request, Response } from 'express'
import TitleDAO from '../dao/titleDao'
import ProfileDAO from '../dao/profileDao'
import isEmail from 'validator/lib/isEmail'
const jwt = require('jsonwebtoken')
const matches = require('validator/lib/matches')
const isStrongPassword = require('validator/lib/isStrongPassword')
import { ReCAPTCHA } from 'node-grecaptcha-verify'
import Account from '../entity/account'
import * as bcrypt from 'bcrypt'
import AccountDAO from '../dao/accountDao'
import { v4 as uuidv4 } from 'uuid'
import Profile from '../entity/profile'
import RoleDao from '../dao/roleDao'
import Title from '../entity/title'
const expirationtimeInMs = process.env.JWT_EXPIRATION_TIME
const { SECURE } = process.env

class ProfileService {
    private dao: ProfileDAO
    private titleDAO: TitleDAO
    private accountDAO: AccountDAO
    private roleDAO: RoleDao

    constructor() {
        this.dao = new ProfileDAO()
        this.titleDAO = new TitleDAO()
        this.accountDAO = new AccountDAO()
        this.roleDAO = new RoleDao()
    }

    public updateProfile = async (req: any, res: Response): Promise<Response> => {

        if(req.decoded.username != req.body.username)
            return res.status(401).json({ 'error': 'Unauthorized' })

        const profile = await this.dao.getProfileByUsername(req.body.username)
        profile.description = req.body.description
        await this.dao.saveProfile(profile)
        return res.status(200).json({ 'message': 'Succes' })
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
        if (profile != null) {
            const title: Title = await this.titleDAO.getTitleByUserId(profile.id) || null

            const payload = {
                isOwner: decodedToken.username == receivedUsername ? true : false,
                username: receivedUsername,
                experience: profile.experience,
                title: title ? title.name : 'Title not found...' ,
                description: profile.description
            }

            res.status(200).json({ 'profile': payload })
        } else {
            res.status(400).json({ error: 'User not found' })
        }
        return res
    }

    public register = async (req: Request, res: Response): Promise<Response> => {
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

        const isPasswordNotStrong = await this.checkPasswordStrength(userRequested.password)
        if (isPasswordNotStrong) {
            errors.password = [isPasswordNotStrong]
        }

        const isRecaptchaNotValid = await this.checkReCAPTCHA(userRequested.recaptcha)
        if (isRecaptchaNotValid) {
            errors.recaptcha = [isRecaptchaNotValid]
        }

        if (isUsernamNotValid || isEmailNotValid || isPasswordNotStrong || isRecaptchaNotValid) {
            return res.status(401).json({ errors: errors })
        }
        const createAccount = await this.saveProfile(req)

        const newAccount = this.cleanAccount(createAccount)

        const payload = {
            username: createAccount.user_name,
            expiration: Date.now() + parseInt(expirationtimeInMs)
        }

        // remove old cookie
        if (req.cookies['token']) {
            res.clearCookie('token')
        }

        const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET)

        res.setHeader('Set-Cookie', `token=${token}; HttpOnly; ${ SECURE == 'true' ? 'Secure;' : '' } expires=${+new Date(new Date().getTime()+86409000).toUTCString()}; path=/`)
        res.status(200).json({
            user: newAccount
        })
        res.send()
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
        newProfile.title = await this.titleDAO.getTitleByTitleId(1)
        newProfile.display_name = u.username
        newProfile.experience = 0
        newProfile.custom_path = uuidv4()
        newProfile.rows_scrolled = 0
        newProfile.description = '{"blocks":[{"key":"dvnp","text":"i`m a wild seaqull","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
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
export default ProfileService