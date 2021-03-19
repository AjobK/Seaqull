import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import title from './title'
import Profile from './profile'

@Entity('title_owned_by')
export class TitleOwnedBy extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @ManyToOne(() => Profile, Profile => Profile.id)
    @JoinColumn({ name: 'profile_id', referencedColumnName: 'id' })
    profile: Profile

    @ManyToOne(() => title, title => title.id)
    @JoinColumn({ name: 'title_id', referencedColumnName: 'id' })
    title: title
}
export default TitleOwnedBy