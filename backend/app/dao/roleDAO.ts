import DatabaseConnector from '../util/databaseConnector'
import { Role } from '../entity/role'

class RoleDao {
    public async getRoles(): Promise<Role[]> {
        const repository = await DatabaseConnector.getRepository('Role');
        const roles = await repository.find()
        return roles
    }

    public async getRoleById(id: number): Promise<Role> {
        const repository = await DatabaseConnector.getRepository('Role');
        const role = await repository.findOne({ id: id })
        return role
    }
}

export default RoleDao
