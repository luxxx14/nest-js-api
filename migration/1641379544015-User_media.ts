import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class UserMedia1641379544015 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user_media",
            columns: [
                {
                    name: "id",
                    type: "serial",
                    isPrimary: true
                },
                {
                    name: "userId",
                    type: "int",
                },
                {
                    name: "filename",
                    type: "varchar",
                },
                {
                    name: "type",
                    type: "enum",
                    enum: ["blog", "avatar", "faceId"],
                    enumName: "media_type_enum",
                    default: "'blog'"
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }), true);

        await queryRunner.createForeignKey("user_media", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
