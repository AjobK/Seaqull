import { Factory, Seeder } from 'typeorm-seeding'

const roleSeeder = require('./seeders/roleSeeder')
const attachmentSeeder = require('./seeders/attachmentSeeder')
const accountSeeder = require('./seeders/accountSeeder')
const permissionSeeder = require('./seeders/permissionSeeder')
const rolePermissionSeeder = require('./seeders/rolePermissionSeeder')

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
        'BAN_USERS',
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
        'PERMA_BAN_USERS',
        'REVIEW_BAN_APPEALS',
        'MACHINE_BAN_USERS'
    ]

    private permissionsHeadAdmins = [
        'PROMOTE_ADMINS',
        'DEMOTE_ADMINS'
    ]

    public async run(factory: Factory): Promise<any> {
        const userRole = await roleSeeder(factory, 'user')
        const modRole = await roleSeeder(factory, 'moderator')
        const adminRole = await roleSeeder(factory, 'admin')
        const headAdminRole = await roleSeeder(factory, 'head-admin')

        const profilePic = await attachmentSeeder(factory)

        accountSeeder(factory, userRole, profilePic)
        accountSeeder(factory, modRole, profilePic)
        accountSeeder(factory, adminRole, profilePic)
        accountSeeder(factory, headAdminRole, profilePic)

        const userPermissionsObjects = await permissionSeeder(this.permissionsUsers, factory)
        const modPermisionsObjects = (await permissionSeeder(this.permissionsModerators, factory)).concat(userPermissionsObjects)
        const adminPermsionsObjects = (await permissionSeeder(this.permissionsAdmins, factory)).concat(modPermisionsObjects)
        const headAdminPermissionsObject = (await permissionSeeder(this.permissionsHeadAdmins, factory)).concat(adminPermsionsObjects)

        rolePermissionSeeder(userPermissionsObjects, userRole, factory)
        rolePermissionSeeder(modPermisionsObjects, modRole, factory)
        rolePermissionSeeder(adminPermsionsObjects, adminRole, factory)
        rolePermissionSeeder(headAdminPermissionsObject, headAdminRole, factory)
    }
}
