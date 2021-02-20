import { Factory, Seeder } from 'typeorm-seeding';
import post from '../entity/post';

export default class CreatePost implements Seeder {
    public async run(factory: Factory): Promise<any> {
        await factory(post)().createMany(10);
    }
}