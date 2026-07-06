import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ArtistsController from '../controllers/ArtistsController';

const artistsRouter = Router();
const artistsController = new ArtistsController();

artistsRouter.get('/', async (req, res, next) => {
  try {
    await artistsController.index(req, res, next);
  } catch (err) {
    next(err);
  }
});

artistsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
  }),
  async (req, res, next) => {
    try {
      await artistsController.show(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);

artistsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      biography: Joi.string().allow('', null),
      nationality: Joi.string().allow('', null),
      birth_year: Joi.number().integer().allow(null),
      death_year: Joi.number().integer().allow(null),
    }
  }),
  async (req, res, next) => {
    try {
      await artistsController.create(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);

artistsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      biography: Joi.string().allow('', null),
      nationality: Joi.string().allow('', null),
      birth_year: Joi.number().integer().allow(null),
      death_year: Joi.number().integer().allow(null),
    },
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
  }),
  async (req, res, next) => {
    try {
      await artistsController.update(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);

artistsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
  }),
  async (req, res, next) => {
    try {
      await artistsController.delete(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);

export default artistsRouter;
