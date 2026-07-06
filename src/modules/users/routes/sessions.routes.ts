import { Router } from "express";
import SessionsController from "../controllers/SessionController";
import { celebrate, Segments, Joi } from "celebrate";

const router = Router();
const controller = new SessionsController();
router.post('/', celebrate({
    [Segments.BODY]: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    },
}), async (req, res, next) => {
    try {
        await controller.create(req, res, next);
    } catch (err) {
        next(err);
    }
});
export default router;