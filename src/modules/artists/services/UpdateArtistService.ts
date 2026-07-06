import AppError from "src/shared/errors/AppError";
import Artist from "../typeorm/entities/Artist";
import ArtistsRepository from "../typeorm/repositories/ArtistsRepository";

interface IRequest {
    id: string;
    name: string;
    biography?: string;
    nationality?: string;
    birth_year?: number;
    death_year?: number;
}

export default class UpdateArtistService {
  public async execute({
    id,
    name,
    biography,
    nationality,
    birth_year,
    death_year,
  }: IRequest): Promise<Artist> {
    const artistsRepository = new ArtistsRepository();

    const artist = await artistsRepository.findById(id);
    if (!artist) {
      throw new AppError('Artist not found.');
    }

    const artistExists = await artistsRepository.findByName(name);
    if (artistExists && artistExists.id !== artist.id) {
      throw new AppError('There is already an artist with this name.');
    }

    artist.name = name;
    artist.biography = biography;
    artist.nationality = nationality;
    artist.birth_year = birth_year;
    artist.death_year = death_year;

    await artistsRepository.save(artist);

    return artist;
  }
}
