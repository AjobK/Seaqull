import { Factory, Seeder } from 'typeorm-seeding'

export default class CreatePost implements Seeder {
    public async run(factory: Factory): Promise<any> {
        // await factory(Post)().createMany(10)
    }
}