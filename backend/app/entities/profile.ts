import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm'
import Attachment from './attachment'
import { Title } from './title'

@Entity('profile')
export class Profile extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Title, title => title.id)
    @JoinColumn({ name: 'title_id', referencedColumnName: 'id' })
    title: Title

    @ManyToOne(() => Attachment, attachment => attachment.id)
    @JoinColumn({ name: 'avatar_attachment_id', referencedColumnName: 'id' })
    avatar_attachment: Attachment

    @ManyToOne(() => Attachment, attachment => attachment.id)
    @JoinColumn({ name: 'banner_attachment_id', referencedColumnName: 'id' })
    banner_attachment: Attachment

    @Column()
    description: string

    @Column()
    display_name: string

    @Column()
    rows_scrolled: number

    @Column()
    custom_path: string

    @CreateDateColumn({ nullable: true })
    created_at: Date

    @UpdateDateColumn({ nullable: true })
    updated_at: Date

    @Column({ nullable: true })
    archived_at: Date
}

export default Profile
