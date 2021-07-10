import { Factory } from 'typeorm-seeding'
import Permission from '../../entities/permission'

module.exports = async (permissionsArray: Permission[], factory: Factory) => {
    const permissions = []

    for (let i = 0; i < permissionsArray.length; i++) {
        const userPermission = await factory(Permission)({ name: permissionsArray[i] }).create()
        
        permissions.push(userPermission)
    }
    return permissions
}
