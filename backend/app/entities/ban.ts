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
    @JoinColumn({ name: 'user_account', referencedColumnName: 'id' })
    user_account: Account

    @Column({ unique: false })
    reason: string

    @Column()
    banned_at: Date

    @Column({ type: 'bigint' })
    banned_to: number

    @Column({ unique: false })
    ip_ban: string
}

export default Ban
