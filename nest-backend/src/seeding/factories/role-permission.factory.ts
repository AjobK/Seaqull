import { define } from 'typeorm-seeding'
import { Role } from '../../entities/role.entity'
import * as Faker from 'faker'
import { RolePermission } from '../../entities/rolePermission.entity'
import { Permission } from '../../entities/permission.entity'

define(RolePermission, (faker: typeof Faker, settings: { role: Role, permission: Permission }):RolePermission => {
  const rolePermissionFake = new RolePermission()
  rolePermissionFake.role = settings.role
  rolePermissionFake.permission = settings.permission

  return rolePermissionFake
})
