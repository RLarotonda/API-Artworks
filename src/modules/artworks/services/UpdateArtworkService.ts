import { AppDataSource } from "src/shared/typeorm/data-source";
import Artwork from "../typeorm/entities/Artwork";
import AppError from "src/shared/errors/AppError";

interface IRequest {
    id: string;
    title: string;
    description: string;
    year_created: number;
    dimensions: string;
    materials: string;
}

export default class UpdateArtworkService {
    public async execute({ id, title, description, year_created, dimensions, materials }: IRequest): Promise<Artwork> {
        const artworksRepository = AppDataSource.getRepository(Artwork);
        const artwork = await artworksRepository.findOneBy({ id });

        if (!artwork) {
            throw new AppError("Artwork not found.");
        }

        const artworkExists = await artworksRepository.findOne({
            where: {
                title,
                description,
                year_created
            }
        });

        if (artworkExists && artworkExists.id != artwork.id) {
            throw new AppError("This artwork appears to already be in the system.");
        }

        artwork.title = title;
        artwork.description = description;
        artwork.year_created = year_created;
        artwork.dimensions = dimensions;
        artwork.materials = materials;

        await artworksRepository.save(artwork);
        return artwork;
    }
}
