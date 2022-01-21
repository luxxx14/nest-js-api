import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class Translation1641881294355 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "translation",
            columns: [
                {
                    name: "lang",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "key",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "text",
                    type: "varchar",
                    isNullable: true
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
