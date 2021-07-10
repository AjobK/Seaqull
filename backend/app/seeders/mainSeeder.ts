import { Factory, Seeder } from 'typeorm-seeding'

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

        await accountSeeder(factory, userRole, profilePic)
        await accountSeeder(factory, modRole, profilePic)
        await accountSeeder(factory, adminRole, profilePic)
        await accountSeeder(factory, headAdminRole, profilePic)

        const userPermissionsObjects = await permissionSeeder(this.permissionsUsers, factory)
        const modPermisionsObjects = (await permissionSeeder(this.permissionsModerators, factory)).concat(userPermissionsObjects)
        const adminPermsionsObjects = (await permissionSeeder(this.permissionsAdmins, factory)).concat(modPermisionsObjects)
        const headAdminPermissionsObject = (await permissionSeeder(this.permissionsHeadAdmins, factory)).concat(adminPermsionsObjects)

        await rolePermissionSeeder(userPermissionsObjects, userRole, factory)
        await rolePermissionSeeder(modPermisionsObjects, modRole, factory)
        await rolePermissionSeeder(adminPermsionsObjects, adminRole, factory)
        await rolePermissionSeeder(headAdminPermissionsObject, headAdminRole, factory)
    }
}
