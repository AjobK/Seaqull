import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Profile } from './profile'
import { Title } from './title'

@Entity('title_owned_by')
export class TitleOwnedBy extends BaseEntity {
    @PrimaryColumn()
    id: number

    @ManyToOne(() => Profile, (Profile) => Profile.id)
    @JoinColumn({ name: 'profile_id', referencedColumnName: 'id' })
    profile: Profile

    @ManyToOne(() => Title, (title) => title.id)
    @JoinColumn({ name: 'title_id', referencedColumnName: 'id' })
    title: Title
}
