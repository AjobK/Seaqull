import { define, factory } from 'typeorm-seeding';
import { post } from '../entity/post';
import * as Faker from 'faker';
import user from '../entity/user';

define(post, (faker: typeof Faker) => {
    const postFake = new post();

    const createdAccount = factory(user)() as any;

    postFake.user_id = createdAccount.id;
    postFake.content = faker.lorem.paragraphs(3);
    postFake.description = faker.lorem.sentence(~~(Math.random() * 7) + 3);
    postFake.title = faker.lorem.sentence(~~(Math.random() * 4) + 2);
    postFake.path = faker.random.uuid();

    const today = new Date();

    postFake.created_at = today;
    postFake.published_at = today;
    return postFake;
});
