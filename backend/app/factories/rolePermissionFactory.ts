import { define } from 'typeorm-seeding'
import { Role } from '../entities/role'
import * as Faker from 'faker'
import RolePermission from '../entities/rolePermission'
import Permission from '../entities/permission'

define(RolePermission, (faker: typeof Faker, settings: { role: Role, permission: Permission }):RolePermission => {
  const rolePermissionFake = new RolePermission()
  rolePermissionFake.role = settings.role
  rolePermissionFake.permission = settings.permission

  return rolePermissionFake
})
