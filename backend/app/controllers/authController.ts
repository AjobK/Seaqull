import { Request, Response } from 'express'
import AccountDAO from '../daos/accountDAO'
import RoleDAO from '../daos/roleDAO'
import CaptchaService from '../utils/captchaService'
import { Account } from '../entities/account'
import BanService from '../utils/banService'
import AccountValidationService from '../utils/accountValidationService'

const jwt = require('jsonwebtoken')
const expirationtimeInMs = process.env.JWT_EXPIRATION_TIME

require('dotenv').config()
const { SECURE } = process.env

class AuthorizationController {
  private accountDAO: AccountDAO
  private roleDAO: RoleDAO
  private banService: BanService
  private accountValidationService: AccountValidationService

  constructor() {
    this.accountDAO = new AccountDAO()
    this.roleDAO = new RoleDAO()
    this.banService = new BanService()
    this.accountValidationService = new AccountValidationService()
  }

  public loginVerify = async (req: Request, res: Response): Promise<any> => {
    if (!req.cookies || !req.cookies.token) return res.status(401).json({ loggedIn: false })

    try {
      const account = await this.accountDAO.getAccountByUsername(
        jwt.verify(req.cookies.token, process.env.JWT_SECRET).username
      )

      const date = new Date()
      date.setMonth(date.getMonth() - 1)

      if (account.settings.active > Date.parse(date.toDateString())) {
        return res.status(403).json({ 'Error': 'Account Deactivated' })
      }

      const profile = account.profile

      const role = await this.roleDAO.getRoleByUser(profile.display_name)

      profile['role'] = role.name

      return res.status(200).json({ loggedIn: true, profile: profile })
    } catch (error) {
      if (req.cookies && req.cookies.token) {
        /**
         * TODO:  (Ajob) Added this to prevent token errors after `npm run reset`.
         *        However, this needs to be fixed in a better way because you have
         *        to refresh pages for this to work.
         * */
        this.logout(req, res)
      }

      return res.status(401).send({ loggedIn: false })
    }
  }

  public login = async (req: Request, res: Response): Promise<any> => {
    const { username, password, captcha } = req.body

    if (typeof username != 'string' || typeof username != 'string') return res.status(400).json({ loggedIn: false })

    let account = await this.accountDAO.getAccountByUsername(username)

    if (account == null) return res.status(403).json({ errors: ['Incorrect username or password'] })

    if (account.locked_to - Date.now() > 0) {
      return res.status(403).send({
        errors: ['Too many login attempts'],
        remainingTime: Math.floor((account.locked_to - Date.now()) / 1000),
      })
    } else {
      const isCaptchaValid = await CaptchaService.verifyHCaptcha(captcha)

      if (!isCaptchaValid) {
        return res.status(403).send({
          errors: ['We couldn\'t verify that you\'re not a robot.']
        })
      }

      if (req.cookies['token']) res.clearCookie('token')

      const validation = this.accountValidationService.validateAccountRequest(account, username, password)

      if (validation != null) return res.status(400).send(validation)

      const date = new Date()
      date.setMonth(date.getMonth() - 1)

      if (account.settings.active > Date.parse(date.toDateString())) {
        return res.status(403).json({ errors: ['Account inactive'] })
      }

      const ban = await this.banService.checkIfUserIsBanned(account)

      if (ban) {
        return res.status(403).json({ errors: [ban] })
      }

      const role = await this.roleDAO.getRoleByUser(username)
      const payload = {
        role: role.id,
        username: username,
        expiration: Date.now() + parseInt(expirationtimeInMs),
      }

      const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET)

      account = this.cleanAccount(account)

      res.setHeader(
        'Set-Cookie',
        `token=${token}; HttpOnly; ${SECURE == 'true' ? 'Secure;' : ''} expires=${
          +new Date(new Date().getTime() + 86409000).toUTCString()}; path=/`
      )

      res.status(200).json({
        user: account
      })
      res.send()
    }
  }

  private cleanAccount = (account: Account): Account => {
    delete account.password
    delete account.changed_pw_at
    delete account.login_attempts_counts
    delete account.last_ip
    delete account.locked_to

    return account
  }

  public logout = (req: Request, res: Response): void => {
    if (req.cookies['token']) {
      res.clearCookie('token').status(200).json({
        message: 'You have logged out',
      })
    } else {
      res.status(401).json({
        error: 'Invalid jwt',
      })
    }
  }
}

export default AuthorizationController
