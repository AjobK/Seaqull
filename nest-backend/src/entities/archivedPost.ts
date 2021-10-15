import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Account } from './account'

@Entity('archivedPost')
export class ArchivedPost extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Account, (account) => account.id)
  @JoinColumn({ name: 'archivist_account_id', referencedColumnName: 'id' })
  archivist: Account

  @Column({ nullable: true, type: 'bigint' })
  archived_at: number
}
