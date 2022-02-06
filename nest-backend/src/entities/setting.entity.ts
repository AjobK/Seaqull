import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Profile } from './profile.entity'

@Entity('setting')
export class Setting {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Profile, (Profile) => Profile.id)
    @JoinColumn({ name: 'profile_id', referencedColumnName: 'id' })
    profile: Profile

    @Column()
    key: string

    @Column()
    value: string
}
