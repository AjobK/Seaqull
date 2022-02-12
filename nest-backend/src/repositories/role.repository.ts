import { EntityRepository, Repository } from 'typeorm'
import { Role } from '../entities/role.entity'

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {

  public async getRoles(): Promise<Role[]> {
    const roles = await this.find()

    return roles
  }

  public async getRoleById(id: number): Promise<Role> {
    const role = this.findOne(id)

    return role
  }
}
