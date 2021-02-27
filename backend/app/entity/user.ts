import { OneToOne, BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm'
import { account } from './account'
import { title } from './title'

@Entity()
export class user extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @OneToOne(() => account)
    @JoinColumn({ name: 'account_id', referencedColumnName: 'id' })
    account_id: number

    @Column()
    @ManyToOne(() => title, title => title.id)
    @JoinColumn({ name: 'title_id', referencedColumnName: 'id' })
    title_id: number

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
export default user