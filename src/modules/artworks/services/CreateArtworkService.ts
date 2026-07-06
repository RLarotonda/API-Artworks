import { AppDataSource } from "src/shared/typeorm/data-source";
import AppError from "src/shared/errors/AppError";
import Artwork from "../typeorm/entities/Artwork";
import ArtistsRepository from "src/modules/artists/typeorm/repositories/ArtistsRepository";

interface IRequest {
    title: string;
    description: string;
    year_created: number;
    dimensions: string;
    materials: string;
    artist_id: string;
}

export default class CreateArtworkService {
    public async execute({ title, description, year_created, dimensions, materials, artist_id }: IRequest): Promise<Artwork> {
        const artworksRepository = AppDataSource.getRepository(Artwork);
        const artistsRepository = new ArtistsRepository();

        const artist = await artistsRepository.findById(artist_id);
        if (!artist) {
            throw new AppError("Artist not found.");
        }

        const artworkExists = await artworksRepository.findOne({ // Restrição composta
            where: {
                title,
                description,
                year_created
            }
        });

        if (artworkExists) {
            throw new AppError("This artwork appears to already be in the system.");
        }

        const artwork = artworksRepository.create({
            title,
            description,
            year_created,
            dimensions,
            materials,
            artist_id,
        });

        await artworksRepository.save(artwork);
        return artwork;
    }
}
