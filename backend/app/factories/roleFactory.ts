import { define } from 'typeorm-seeding';
import { role } from '../entity/role';

define(role, () => {
    const roleFake = new role();

    roleFake.name = 'gebruiker';
    roleFake.created_at = new Date();
    return roleFake;
});
