import DatabaseConnector from '../utils/databaseConnector'
import { Role } from '../entities/role'

class RoleDao {
    public async getRoles(): Promise<Role[]> {
        const repository = await DatabaseConnector.getRepository('Role')
        const roles = await repository.find()
        
        return roles
    }

    public async getRoleById(id: number): Promise<Role> {
        const repository = await DatabaseConnector.getRepository('Role')
        const role = await repository.findOne({ id: id })
        
        return role
    }

    public async getRoleByUser(username: string): Promise<Role> {
        const repository = await DatabaseConnector.getRepository('Account')
        const role = await repository.createQueryBuilder('account')
            .leftJoinAndSelect('account.role', 'role')
            .select(['account.role'])
            .where('account.user_name = :user_name', { user_name: username })
            .getRawOne()
        return await this.getRoleById(role.role_id)
    }
}

export default RoleDao
