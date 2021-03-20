import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import Profile from './profile'

@Entity('post')
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Profile, profile => profile.id)
    @JoinColumn({ name: 'profile_id', referencedColumnName: 'id' })
    profile: Profile

    @Column()
    title: string

    @Column({ unique: true })
    path: string

    @Column()
    content: string

    @Column()
    description: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn({ nullable: true })
    updated_at: Date

    @Column({ nullable: true })
    archived_at: Date

    @Column({ nullable: true })
    hidden_at: Date

    @Column()
    published_at: Date
}
export default Post