import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Profile } from './profile.entity'

@Entity('profile_followed_by')
export class ProfileFollowedBy {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Profile, (Profile) => Profile.id, { nullable: false })
    @JoinColumn({ name: 'profile_id', referencedColumnName: 'id' })
    profile: number

    @ManyToOne(() => Profile, (Profile) => Profile.id, { nullable: false })
    @JoinColumn({ name: 'follower_id', referencedColumnName: 'id' })
    follower: number
}
