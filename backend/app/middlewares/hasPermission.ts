import RolePermissionDAO from '../daos/rolePermissionDAO'

const rolePermissionDAO = new RolePermissionDAO

module.exports = (requiredPermissionName) => {
  return async (req, res, next) => {
    const permissionList = await rolePermissionDAO.getRolePermissionsByRole(req.decoded.role)
    let hasPermission = false

    permissionList.forEach((permission) => {
      if (permission.permission.name == requiredPermissionName) {
        hasPermission = true
      }
    })

    if (!hasPermission) {
      return res.status(401).json({ 'error': 'You don\'t have the right permisions' })
    }

    next()
  }
}
