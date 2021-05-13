import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('permission')
export class Permission extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

RolePermission
}
export default Permission