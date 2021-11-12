import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Profile } from './profile.entity'
import { Title } from './title.entity'

@Entity('title_owned_by')
export class TitleOwnedBy {
    @PrimaryColumn()
    id: number

    @ManyToOne(() => Profile, (Profile) => Profile.id)
    @JoinColumn({ name: 'profile_id', referencedColumnName: 'id' })
    profile: Profile

    @ManyToOne(() => Title, (title) => title.id)
    @JoinColumn({ name: 'title_id', referencedColumnName: 'id' })
    title: Title
}
