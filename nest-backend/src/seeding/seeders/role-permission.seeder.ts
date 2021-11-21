import { Permission } from '../../entities/permission.entity'
import { RolePermission } from '../../entities/rolePermission.entity'

module.exports = async (permissionsArray: Permission[], role, factory) => {
  for (let i = 0; i < permissionsArray.length; i++) {
    await factory(RolePermission)({
      role: role,
      permission: permissionsArray[i]
    }).create()
  }
}
