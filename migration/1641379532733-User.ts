import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class User1641379532733 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                {
                    name: "id",
                    type: "serial",
                    isPrimary: true
                },
                {
                    name: "login",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "loginType",
                    type: "enum",
                    enum: ["phone", "email"],
                    enumName: "login_type_enum",
                    default: "'phone'"
                },
                {
                    name: "password",
                    type: "varchar",
                },
                {
                    name: "firstName",
                    type: "varchar",
                },
                {
                    name: "lastName",
                    type: "varchar",
                },
                {
                    name: "surName",
                    type: "varchar",
                },
                {
                    name: 'birthdayAt',
                    type: 'timestamp',
                    isNullable: false
                },
                {
                    name: "roleId",
                    type: "int",
                    default: 2
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: "lang",
                    type: "enum",
                    enum: ["ru", "kz", "en", "de"],
                    enumName: "lang_enum",
                    default: "'ru'"
                }
            ]
        }), true);

        await queryRunner.createForeignKey("user", new TableForeignKey({
            columnNames: ["roleId"],
            referencedColumnNames: ["id"],
            referencedTableName: "roles",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
