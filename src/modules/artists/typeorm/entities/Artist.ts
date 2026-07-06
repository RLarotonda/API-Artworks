import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('artists')
export default class Artist {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column({ type: 'text', nullable: true })
    biography: string;
    @Column({ nullable: true })
    nationality: string;
    @Column({ type: 'int', nullable: true })
    birth_year: number;
    @Column({ type: 'int', nullable: true })
    death_year: number;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}
