import { Factory, Seeder } from 'typeorm-seeding'
import Post from '../entity/post'

export default class CreatePost implements Seeder {
    public async run(factory: Factory): Promise<any> {
        // await factory(Post)().createMany(10)
    }
}