import { Request, Response } from 'express'
import TitleDAO from '../dao/titleDao'
import UserDao from '../dao/userDao'
import isEmail from 'validator/lib/isEmail'
const jwt = require('jsonwebtoken')
const passport = require('passport')
const matches = require('validator/lib/matches')
const isStrongPassword = require('validator/lib/isStrongPassword')
import { ReCAPTCHA } from 'node-grecaptcha-verify'
import account from '../entity/account'
import * as bcrypt from 'bcrypt'
import AccountDAO from '../dao/accountDao'
import { v4 as uuidv4 } from 'uuid'
import user from '../entity/user'
const expirationtimeInMs = process.env.JWT_EXPIRATION_TIME
const { SECURE } = process.env

require('../util/passport')(passport)

class UserService {
    private dao: UserDao
    private titleDAO: TitleDAO
    private accountDAO: AccountDAO

    constructor() {
        this.dao = new UserDao()
        this.titleDAO = new TitleDAO()
        this.accountDAO = new AccountDAO()
    }

    public getProfile = async (req: Request, res: Response): Promise<Response> => {
        // extracting token
        const { token } = req.cookies
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        // getting username from parameters
        let username = req.params.username

        // check if username is precent in the paramenters
        if(!username){
            // check if a username is present in payload
            if(decodedToken.username){
                // if there is no username in params then use one in the jwt
                username = decodedToken.username
            } else {
                // no username was found in payload nor was it found in the params
                return res.status(404).json({ error: 'No username was given' })
            }
        }

        // get user with username
        const user = await this.dao.getUserByUsername(decodedToken.username)
        // get users title
        const title = await this.titleDAO.getTitleById(user.title_id)

        // creating payload
        const payload = {
            isOwner: false,
            username: username,
            experience: user.experience,
            title: title,
            posts: ''
        }

        // check if user is the owner
        if(decodedToken.username == username) {
            // check if jwt is valid
            passport.authenticate('jwt', { session: false })
            // set owner in payload
            payload.isOwner = true
        }

        res.status(200)
        res.json({ 'profile': payload })
        return res
    }

    public register = async (req: Request, res: Response): Promise<Response> => {
        const userRequested = req.body
        const errors = {
            user_name: [],
            email: [],
            password: [],
            recaptcha: []
        }

        const isUsernamNotValid = await this.checkValidUsername(userRequested.user_name)
        if(isUsernamNotValid){
            errors.user_name = [isUsernamNotValid]
        }

        const isEmailNotValid = await this.checkValidEmail(userRequested.email)
        if(isEmailNotValid){
            errors.email = [isEmailNotValid]
        }

        const isPasswordNotStrong = await this.checkPasswordStrength(userRequested.password)
        if(isPasswordNotStrong) {
            errors.password = [isPasswordNotStrong]
        }

        const isRecaptchaNotValid = await this.checkReCAPTCHA(userRequested.recaptcha)
        if(isRecaptchaNotValid){
            errors.recaptcha = [isRecaptchaNotValid]
        }

        if(isUsernamNotValid || isEmailNotValid || isPasswordNotStrong || isRecaptchaNotValid) {
            return res.status(401).json({ errors: errors })
        }
        const createAccount = await this.saveUser(req)


        // creating payload for token
        const payload = {
            username: createAccount.user_name,
            expiration: Date.now() + parseInt(expirationtimeInMs)
        }

        // creating token
        const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET)

        res.setHeader('Set-Cookie', `token=${token} HttpOnly ${ SECURE == 'true' ? 'Secure' : '' } expires=${+new Date(new Date().getTime()+86409000).toUTCString()} path=/`)
        res.status(200).json({
            user: createAccount
        })
        res.send()
    }

    private async checkValidUsername (username: string): Promise<string> {
        if (!matches(username, '^[a-zA-Z0-9_.-]*$')){
            return 'Invalid characters in username'
        } else if (username.length < 4){
            return 'Username too short'
        }

        const isUsernameTaken = await this.dao.getUserByUsername(username)
        if(isUsernameTaken){
            return 'Username not available'
        }
        return null
    }

    // todo verify email by sending an email to user
    private async checkValidEmail (email: string): Promise<string> {
        if(!isEmail(email)){
            return 'Invalid email adress'
        }

        const isEmailTaken = await this.dao.getUserByEmail(email)
        if(isEmailTaken){
            return 'Email not available'
        }

        return null
    }

    private checkPasswordStrength(password: string): string {
        if (!isStrongPassword(password, { minSymbols: 0 })){
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

    private async saveUser(req: Request):Promise<account> {
        const u = req.body
        const acc = new account()
        acc.last_ip = req.ip
        acc.email = u.email
        acc.password = await bcrypt.hash(u.password, 10)
        acc.user_name = u.user_name
        acc.role_id = 1
        const createdAccount = await this.accountDAO.saveAccount(acc)

        const newUser = new user()
        newUser.account_id = createdAccount.id
        newUser.title_id = 1
        newUser.display_name = u.user_name
        newUser.experience = 0
        newUser.custom_path = uuidv4()
        newUser.rows_scrolled = 0
        await this.dao.saveUser(newUser)
        return createdAccount
    }

    // function removes all unnecessary data
    private cleanAccount = (account: account): account => {
        delete account.password
        delete account.changed_pw_at
        delete account.login_attempts_counts
        delete account.last_ip
        delete account.locked_to

        return account
    }
}
export default UserService