import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import Artist from '../../../artists/typeorm/entities/Artist';

@Entity('artworks')
export default class Artwork {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column('int')
    year_created: number;
    @Column()
    dimensions: string;
    @Column()
    materials: string;
    @Column()
    artist_id: string;
    @ManyToOne(() => Artist)
    @JoinColumn({ name: 'artist_id' })
    artist: Artist;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}
