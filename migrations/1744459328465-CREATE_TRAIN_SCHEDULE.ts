import { MigrationInterface, QueryRunner } from 'typeorm';

export class CREATETRAINSCHEDULE1744459328465 implements MigrationInterface {
  name = 'CREATETRAINSCHEDULE1744459328465';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "train_schedules" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "trainNumber" character varying NOT NULL, "departureStation" character varying NOT NULL, "arrivalStation" character varying NOT NULL, "departureTime" TIMESTAMP NOT NULL, "arrivalTime" TIMESTAMP NOT NULL, "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cd164af74c504547134d7b2819b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "train_schedules" ADD CONSTRAINT "FK_6bb517e20e43cfc4099ec1dc042" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "train_schedules" DROP CONSTRAINT "FK_6bb517e20e43cfc4099ec1dc042"`,
    );
    await queryRunner.query(`DROP TABLE "train_schedules"`);
  }
}
