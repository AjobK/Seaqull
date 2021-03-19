import { define, factory } from 'typeorm-seeding'
import { Post } from '../entity/post'
import * as Faker from 'faker'
import Profile from '../entity/profile'

define(Post, (faker: typeof Faker):Post => {
    const postFake = new Post()

    const createdAccount = factory(Profile)() as any

    postFake.profile = createdAccount
    postFake.content = faker.lorem.paragraphs(3)
    postFake.description = faker.lorem.sentence(~~(Math.random() * 7) + 3)
    postFake.title = faker.lorem.sentence(~~(Math.random() * 4) + 2)
    postFake.path = faker.random.uuid()

    const today = new Date()

    postFake.created_at = today
    postFake.published_at = today
    return postFake
})
