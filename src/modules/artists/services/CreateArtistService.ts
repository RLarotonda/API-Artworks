import AppError from "src/shared/errors/AppError";
import Artist from "../typeorm/entities/Artist";
import ArtistsRepository from "../typeorm/repositories/ArtistsRepository";

interface IRequest {
    name: string;
    biography?: string;
    nationality?: string;
    birth_year?: number;
    death_year?: number;
}

export default class CreateArtistService {
    public async execute({
        name,
        biography,
        nationality,
        birth_year,
        death_year,
    }: IRequest): Promise<Artist> {
        const artistsRepository = new ArtistsRepository();

        const artistExists = await artistsRepository.findByName(name);
        if (artistExists) {
            throw new AppError("This artist appears to already be in the system.");
        }

        const artist = await artistsRepository.createArtist({
            name,
            biography,
            nationality,
            birth_year,
            death_year,
        });

        return artist;
    }
}
