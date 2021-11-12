import { define } from 'typeorm-seeding'
import { Role } from '../../entities/role.entity'
import * as Faker from 'faker'

define(Role, (faker: typeof Faker, settings: { name: string }):Role => {
  const roleFake = new Role()
  roleFake.name = settings.name
  roleFake.created_at = new Date()

  return roleFake
})
