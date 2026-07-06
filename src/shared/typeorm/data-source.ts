import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "node:path";
import Artwork from "src/modules/artworks/typeorm/entities/Artwork";
import Artist from "src/modules/artists/typeorm/entities/Artist";
import User from "src/modules/users/typeorm/entities/User";
import UserToken from "src/modules/users/typeorm/entities/UserToken";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "docker",
    database: "apiartworks",
    synchronize: false,
    logging: true,
    entities: [Artwork, Artist, User, UserToken],
    migrations: [path.join("src", "shared", "typeorm", "migrations", "*.ts")]
});