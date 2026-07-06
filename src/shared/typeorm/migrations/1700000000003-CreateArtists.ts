import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateArtists1700000000003 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'artists',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'biography',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'nationality',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'birth_year',
                        type: 'integer',
                        isNullable: true,
                    },
                    {
                        name: 'death_year',
                        type: 'integer',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('artists');
    }

}
