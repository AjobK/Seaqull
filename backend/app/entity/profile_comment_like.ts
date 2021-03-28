import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import comment from './comment'
import { Profile } from './profile'

@Entity('profile_comment_like')
export class ProfileCommentLike extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @ManyToOne(() => Profile, Profile => Profile.id)
    @JoinColumn({ name: 'Profile', referencedColumnName: 'id' })
    profile: number

    @ManyToOne(() => comment, comment => comment.id)
    @JoinColumn({ name: 'comment_id', referencedColumnName: 'id' })
    comment: comment

    @Column()
    liked_at: Date
}
export default ProfileCommentLike
