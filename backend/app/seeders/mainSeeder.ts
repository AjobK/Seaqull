import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import Role from '../entities/role'

const roleSeeder = require('./roleSeeder')
const attachmentSeeder = require('./attachmentSeeder')
const accountSeeder = require('./accountSeeder')
const permissionSeeder = require('./permissionSeeder')
const rolePermissionSeeder = require('./rolePermissionSeeder')

export default class CreateObjects implements Seeder {
    private permissionsUsers = [
      'REPORT_USERS',
      'REQUEST_MODERATORS',
      'OPEN_TICKETS',
      'REQUEST_BAN_APPEALS',
      'REQUEST_CONTENT_BLOCK_APPEALS',
    ]

    private permissionsModerators = [
      'SEE_REPORTED_USERS',
      'SHORT_BAN_USERS',
      'UNBAN_USERS',
      'REMOVE_POSTS',
      'RECOVER_POSTS',
      'SEE_REPORTED_POSTS',
      'VIEW_TICKETS',
      'CONTENT_BLOCK_USERS',
      'COMMENT_BLOCK_USERS',
      'REMOVE_ATTACHMENTS',
      'RECOVER_ATTACHMENTS'
    ]

    private permissionsAdmins = [
      'PROMOTE_MODERATORS',
      'REMOVE_MODERATORS',
      'BAN_USERS',
      'PERMA_BAN_USERS',
      'REVIEW_BAN_APPEALS',
      'MACHINE_BAN_USERS'
    ]

    private permissionsHeadAdmins = [
      'PROMOTE_ADMINS',
      'DEMOTE_ADMINS'
    ]

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

      await accountSeeder(factory, userRole, profilePic, bannerPic)
      await accountSeeder(factory, modRole, profilePic, bannerPic)
      await accountSeeder(factory, adminRole, profilePic, bannerPic)
      await accountSeeder(factory, headAdminRole, profilePic, bannerPic)

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
