import { EntityRepository, Repository } from 'typeorm'
import Role from '../entities/role'

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {

}
