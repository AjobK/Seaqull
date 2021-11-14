import {ForbiddenException, forwardRef, Inject, Injectable} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { AccountRepository } from '../repositories/account.repository'
import { Profile } from '../entities/profile.entity'
import { Account } from '../entities/account.entity'
import * as bcrypt from 'bcrypt'
import { BanService } from './ban.service'
import { JwtPayload } from '../interfaces/jwt-payload.interface'
import { SuccessfulLoginDTO } from '../dtos/successful-login.dto'
import {BanRepository} from "../repositories/ban.repository";

@Injectable()
export class AuthorizationService {
  constructor(
    @InjectRepository(AccountRepository) private readonly accountRepository: AccountRepository,
    @InjectRepository(BanRepository) private readonly banRepository: BanRepository,
    private readonly jwtService: JwtService
  ) {
  }

  public async loginVerify(token: string): Promise<Profile> {
    const decodedUsername = this.jwtService.verify(token)

    const account = await this.accountRepository.getAccountProfileAndRoleByUsername(decodedUsername.user_name)

    const profile = account.profile

    profile['role'] = account.role.name

    return profile
  }

  public async getAccountByUsername(username: string): Promise<Account> {
    const account = await this.accountRepository.getAccountByUsername(username)

    return account
  }

  public async login(
    account: Account,
    password: string
  ): Promise<SuccessfulLoginDTO> {
    if (this.accountIsLocked(account)) {
      throw new ForbiddenException({
        errors: ['Too many login attempts'],
        remainingTime: Math.floor((account.locked_to - Date.now()) / 1000),
      })
    }

    await this.attemptLogin(account, password)

    const ban = await this.banRepository.checkIfUserIsBanned(account)

    if (ban) throw new ForbiddenException(ban)

    const role_id = await this.accountRepository.getAccountRoleIdByUsername(account.user_name)

    const payload: JwtPayload = {
      role_id,
      user_name: account.user_name,
      expiration: Date.now() + parseInt(process.env.JWT_EXPIRATION_TIME)
    }

    const token = this.jwtService.sign(payload)

    return { token, account: this.cleanAccount(account) }
  }

  private async attemptLogin(account: Account, password: string): Promise<void> {
    const passwordIsCorrect = await bcrypt.compare(password, account.password)

    if (passwordIsCorrect) {
      account.login_attempts_counts = 0
      await this.accountRepository.updateAccount(account)

      return
    }

    account.login_attempts_counts++

    if (account.login_attempts_counts > 2) {
      const remainingTime = await this.accountRepository.lockAccount(account)

      throw new ForbiddenException({ errors: ['Too many login attempts'], remainingTime: remainingTime })
    }

    await this.accountRepository.updateAccount(account)

    throw new ForbiddenException({ errors: ['Incorrect username of password'] })
  }

  private accountIsLocked(account: Account): boolean {
    return account.locked_to - Date.now() > 0
  }

  private cleanAccount = (account: Account): Account => {
    delete account.password
    delete account.changed_pw_at
    delete account.login_attempts_counts
    delete account.last_ip
    delete account.locked_to

    return account
  }
}
