import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateArtworks1700000000004 implements MigrationInterface {
    name = 'CreateArtworks1700000000004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "artworks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "year_created" integer NOT NULL, "dimensions" character varying NOT NULL, "materials" character varying NOT NULL, "artist_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e452ea65fb5958274badfe245de" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "artworks" ADD CONSTRAINT "FK_artworks_artist" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artworks" DROP CONSTRAINT "FK_artworks_artist"`);
        await queryRunner.query(`DROP TABLE "artworks"`);
    }

}
