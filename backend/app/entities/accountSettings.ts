import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('accountSettings')
export class AccountSettings extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    active: boolean
}

export default AccountSettings
