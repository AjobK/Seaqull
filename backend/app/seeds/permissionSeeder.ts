import { Factory, Seeder } from 'typeorm-seeding'
import Permission from '../entity/permission'

export default class CreatePermission implements Seeder {
    public async run(factory: Factory): Promise<any> {
        const permissions = ['BAN_USERS']

        permissions.forEach( async (perm) => {
            await factory(Permission)({ name: perm }).create()
        })
    }
}