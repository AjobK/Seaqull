import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('account_settings')
export class AccountSettings extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true, type: 'bigint' })
    active: number
}

export default AccountSettings
