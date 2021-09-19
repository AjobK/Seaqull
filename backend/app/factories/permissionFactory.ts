import { define } from 'typeorm-seeding'
import Permission from '../entities/permission'
import * as Faker from 'faker'

define(Permission, (faker: typeof Faker, settings: { name: string }): Permission => {
  const permission = new Permission()
  permission.name = settings.name

  return permission
})
