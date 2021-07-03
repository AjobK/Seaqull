import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import Profile from './profile'

@Entity('setting')
export class Setting extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Profile, Profile => Profile.id)
    @JoinColumn({ name: 'profile_id', referencedColumnName: 'id' })
    profile: Profile

    @Column()
    key: string

    @Column()
    value: string
}

export default Setting
