import { Factory, Seeder } from 'typeorm-seeding'
import { Role } from '../entity/role'

export default class CreateRole implements Seeder {
    public async run(factory: Factory): Promise<any> {
        await factory(Role)().create()
    }
}
