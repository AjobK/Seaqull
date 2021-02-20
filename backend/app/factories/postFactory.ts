import { define, factory } from 'typeorm-seeding';
import { post } from '../entity/post';
import * as Faker from 'faker';
import user from '../entity/user';

define(post, (faker: typeof Faker) => {
    const postFake = new post();

    const createdAccount = factory(user)() as any;

    postFake.user_id = createdAccount.id;
    postFake.content = 'Dit is een test post';
    postFake.description = 'dit is een beschrijving van de post';
    postFake.title = 'titel van de eerste';
    postFake.path = faker.random.uuid();

    const today = new Date();
    postFake.created_at = today;
    postFake.published_at = today;
    return postFake;
});
