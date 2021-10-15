import { Controller, Get } from '@nestjs/common'
import { RoleService } from '../services/role.service'

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  public getRole(): any {

  }
}
