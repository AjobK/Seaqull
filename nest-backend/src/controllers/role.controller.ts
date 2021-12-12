import { Controller, Get } from '@nestjs/common'
import { RoleService } from '../services/role.service'
import { JwtToken } from '../decorators/jwt.decorator'
import { Role } from '../entities/role.entity'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  public async getRole(@JwtToken() token: string): Promise<Role> {
    const role = await this.roleService.getRole(token)

    return role
  }
}
