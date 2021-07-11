import DatabaseConnector from '../utils/databaseConnector'
import { RolePermission } from '../entities/rolePermission'

class RolePermissionDAO {
    public async getRolePermissionsByRole(id: number): Promise<RolePermission[]> {
        const repository = await DatabaseConnector.getRepository('RolePermission')
        const rolePermissions = await repository.find({ where: { role: id }, relations: ['permission'] })

        return rolePermissions
    }
}

export default RolePermissionDAO
