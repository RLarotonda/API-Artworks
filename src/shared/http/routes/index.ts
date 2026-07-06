import { Router } from "express";

import usersRouter from "src/modules/users/routes/users.routes";
import sessionsRouter from "src/modules/users/routes/sessions.routes";
import profileRouter from "src/modules/users/routes/profile.routes";
import passwordRouter from "src/modules/users/routes/password.routes";

import artistsRouter from "src/modules/artists/routes/artist.routes";

import artworksRouter from "src/modules/artworks/routes/artworks.routes";

const routes = Router();

// --- Usuários (espectadores) ---
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);      
routes.use('/profile', profileRouter);
routes.use('/password', passwordRouter);

// --- Artistas ---
routes.use('/artists', artistsRouter);

// --- Obras ---
routes.use('/artworks', artworksRouter);

export default routes;