import { Router } from "express";
import ArtworksController from "../controllers/ArtworksController";
import { celebrate, Segments, Joi } from "celebrate";

const artworksRouter = Router();
const artworksController = new ArtworksController();

artworksRouter.get('/', async (req, res, next) => {
    try {
        await artworksController.index(req, res, next);
    } catch (err) {
        next(err);
    }
});

artworksRouter.get('/:id', celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
}), async (req, res, next) => {
    try {
        await artworksController.show(req, res, next);
    } catch (err) {
        next(err);
    }
});

const currentYear = new Date().getFullYear();

artworksRouter.post('/', celebrate({
    [Segments.BODY]: {
        title: Joi.string().required(),
        description: Joi.string().required(),
        year_created: Joi.number().max(currentYear).required(),
        dimensions: Joi.string().required(),
        materials: Joi.string().required(),
        artist_id: Joi.string().uuid().required(),
    }
}), async (req, res, next) => {
    try {
        await artworksController.create(req, res, next);
    } catch (err) {
        next(err);
    }
});

artworksRouter.put('/:id', celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    [Segments.BODY]: {
        title: Joi.string().required(),
        description: Joi.string().required(),
        year_created: Joi.number().max(currentYear).required(),
        dimensions: Joi.string().required(),
        materials: Joi.string().required(),
    }
}), async (req, res, next) => {
    try {
        await artworksController.update(req, res, next);
    } catch (err) {
        next(err);
    }
});

artworksRouter.delete('/:id', celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
}), async (req, res, next) => {
    try {
        await artworksController.delete(req, res, next);
    } catch (err) {
        next(err);
    }
});

export default artworksRouter;
