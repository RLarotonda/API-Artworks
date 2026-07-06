import AppError from "src/shared/errors/AppError";
import ArtistsRepository from "../typeorm/repositories/ArtistsRepository";

interface IRequest {
  id: string;
}

export default class DeleteArtistService {
  public async execute({ id }: IRequest): Promise<void> {
    const artistsRepository = new ArtistsRepository();

    const artist = await artistsRepository.findById(id);
    if (!artist) {
      throw new AppError('Artist not found.');
    }

    await artistsRepository.remove(artist);
  }
}
