import { EntityRepository, Repository } from 'typeorm'
import { Permission } from '../entities/permission'

@EntityRepository(Permission)
export class PermissionRepository extends Repository<Permission> {

}
