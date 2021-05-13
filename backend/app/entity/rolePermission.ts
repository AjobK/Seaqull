import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import Permission from './permission'
import Role from './role'

@Entity('rolePermission')
export class RolePermission extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Role, role => role.id)
    @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
    role: Role

    @ManyToOne(() => Permission, permission => permission.id)
    @JoinColumn({ name: 'permission_id', referencedColumnName: 'id' })
    permission: Permission
}
export default RolePermission