import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Profile } from './profile.entity'
import { Attachment } from './attachment.entity'

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Profile, (profile) => profile.id)
  @JoinColumn({ name: 'profile_id', referencedColumnName: 'id' })
  profile: Profile

  @Column()
  title: string

  @Column({ unique: true })
  path: string

  @Column()
  content: string

  @Column({ nullable: true })
  description: string

  @ManyToOne(() => Attachment, (attachment) => attachment.id)
  @JoinColumn({ name: 'thumbnail_attachment_id', referencedColumnName: 'id' })
  thumbnail_attachment: Attachment

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn({ nullable: true })
  updated_at: Date

  @Column({ nullable: true, type: 'bigint' })
  archived_at: number

  @Column()
  published_at: Date

  thumbnail: string
}
