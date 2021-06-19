import { define } from 'typeorm-seeding'
import { Role } from '../entity/role'
import * as Faker from 'faker'
import RolePermission from '../entity/rolePermission'
import Permission from '../entity/permission'

define(RolePermission, (faker: typeof Faker, settings: { role: Role, permission: Permission }):RolePermission => {
    const rolePermissionFake = new RolePermission()
    rolePermissionFake.role = settings.role
    rolePermissionFake.permission = settings.permission
    return rolePermissionFake
})
