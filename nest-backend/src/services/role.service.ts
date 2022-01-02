import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtPayload } from '../interfaces/jwt-payload.interface'
import { Role } from '../entities/role.entity'
import { RoleRepository } from '../repositories/role.repository'

@Injectable()
export class RoleService {

  constructor(
    @InjectRepository(RoleRepository) private readonly roleRepository: RoleRepository,
    private readonly jwtService: JwtService
  ) {
  }
  public async getRole(token: string): Promise<Role> {
    const decodedToken = this.jwtService.decode(token) as JwtPayload

    const role = await this.roleRepository.getRoleById(decodedToken.role_id)

    return role
  }
}
