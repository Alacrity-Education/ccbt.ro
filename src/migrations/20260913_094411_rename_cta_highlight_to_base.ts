import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Renames the CTA's "highlight" variant to "base", and drops the title, subtitle
 * and enable_motif columns it no longer has (the heading is rich text now and the
 * motif is not optional).
 *
 * The generated cast into the rebuilt enum fails outright on any row still saying
 * 'highlight' — which is every existing block of this kind — so the value is
 * migrated before each cast, and back again on the way down.
 */
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_cta" ALTER COLUMN "variant" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_cta_variant";
  CREATE TYPE "public"."enum_pages_blocks_cta_variant" AS ENUM('primary', 'secondary', 'background', 'base');
  UPDATE "pages_blocks_cta" SET "variant" = 'base' WHERE "variant" = 'highlight';
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "variant" SET DATA TYPE "public"."enum_pages_blocks_cta_variant" USING "variant"::"public"."enum_pages_blocks_cta_variant";
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "variant" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_cta_variant";
  CREATE TYPE "public"."enum__pages_v_blocks_cta_variant" AS ENUM('primary', 'secondary', 'background', 'base');
  UPDATE "_pages_v_blocks_cta" SET "variant" = 'base' WHERE "variant" = 'highlight';
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "variant" SET DATA TYPE "public"."enum__pages_v_blocks_cta_variant" USING "variant"::"public"."enum__pages_v_blocks_cta_variant";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "subtitle";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "enable_motif";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "subtitle";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "enable_motif";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_cta" ALTER COLUMN "variant" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_cta_variant";
  CREATE TYPE "public"."enum_pages_blocks_cta_variant" AS ENUM('primary', 'secondary', 'background', 'highlight');
  UPDATE "pages_blocks_cta" SET "variant" = 'highlight' WHERE "variant" = 'base';
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "variant" SET DATA TYPE "public"."enum_pages_blocks_cta_variant" USING "variant"::"public"."enum_pages_blocks_cta_variant";
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "variant" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_cta_variant";
  CREATE TYPE "public"."enum__pages_v_blocks_cta_variant" AS ENUM('primary', 'secondary', 'background', 'highlight');
  UPDATE "_pages_v_blocks_cta" SET "variant" = 'highlight' WHERE "variant" = 'base';
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "variant" SET DATA TYPE "public"."enum__pages_v_blocks_cta_variant" USING "variant"::"public"."enum__pages_v_blocks_cta_variant";
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "enable_motif" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "enable_motif" boolean DEFAULT false;`)
}
