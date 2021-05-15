import DatabaseConnector from '../util/databaseConnector'
import { RolePermission } from '../entity/rolePermission'

class RolePermissionDAO {
    public async getRolePermissions(id: number): Promise<RolePermission[]> {
        const repository = await DatabaseConnector.getRepository('RolePermission');
        const rolePermissions = await repository.find({ role: id })
        return rolePermissions
    }
}
export default RolePermissionDAO