import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import Profile from './profile'

@Entity('profile_followed_by')
export class ProfileFollowedBy extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Profile, (Profile) => Profile.id, { nullable: false })
    @JoinColumn({ name: 'profile_id', referencedColumnName: 'id' })
    profile: number

    @ManyToOne(() => Profile, (Profile) => Profile.id, { nullable: false })
    @JoinColumn({ name: 'follower_id', referencedColumnName: 'id' })
    follower: number
}

export default ProfileFollowedBy
