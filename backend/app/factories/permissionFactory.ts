import { define } from 'typeorm-seeding'
import Permission from '../entity/permission'
import * as Faker from 'faker'

define(Permission, (faker: typeof Faker, settings: { name: string }): Permission => {
    const perm = new Permission()

    perm.name = settings.name

    return perm
})