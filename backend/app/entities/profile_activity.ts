import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm'
import Profile from './profile'

@Entity('profile_activity')
export class ProfileActivity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Profile, Profile => Profile.id)
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

export default ProfileActivity
