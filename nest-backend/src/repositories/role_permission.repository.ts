import { EntityRepository, Repository } from 'typeorm'
import RolePermission from '../entities/rolePermission'

@EntityRepository(RolePermission)
export class RolePermissionRepository extends Repository<RolePermission> {

}
