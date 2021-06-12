import DatabaseConnector from '../util/databaseConnector'
import { Permission } from '../entity/permission'

class PermissionDAO {
    public async getPermissions(): Promise<Permission[]> {
        const repository = await DatabaseConnector.getRepository('Permission')

        const permissionList = repository.find()

        return permissionList
    }

    public async getPermission(id: number): Promise<Permission> {
        const repository = await DatabaseConnector.getRepository('Permission')

        return await repository.find({ where: { id: id } })
    }
}

export default PermissionDAO