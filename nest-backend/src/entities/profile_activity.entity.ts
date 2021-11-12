import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm'
import { Profile } from './profile.entity'

@Entity('profile_activity')
export class ProfileActivity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Profile, (Profile) => Profile.id)
    @JoinColumn({ name: 'profile_id', referencedColumnName: 'id' })
    profile_id: number

    @Column()
    previous_password: string

    @Column()
    type: string

    @Column()
    ip_adres: string

    @CreateDateColumn()
    created_at: Date
}
