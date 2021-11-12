import { EntityRepository, Repository } from 'typeorm'
import { RolePermission } from '../entities/rolePermission.entity'

@EntityRepository(RolePermission)
export class RolePermissionRepository extends Repository<RolePermission> {

}
