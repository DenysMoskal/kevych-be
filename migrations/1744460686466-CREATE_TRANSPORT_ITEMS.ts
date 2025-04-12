import { MigrationInterface, QueryRunner } from 'typeorm';

export class CREATETRANSPORTITEMS1744460686466 implements MigrationInterface {
  name = 'CREATETRANSPORTITEMS1744460686466';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."transport_items_type_enum" AS ENUM('station', 'train')`,
    );
    await queryRunner.query(
      `CREATE TABLE "transport_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."transport_items_type_enum" NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c0ac0743b373ce03a22f68f3fff" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "train_schedules" ADD "trainId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "train_schedules" ADD "departureStationId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "train_schedules" ADD "arrivalStationId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "train_schedules" ADD CONSTRAINT "FK_ee196e1c06187714d2e042fac24" FOREIGN KEY ("trainId") REFERENCES "transport_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "train_schedules" ADD CONSTRAINT "FK_6091c13e44425f2ece168dbe89f" FOREIGN KEY ("departureStationId") REFERENCES "transport_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "train_schedules" ADD CONSTRAINT "FK_76464498157c00721e46894d353" FOREIGN KEY ("arrivalStationId") REFERENCES "transport_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "train_schedules" DROP CONSTRAINT "FK_76464498157c00721e46894d353"`,
    );
    await queryRunner.query(
      `ALTER TABLE "train_schedules" DROP CONSTRAINT "FK_6091c13e44425f2ece168dbe89f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "train_schedules" DROP CONSTRAINT "FK_ee196e1c06187714d2e042fac24"`,
    );
    await queryRunner.query(
      `ALTER TABLE "train_schedules" DROP COLUMN "arrivalStationId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "train_schedules" DROP COLUMN "departureStationId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "train_schedules" DROP COLUMN "trainId"`,
    );
    await queryRunner.query(`DROP TABLE "transport_items"`);
    await queryRunner.query(`DROP TYPE "public"."transport_items_type_enum"`);
  }
}
