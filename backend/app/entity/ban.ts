import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Account } from './account'

@Entity('ban')
export class Ban extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Account, account => account.id)
    @JoinColumn({ name: 'staff_account_id', referencedColumnName: 'id' })
    staff_account: Account

    @OneToOne(() => Account)
    user_account: Account

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
export default Ban