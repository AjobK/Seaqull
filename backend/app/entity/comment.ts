import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    path: string;

    @CreateDateColumn({ nullable: true })
    created_at: Date;

    @UpdateDateColumn({ nullable: true })
    updated_at: Date;

    @Column({ nullable: true })
    archived_at: Date;
}
export default comment;