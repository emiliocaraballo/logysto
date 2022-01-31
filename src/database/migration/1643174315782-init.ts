import {MigrationInterface, QueryRunner,Table,TableForeignKey} from "typeorm";

export class init1643174315782 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'sequence',
                    type: 'int',
                    isPrimary: true,
                    generationStrategy: 'increment',
                    isGenerated:true
                },
                {
                    name: "name",
                    type: "varchar",
                    length: "100"
                },
                {
                    name: "lastname",
                    type: "varchar",
                    length: "100"
                },
                {
                    name: "identification",
                    type: "varchar",
                    length: "15"
                },
                {
                    name: "phone",
                    type: "varchar",
                    length: "15",
                    isNullable:true
                },
                {
                    name: "email",
                    type: "varchar",
                    isUnique:true
                },
                {
                    name: "password",
                    type: "varchar"
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }), true)
    }



    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("users");
    }
}
