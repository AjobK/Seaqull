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
    ].concat(this.permissionsUsers)

    private permissionsAdmins = [
        'PROMOTE_MODERATORS',
        'REMOVE_MODERATORS',
        'PERMA_BAN_USERS',
        'REVIEW_BAN_APPEALS',
        'MACHINE_BAN_USERS'
    ].concat(this.permissionsModerators)

    private permissionsHeadAdmins = [
        'PROMOTE_ADMINS',
        'DEMOTE_ADMINS'
    ].concat(this.permissionsAdmins)

    public async run(factory: Factory): Promise<any> {
        const user = await factory(Role)({ name: 'user' }).create()
        const mod = await factory(Role)({ name: 'moderator' }).create()
        const admin = await factory(Role)({ name: 'admin' }).create()
        const headAdmin = await factory(Role)({ name: 'head-admin' }).create()

        await this.linkPermission(this.permissionsUsers, user, factory)
        await this.linkPermission(this.permissionsModerators, mod, factory)
        await this.linkPermission(this.permissionsAdmins, admin, factory)
        await this.linkPermission(this.permissionsHeadAdmins, headAdmin, factory)
    }

    private linkPermission = async (permissionsArray: string[], role: Role, factory: Factory) => {
        for (let i = 0; i < permissionsArray.length; i++) {
            const userPermission = await factory(Permission)({ name: permissionsArray[i] }).create()
            await factory(RolePermission)({ role: role, permission: userPermission }).create()
        }
    }
}