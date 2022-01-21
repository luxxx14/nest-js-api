import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class Roles1641379432587 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "roles",
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
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
