import { NextFunction, Request, Response } from "express";
import DeleteArtistService from "../services/DeleteArtistService";
import CreateArtistService from "../services/CreateArtistService";
import ShowArtistService from "../services/ShowArtistService";
import ListArtistService from "../services/ListArtistService";
import UpdateArtistService from "../services/UpdateArtistService";

export default class ArtistsController {
    public async index(
      request: Request,
      response: Response,
      next: NextFunction
    ): Promise<Response> {
      try {
        const listArtists = new ListArtistService();
        const artists = await listArtists.execute();
        return response.json(artists);
      } catch (err) {
        next(err);
        return response;
      }
    }

    public async show(
      request: Request,
      response: Response,
      next: NextFunction
    ): Promise<Response> {
      try {
        const id = request.params.id as string;
        const showArtist = new ShowArtistService();
        const artist = await showArtist.execute({ id });
        return response.json(artist);
      } catch (err) {
        next(err);
        return response;
      }
    }

    public async create(
      request: Request,
      response: Response,
      next: NextFunction
    ): Promise<Response> {
      try {
        const { name, biography, nationality, birth_year, death_year } = request.body;
        const createArtist = new CreateArtistService();
        const artist = await createArtist.execute({
          name,
          biography,
          nationality,
          birth_year,
          death_year,
        });
        return response.status(201).json(artist);
      } catch (err) {
        next(err);
        return response;
      }
    }

    public async update(
      request: Request,
      response: Response,
      next: NextFunction
    ): Promise<Response> {
      try {
        const { name, biography, nationality, birth_year, death_year } = request.body;
        const id = request.params.id as string;
        const updateArtist = new UpdateArtistService();
        const artist = await updateArtist.execute({
          id,
          name,
          biography,
          nationality,
          birth_year,
          death_year,
        });
        return response.json(artist);
      } catch (err) {
        next(err);
        return response;
      }
    }

    public async delete(
      request: Request,
      response: Response,
      next: NextFunction
    ): Promise<Response> {
      try {
        const id = request.params.id as string;
        const deleteArtist = new DeleteArtistService();
        await deleteArtist.execute({ id });
        return response.status(204).send();
      } catch (err) {
        next(err);
        return response;
      }
    }
}
