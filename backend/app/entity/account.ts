import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm'
import Role from './role'

@Entity('account')
export class Account extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Role, role => role.id)
    @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
    role: Role

    @Column({ unique: true })
    user_name: string

    @Column({ unique: true })
    email: string

    @Column({ nullable: true })
    email_verified_at: Date

    @Column()
    password: string

    @Column()
    last_ip: string

    @Column({ nullable: true })
    login_attempts_counts: number

    @Column({ nullable: true, type: 'bigint' })
    locked_to: number

    @Column({ nullable: true })
    changed_pw_at: Date
}
export default Account