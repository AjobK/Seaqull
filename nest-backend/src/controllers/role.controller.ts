import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { RoleService } from '../services/role.service'
import { JwtToken } from '../decorators/jwt.decorator'
import { Role } from '../entities/role.entity'

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Get()
  public async getRole(@JwtToken() token: string): Promise<Role> {
    const role = await this.roleService.getRole(token)

    return role
  }
}
