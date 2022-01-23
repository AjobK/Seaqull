import { EntityRepository, Repository } from 'typeorm'
import { Permission } from '../entities/permission.entity'

@EntityRepository(Permission)
export class PermissionRepository extends Repository<Permission> {

}
