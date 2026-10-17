import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Rewrite the rows holding the value being dropped, before anything touches
  // the types. The generated cast back into the new enum below is a bare
  // `USING col::enum` with no mapping of its own, so one surviving 'starry'
  // aborts the whole migration — and card 3 defaulted to it, so there are
  // such rows. 'transparent' is what card 3 defaults to now.
  //
  // This runs while the columns are still the old enum, which is the only
  // point at which both the value being read and the value being written are
  // legal for the type.
  await db.execute(sql`
   UPDATE "pages_blocks_archive" SET "long_card_styles_card1" = 'transparent' WHERE "long_card_styles_card1" = 'starry';
  UPDATE "pages_blocks_archive" SET "long_card_styles_card2" = 'transparent' WHERE "long_card_styles_card2" = 'starry';
  UPDATE "pages_blocks_archive" SET "long_card_styles_card3" = 'transparent' WHERE "long_card_styles_card3" = 'starry';
  UPDATE "pages_blocks_archive" SET "long_card_styles_card4" = 'transparent' WHERE "long_card_styles_card4" = 'starry';
  UPDATE "_pages_v_blocks_archive" SET "long_card_styles_card1" = 'transparent' WHERE "long_card_styles_card1" = 'starry';
  UPDATE "_pages_v_blocks_archive" SET "long_card_styles_card2" = 'transparent' WHERE "long_card_styles_card2" = 'starry';
  UPDATE "_pages_v_blocks_archive" SET "long_card_styles_card3" = 'transparent' WHERE "long_card_styles_card3" = 'starry';
  UPDATE "_pages_v_blocks_archive" SET "long_card_styles_card4" = 'transparent' WHERE "long_card_styles_card4" = 'starry';`)

  await db.execute(sql`
   ALTER TABLE "pages_blocks_archive" ALTER COLUMN "long_card_styles_card1" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "long_card_styles_card1" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_pages_blocks_archive_long_card_styles_card1";
  CREATE TYPE "public"."enum_pages_blocks_archive_long_card_styles_card1" AS ENUM('primary', 'secondary', 'transparent');
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "long_card_styles_card1" SET DEFAULT 'primary'::"public"."enum_pages_blocks_archive_long_card_styles_card1";
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "long_card_styles_card1" SET DATA TYPE "public"."enum_pages_blocks_archive_long_card_styles_card1" USING "long_card_styles_card1"::"public"."enum_pages_blocks_archive_long_card_styles_card1";
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "long_card_styles_card2" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "long_card_styles_card2" SET DEFAULT 'secondary'::text;
  DROP TYPE "public"."enum_pages_blocks_archive_long_card_styles_card2";
  CREATE TYPE "public"."enum_pages_blocks_archive_long_card_styles_card2" AS ENUM('primary', 'secondary', 'transparent');
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "long_card_styles_card2" SET DEFAULT 'secondary'::"public"."enum_pages_blocks_archive_long_card_styles_card2";
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "long_card_styles_card2" SET DATA TYPE "public"."enum_pages_blocks_archive_long_card_styles_card2" USING "long_card_styles_card2"::"public"."enum_pages_blocks_archive_long_card_styles_card2";
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "long_card_styles_card3" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "long_card_styles_card3" SET DEFAULT 'transparent'::text;
  DROP TYPE "public"."enum_pages_blocks_archive_long_card_styles_card3";
  CREATE TYPE "public"."enum_pages_blocks_archive_long_card_styles_card3" AS ENUM('primary', 'secondary', 'transparent');
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "long_card_styles_card3" SET DEFAULT 'transparent'::"public"."enum_pages_blocks_archive_long_card_styles_card3";
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "long_card_styles_card3" SET DATA TYPE "public"."enum_pages_blocks_archive_long_card_styles_card3" USING "long_card_styles_card3"::"public"."enum_pages_blocks_archive_long_card_styles_card3";
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "long_card_styles_card4" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "long_card_styles_card4" SET DEFAULT 'secondary'::text;
  DROP TYPE "public"."enum_pages_blocks_archive_long_card_styles_card4";
  CREATE TYPE "public"."enum_pages_blocks_archive_long_card_styles_card4" AS ENUM('primary', 'secondary', 'transparent');
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "long_card_styles_card4" SET DEFAULT 'secondary'::"public"."enum_pages_blocks_archive_long_card_styles_card4";
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "long_card_styles_card4" SET DATA TYPE "public"."enum_pages_blocks_archive_long_card_styles_card4" USING "long_card_styles_card4"::"public"."enum_pages_blocks_archive_long_card_styles_card4";
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "long_card_styles_card1" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "long_card_styles_card1" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum__pages_v_blocks_archive_long_card_styles_card1";
  CREATE TYPE "public"."enum__pages_v_blocks_archive_long_card_styles_card1" AS ENUM('primary', 'secondary', 'transparent');
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "long_card_styles_card1" SET DEFAULT 'primary'::"public"."enum__pages_v_blocks_archive_long_card_styles_card1";
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "long_card_styles_card1" SET DATA TYPE "public"."enum__pages_v_blocks_archive_long_card_styles_card1" USING "long_card_styles_card1"::"public"."enum__pages_v_blocks_archive_long_card_styles_card1";
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "long_card_styles_card2" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "long_card_styles_card2" SET DEFAULT 'secondary'::text;
  DROP TYPE "public"."enum__pages_v_blocks_archive_long_card_styles_card2";
  CREATE TYPE "public"."enum__pages_v_blocks_archive_long_card_styles_card2" AS ENUM('primary', 'secondary', 'transparent');
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "long_card_styles_card2" SET DEFAULT 'secondary'::"public"."enum__pages_v_blocks_archive_long_card_styles_card2";
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "long_card_styles_card2" SET DATA TYPE "public"."enum__pages_v_blocks_archive_long_card_styles_card2" USING "long_card_styles_card2"::"public"."enum__pages_v_blocks_archive_long_card_styles_card2";
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "long_card_styles_card3" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "long_card_styles_card3" SET DEFAULT 'transparent'::text;
  DROP TYPE "public"."enum__pages_v_blocks_archive_long_card_styles_card3";
  CREATE TYPE "public"."enum__pages_v_blocks_archive_long_card_styles_card3" AS ENUM('primary', 'secondary', 'transparent');
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "long_card_styles_card3" SET DEFAULT 'transparent'::"public"."enum__pages_v_blocks_archive_long_card_styles_card3";
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "long_card_styles_card3" SET DATA TYPE "public"."enum__pages_v_blocks_archive_long_card_styles_card3" USING "long_card_styles_card3"::"public"."enum__pages_v_blocks_archive_long_card_styles_card3";
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "long_card_styles_card4" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "long_card_styles_card4" SET DEFAULT 'secondary'::text;
  DROP TYPE "public"."enum__pages_v_blocks_archive_long_card_styles_card4";
  CREATE TYPE "public"."enum__pages_v_blocks_archive_long_card_styles_card4" AS ENUM('primary', 'secondary', 'transparent');
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "long_card_styles_card4" SET DEFAULT 'secondary'::"public"."enum__pages_v_blocks_archive_long_card_styles_card4";
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "long_card_styles_card4" SET DATA TYPE "public"."enum__pages_v_blocks_archive_long_card_styles_card4" USING "long_card_styles_card4"::"public"."enum__pages_v_blocks_archive_long_card_styles_card4";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_archive_long_card_styles_card1" ADD VALUE 'starry' BEFORE 'transparent';
  ALTER TYPE "public"."enum_pages_blocks_archive_long_card_styles_card2" ADD VALUE 'starry' BEFORE 'transparent';
  ALTER TYPE "public"."enum_pages_blocks_archive_long_card_styles_card3" ADD VALUE 'starry' BEFORE 'transparent';
  ALTER TYPE "public"."enum_pages_blocks_archive_long_card_styles_card4" ADD VALUE 'starry' BEFORE 'transparent';
  ALTER TYPE "public"."enum__pages_v_blocks_archive_long_card_styles_card1" ADD VALUE 'starry' BEFORE 'transparent';
  ALTER TYPE "public"."enum__pages_v_blocks_archive_long_card_styles_card2" ADD VALUE 'starry' BEFORE 'transparent';
  ALTER TYPE "public"."enum__pages_v_blocks_archive_long_card_styles_card3" ADD VALUE 'starry' BEFORE 'transparent';
  ALTER TYPE "public"."enum__pages_v_blocks_archive_long_card_styles_card4" ADD VALUE 'starry' BEFORE 'transparent';
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "long_card_styles_card3" SET DEFAULT 'starry';
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "long_card_styles_card4" SET DEFAULT 'transparent';
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "long_card_styles_card3" SET DEFAULT 'starry';
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "long_card_styles_card4" SET DEFAULT 'transparent';`)
}
