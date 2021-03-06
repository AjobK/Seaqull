import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import User from './user'

@Entity('post')
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User

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