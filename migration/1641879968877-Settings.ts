import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class Settings1641879968877 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "settings",
            columns: [
                {
                    name: "id",
                    type: "serial",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "label",
                    type: "varchar",
                },
                {
                    name: "value",
                    type: "varchar",
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
