import { EntityRepository, Repository } from 'typeorm'
import { RolePermission } from '../entities/rolePermission.entity'

@EntityRepository(RolePermission)
export class RolePermissionRepository extends Repository<RolePermission> {
  public async getRolePermissionsByRole(id: number): Promise<RolePermission[]> {
    const rolePermissions = await this.find({ where: { role: id }, relations: ['permission'] })

    return rolePermissions
  }
}
