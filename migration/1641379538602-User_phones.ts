import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class UserPhones1641379538602 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user_phones",
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
                    name: "contactFirstName",
                    type: "varchar",
                },
                {
                    name: "contactLastName",
                    type: "varchar",
                },
                {
                    name: "contactSurName",
                    type: "varchar",
                },
                {
                    name: "contactPhone",
                    type: "varchar",
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }), true);

        await queryRunner.createForeignKey("user_phones", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
