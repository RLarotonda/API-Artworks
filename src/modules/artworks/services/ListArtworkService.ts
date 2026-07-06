import { AppDataSource } from "src/shared/typeorm/data-source";
import Artwork from "../typeorm/entities/Artwork";

export default class ListArtworkService {
    public async execute(): Promise<Artwork[]> {
        const artworksRepository = AppDataSource.getRepository(Artwork);
        return artworksRepository.find();
    }
}