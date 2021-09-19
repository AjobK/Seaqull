import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Account } from './account'

@Entity('archivedPost')
export class ArchivedPost extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Account, (account) => account.id)
    @JoinColumn({ name: 'staff_account_id', referencedColumnName: 'id' })
    staff: Account

    @Column({ nullable: true, type: 'bigint' })
    archived_at: number
}

export default ArchivedPost
