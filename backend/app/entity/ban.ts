import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { account } from './account'

@Entity()
export class ban extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => account, account => account.id)
    @JoinColumn({ name: 'staff_account_id', referencedColumnName: 'id' })
    staff_account: account

    @OneToOne(() => account)
    user_account: account

    @Column()
    reason: string

    @Column()
    description: string

    @Column()
    banned_at: Date

    @Column()
    banned_to: Date

    @Column()
    ip_ban: number
}
export default ban