import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Permission } from './permission.entity'
import { Role } from './role.entity'

@Entity('role_permission')
export class RolePermission {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Role, (role) => role.id)
    @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
    role: Role

    @ManyToOne(() => Permission, (permission) => permission.id)
    @JoinColumn({ name: 'permission_id', referencedColumnName: 'id' })
    permission: Permission
}
