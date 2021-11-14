import RolePermissionDAO from '../daos/rolePermissionDAO'
import PostDAO from '../daos/postDAO'
import AccountDAO from '../daos/accountDAO'

const rolePermissionDAO = new RolePermissionDAO
const postDAO = new PostDAO
const accountDAO = new AccountDAO
const POST_OWNER = 'POST_OWNER'
const ROLE_PERMISSIONS = 'ROLE_PERMISSIONS'

module.exports = (requiredPermissions) => {
  return async (req, res, next) => {
    let hasPermission = false

    const post = await postDAO.getPostByPath(req.params.path)
    const user = await accountDAO.getAccountByUsername(req.decoded.username)

    if (!user)
      return res.status(401).json({ 'error': 'You need to be logged in.' })

    if (!post)
      return res.status(404).json({ 'error': 'Post not found.' })

    for (const permission of requiredPermissions) {
      if (permission == POST_OWNER) {
        if (post.profile && post.profile.id === user.id) {
          hasPermission = true
        }
      } else if (permission == ROLE_PERMISSIONS && !hasPermission) {
        const permissionList = await rolePermissionDAO.getRolePermissionsByRole(req.decoded.role)

        if (permissionList.some((permissionItem) => permissionItem.permission.name === 'REMOVE_POSTS')) {
          hasPermission = true
        }
      }
    }

    return hasPermission
      ? next()
      : res.status(401).json({ 'error': 'You do not have the required permissions to this post.' })
  }
}
