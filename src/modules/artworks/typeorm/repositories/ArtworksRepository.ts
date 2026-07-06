import { AppDataSource } from "src/shared/typeorm/data-source";
import { Repository } from "typeorm";
import Artwork from "../entities/Artwork";

export default class ArtworksRepository {
    private ormRepository: Repository<Artwork>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(Artwork);
    }

    public async findById(id: string): Promise<Artwork | null> {
        const artwork = await this.ormRepository.findOne({
            where: { id },
        });
        return artwork;
    }
}
