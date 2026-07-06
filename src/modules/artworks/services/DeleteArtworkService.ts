import AppError from "src/shared/errors/AppError";
import { AppDataSource } from "src/shared/typeorm/data-source";
import Artwork from "../typeorm/entities/Artwork";

interface IRequest {
    id: string;
}

export default class DeleteArtworkService {
    public async execute({ id }: IRequest): Promise<void> {
        const artworksRepository = AppDataSource.getRepository(Artwork);

        const artwork = await artworksRepository.findOneBy({ id });

        if (!artwork) {
            throw new AppError("Artwork not found.");
        }

        await artworksRepository.remove(artwork);
    }
}
