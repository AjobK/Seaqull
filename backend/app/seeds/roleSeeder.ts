import { Factory, Seeder } from 'typeorm-seeding'
import { Permission } from '../entity/permission'
import { Role } from '../entity/role'
import RolePermission from '../entity/rolePermission'

export default class CreateRole implements Seeder {
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
        const user = await factory(Role)({ name: 'user' }).create()
        const mod = await factory(Role)({ name: 'moderator' }).create()
        const admin = await factory(Role)({ name: 'admin' }).create()
        const headAdmin = await factory(Role)({ name: 'head-admin' }).create()

        const userPermissionsObjects = await this.createPermssion(this.permissionsUsers, user, factory)
        const modPermisionsObjects = (await this.createPermssion(this.permissionsModerators, mod, factory)).concat(userPermissionsObjects)
        const adminPermsionsObjects = (await this.createPermssion(this.permissionsAdmins, admin, factory)).concat(modPermisionsObjects)
        const headAdminPermissionsObject = (await this.createPermssion(this.permissionsHeadAdmins, headAdmin, factory)).concat(adminPermsionsObjects)

        await this.linkPermission(userPermissionsObjects, user, factory)
        await this.linkPermission(modPermisionsObjects, mod, factory)
        await this.linkPermission(adminPermsionsObjects, admin, factory)
        await this.linkPermission(headAdminPermissionsObject, headAdmin, factory)
    }

    private createPermssion = async (permissionsArray: string[], role: Role, factory: Factory) => {
        const permissions = []

        for (let i = 0; i < permissionsArray.length; i++) {
            const userPermission = await factory(Permission)({ name: permissionsArray[i] }).create()
            permissions.push(userPermission)
        }
        return permissions
    }

    private linkPermission = async (permissionsArray: Permission[], role: Role, factory: Factory) => {
        for (let i = 0; i < permissionsArray.length; i++) {
            await factory(RolePermission)({ role: role, permission: permissionsArray[i] }).create()
        }
    }
}