import RolePermissionDAO from '../daos/rolePermissionDAO'
import PostDAO from '../daos/postDAO'
import AccountDAO from '../daos/accountDAO'

const rolePermissionDAO = new RolePermissionDAO
const postDAO = new PostDAO
const accountDAO = new AccountDAO

module.exports = async (req, res, next) => {
    let hasPermission = false

    const post = await postDAO.getPostByPath(req.params.path)
    const user = await accountDAO.getAccountByUsername(req.decoded.username)

    if (!post) {
        return res.status(404).json({ 'error': 'Post not found.' })
    }

    if (post.profile.id === user.id) {
        hasPermission = true
    } else {
        const permissionList = await rolePermissionDAO.getRolePermissionsByRole(req.decoded.role)

        if (permissionList.some((permissionItem) => permissionItem.permission.name === 'REMOVE_POSTS')) {
            hasPermission = true
        }
    }

    return hasPermission
      ? next()
      : res.status(401).json({ 'error': 'You don\'t have the permissions for deleting this post.' })
}
