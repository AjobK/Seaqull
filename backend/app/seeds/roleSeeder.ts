import { Factory, Seeder } from 'typeorm-seeding';
import { role } from '../entity/role';

export default class CreateRole implements Seeder {
    public async run(factory: Factory): Promise<any> {
        await factory(role)().create();
    }
}