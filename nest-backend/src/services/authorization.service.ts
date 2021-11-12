import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { AccountRepository } from '../repositories/account.repository'
import { RoleRepository } from '../repositories/role.repository'
import { Profile } from '../entities/profile.entity'

@Injectable()
export class AuthorizationService {
  constructor(
    @InjectRepository(AccountRepository) private readonly accountRepository: AccountRepository,
    @InjectRepository(RoleRepository) private readonly roleRepository: RoleRepository,
    private readonly jwtService: JwtService
  ) {}

  public async loginVerify(token: string): Promise<Profile> {
    const decodedUsername = this.jwtService.verify(token).username

    const account = await this.accountRepository.getAccountProfileAndRoleByUsername(decodedUsername)

    const profile = account.profile

    profile['role'] = account.role.name

    return profile
  }
}
