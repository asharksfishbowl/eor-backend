import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRoadmap1234567890000 implements MigrationInterface {
    name = 'CreateRoadmap1234567890000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`roadmap\` (
                \`id\` INT NOT NULL AUTO_INCREMENT,
                \`quarter\` VARCHAR(255) NOT NULL,
                \`goal\` VARCHAR(255) NOT NULL,
                \`complete\` INT NOT NULL DEFAULT 0,
                  PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE \`roadmap\`
        `);
    }
}
