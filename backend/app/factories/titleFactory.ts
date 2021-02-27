import { define } from 'typeorm-seeding'
import { title } from '../entity/title'

define(title, () => {
    const titleFake = new title()

    titleFake.id = 1
    titleFake.created_at = new Date()
    titleFake.name = 'hatchling'
    return titleFake
})
