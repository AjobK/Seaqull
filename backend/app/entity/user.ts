import { OneToOne, BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm'
import { Account } from './account'
import { Title } from './title'

@Entity('user')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Title, title => title.id)
    @JoinColumn({ name: 'title_id', referencedColumnName: 'id' })
    title: Title

    @Column({ nullable: true })
    avatar_attachment: number

    @Column()
    display_name: string

    @Column()
    experience: number

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
export default User