import Artist from "../typeorm/entities/Artist";
import ArtistsRepository from "../typeorm/repositories/ArtistsRepository";

export default class ListArtistService {
    public async execute(): Promise<Artist[]> {
        const artistsRepository = new ArtistsRepository();

        const artists = await artistsRepository.findAll();

        return artists;
    }
}