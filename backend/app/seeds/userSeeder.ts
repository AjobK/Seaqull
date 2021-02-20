import { Factory, Seeder } from 'typeorm-seeding';
import user from '../entity/user';

export default class CreateUser implements Seeder {
    public async run(factory: Factory): Promise<any> {
        await factory(user)().create();
    }
}