import { define } from 'typeorm-seeding';
import { title } from '../entity/title';

define(title, () => {
    const titleFake = new title();

    titleFake.created_at = new Date();
    titleFake.name = 'hachling';
    return titleFake;
});
