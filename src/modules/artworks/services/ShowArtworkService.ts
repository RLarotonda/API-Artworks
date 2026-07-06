import AppError from "src/shared/errors/AppError";
import { AppDataSource } from "src/shared/typeorm/data-source";
import Artwork from "../typeorm/entities/Artwork";

interface IRequest {
    id: string;
}
export default class ShowArtworkService {
    public async execute({ id }: IRequest): Promise<Artwork> {
        const artworksRepository = AppDataSource.getRepository(Artwork);
        
        const artwork = await artworksRepository.findOneBy({ id });
        if (!artwork) {
            throw new AppError("Artwork not found.");
        }      
        return artwork;
    }
}