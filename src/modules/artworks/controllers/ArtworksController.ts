import { Request, Response, NextFunction } from "express";

import ListArtworkService from "../services/ListArtworkService";
import ShowArtworkService from "../services/ShowArtworkService";
import CreateArtworkService from "../services/CreateArtworkService";
import UpdateArtworkService from "../services/UpdateArtworkService";
import DeleteArtworkService from "../services/DeleteArtworkService";

export default class ArtworksController {
    public async index(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<Response | void> {
        try {
            const listArtworks = new ListArtworkService();
            const artworks = await listArtworks.execute();

            return response.json(artworks);
        } catch (err) {
            next(err);
        }
    }

    public async show(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<Response | void> {
        try {
            const id = request.params.id as string;
            const showArtwork = new ShowArtworkService();
            const artwork = await showArtwork.execute({ id });

            return response.json(artwork);
        } catch (err) {
            next(err);
        }
    }

    public async create(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<Response | void> {
        try {
            const { title, description, year_created, dimensions, materials, artist_id } = request.body;

            const createArtwork = new CreateArtworkService();
            const artwork = await createArtwork.execute({
                title,
                description,
                year_created,
                dimensions,
                materials,
                artist_id,
            });

            return response.status(201).json(artwork);
        } catch (err) {
            next(err);
        }
    }

    public async update(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<Response | void> {
        try {
            const id = request.params.id as string;
            const { title, description, year_created, dimensions, materials } = request.body;

            const updateArtwork = new UpdateArtworkService();
            const artwork = await updateArtwork.execute({
                id,
                title,
                description,
                year_created,
                dimensions,
                materials,
            });

            return response.json(artwork);
        } catch (err) {
            next(err);
        }
    }

    public async delete(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<Response | void> {
        try {
            const id = request.params.id as string;
            const deleteArtwork = new DeleteArtworkService();
            await deleteArtwork.execute({ id });
            return response.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}
