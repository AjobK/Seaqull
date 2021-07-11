import { define } from 'typeorm-seeding'
import { Title } from '../entities/title'
import * as Faker from 'faker'

define(Title, (faker: typeof Faker):Title => {
    const titleFake = new Title()
    titleFake.created_at = new Date()
    titleFake.name = faker.name.jobTitle()
    return titleFake
})
