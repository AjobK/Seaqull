import { CanActivate, ExecutionContext, ForbiddenException, mixin, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { RolePermissionRepository } from '../repositories/role_permission.repository'

export const hasPermission = (permission: string): any => {
  class RoleGuard implements CanActivate {

    constructor(
      private readonly jwtService: JwtService,
      @InjectRepository(RolePermissionRepository) private rolePermissionRepository: RolePermissionRepository
    ) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
      const req = context.switchToHttp().getRequest()

      if (!req.cookies?.token) throw new UnauthorizedException('Missing token')

      const decoded_token = this.jwtService.decode(req.cookies.token) as any

      const rolePermissions = await this.rolePermissionRepository.getRolePermissionsByRole(decoded_token.role_id)

      let hasPermission = false

      rolePermissions.forEach(((rolePermission) => {
        if (rolePermission.permission.name === permission) hasPermission = true
      }))

      if (hasPermission) return true

      throw new ForbiddenException({ 'error': 'You don\'t have the right permisions' })
    }
  }

  const guard = mixin(RoleGuard)

  return guard
}

