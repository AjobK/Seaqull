import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Role } from '../../entities/role.entity'
import { permissionsAdmins, permissionsHeadAdmins, permissionsModerators, permissionsUsers } from '../data/seed.data'

const roleSeeder = require('./role.seeder')
const attachmentSeeder = require('./attachment.seeder')
const accountSeeder = require('./account.seeder')
const permissionSeeder = require('./permission.seeder')
const rolePermissionSeeder = require('./role-permission.seeder')

export default class CreateObjects implements Seeder {
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
      permissionsUsers,
      factory
    )
    const modPermisionsObjects = (await permissionSeeder(
      permissionsModerators,
      factory
    )).concat(userPermissionsObjects)
    const adminPermsionsObjects = (await permissionSeeder(
      permissionsAdmins,
      factory
    )).concat(modPermisionsObjects)
    const headAdminPermissionsObject = (await permissionSeeder(
      permissionsHeadAdmins,
      factory
    )).concat(adminPermsionsObjects)

    await rolePermissionSeeder(userPermissionsObjects, userRole, factory)
    await rolePermissionSeeder(modPermisionsObjects, modRole, factory)
    await rolePermissionSeeder(adminPermsionsObjects, adminRole, factory)
    await rolePermissionSeeder(headAdminPermissionsObject, headAdminRole, factory)
  }
}
