import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Role } from '../../entities/role.entity'

const roleSeeder = require('./roleSeeder')
const attachmentSeeder = require('./attachmentSeeder')
const accountSeeder = require('./accountSeeder')
const permissionSeeder = require('./permissionSeeder')
const rolePermissionSeeder = require('./rolePermissionSeeder')

export default class CreateObjects implements Seeder {
    private permissionsUsers = import('../data/permission-users.data')
    private permissionsModerators = import('../data/permission-moderators.data')
    private permissionsAdmins = import('../data/permission-admins.data')
    private permissionsHeadAdmins = import('../data/permission-head-admins.data')

    private async checkDatabaseIsSeeded(connection: Connection): Promise<boolean> {
      const repository = await connection.getRepository('Role')
      const roles = await repository.find() as Role[]

      return roles.length > 0
    }

    public async run(factory: Factory, connection: Connection): Promise<any> {
      if (await this.checkDatabaseIsSeeded(connection)) {
        console.log(' | Seeding has already occured')

        return
      }

      const userRole = await roleSeeder(factory, 'User')
      const modRole = await roleSeeder(factory, 'Moderator')
      const adminRole = await roleSeeder(factory, 'Admin')
      const headAdminRole = await roleSeeder(factory, 'Head-admin')

      const profilePic = await attachmentSeeder(factory, 'default/defaultAvatar.png')
      const bannerPic = await attachmentSeeder(factory, 'default/defaultBanner.jpg')
      const thumbnailPic = await attachmentSeeder(factory, 'default/defaultThumbnail.jpg')

      await accountSeeder(factory, userRole, profilePic, bannerPic, thumbnailPic)
      await accountSeeder(factory, modRole, profilePic, bannerPic, thumbnailPic)
      await accountSeeder(factory, adminRole, profilePic, bannerPic, thumbnailPic)
      await accountSeeder(factory, headAdminRole, profilePic, bannerPic, thumbnailPic)

      const userPermissionsObjects = await permissionSeeder(
        this.permissionsUsers,
        factory
      )
      const modPermisionsObjects = (await permissionSeeder(
        this.permissionsModerators,
        factory
      )).concat(userPermissionsObjects)
      const adminPermsionsObjects = (await permissionSeeder(
        this.permissionsAdmins,
        factory
      )).concat(modPermisionsObjects)
      const headAdminPermissionsObject = (await permissionSeeder(
        this.permissionsHeadAdmins,
        factory
      )).concat(adminPermsionsObjects)

      await rolePermissionSeeder(userPermissionsObjects, userRole, factory)
      await rolePermissionSeeder(modPermisionsObjects, modRole, factory)
      await rolePermissionSeeder(adminPermsionsObjects, adminRole, factory)
      await rolePermissionSeeder(headAdminPermissionsObject, headAdminRole, factory)
    }
}
