import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm'
import user from './user'

@Entity('user_activity')
export class UserActivity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => user, user => user.id)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user_id: number

    @Column()
    previos_password: string

    @Column()
    type: string

    @Column()
    ip_adres: string

    @CreateDateColumn()
    created_at: Date
}
export default UserActivity