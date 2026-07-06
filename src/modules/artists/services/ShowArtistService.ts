import AppError from "src/shared/errors/AppError";
import Artist from "../typeorm/entities/Artist";
import ArtistsRepository from "../typeorm/repositories/ArtistsRepository";

interface IRequest {
  id: string;
}

export default class ShowArtistService {
    public async execute({ id }: IRequest): Promise<Artist> {
        const artistsRepository = new ArtistsRepository();

        const artist = await artistsRepository.findById(id);
        if (!artist) {
        throw new AppError('Artist not found.');
        }

        return artist;
    }
}