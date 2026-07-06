import { Repository } from "typeorm";
import Artist from "../entities/Artist";
import { AppDataSource } from "src/shared/typeorm/data-source";

export default class ArtistsRepository {
    private ormRepository: Repository<Artist>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(Artist);
    }

    public async findByName(name: string): Promise<Artist | null> {
        return this.ormRepository.findOne({ where: { name } });
    }

    public async findById(id: string): Promise<Artist | null> {
        return this.ormRepository.findOne({ where: { id } });
    }

    public async findByNationality(nationality: string): Promise<Artist[] | null> {
        return this.ormRepository.find({ where: { nationality } });
    }

    public async findAll(): Promise<Artist[]> {
        return this.ormRepository.find();
    }

    public async createArtist(
        artistData: Partial<Artist>
    ): Promise<Artist> {
        const artist = this.ormRepository.create(artistData);
        await this.ormRepository.save(artist);
        return artist;
    }

    public async save(artist: Artist): Promise<Artist> {
        return await this.ormRepository.save(artist);
    }

    public async remove(artist: Artist): Promise<void> {
        await this.ormRepository.remove(artist);
    }
}
