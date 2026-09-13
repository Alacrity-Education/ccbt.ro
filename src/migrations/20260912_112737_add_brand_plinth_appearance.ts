import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_hero_slides_cta_link_appearance" ADD VALUE 'brandPlinth' BEFORE 'default';
  ALTER TYPE "public"."enum_pages_blocks_content_columns_link_appearance" ADD VALUE 'brandPlinth' BEFORE 'default';
  ALTER TYPE "public"."enum_pages_hero_cta_link_appearance" ADD VALUE 'brandPlinth' BEFORE 'default';
  ALTER TYPE "public"."enum__pages_v_version_hero_slides_cta_link_appearance" ADD VALUE 'brandPlinth' BEFORE 'default';
  ALTER TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" ADD VALUE 'brandPlinth' BEFORE 'default';
  ALTER TYPE "public"."enum__pages_v_version_hero_cta_link_appearance" ADD VALUE 'brandPlinth' BEFORE 'default';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_hero_slides" ALTER COLUMN "cta_link_appearance" SET DATA TYPE text;
  ALTER TABLE "pages_hero_slides" ALTER COLUMN "cta_link_appearance" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum_pages_hero_slides_cta_link_appearance";
  CREATE TYPE "public"."enum_pages_hero_slides_cta_link_appearance" AS ENUM('brand', 'default', 'primary', 'secondary', 'accent', 'neutral', 'success', 'outline');
  ALTER TABLE "pages_hero_slides" ALTER COLUMN "cta_link_appearance" SET DEFAULT 'brand'::"public"."enum_pages_hero_slides_cta_link_appearance";
  ALTER TABLE "pages_hero_slides" ALTER COLUMN "cta_link_appearance" SET DATA TYPE "public"."enum_pages_hero_slides_cta_link_appearance" USING "cta_link_appearance"::"public"."enum_pages_hero_slides_cta_link_appearance";
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_appearance" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_appearance";
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_appearance" AS ENUM('brand', 'default', 'primary', 'secondary', 'accent', 'neutral', 'success', 'outline');
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_appearance" SET DEFAULT 'brand'::"public"."enum_pages_blocks_content_columns_link_appearance";
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum_pages_blocks_content_columns_link_appearance" USING "link_appearance"::"public"."enum_pages_blocks_content_columns_link_appearance";
  ALTER TABLE "pages" ALTER COLUMN "hero_cta_link_appearance" SET DATA TYPE text;
  ALTER TABLE "pages" ALTER COLUMN "hero_cta_link_appearance" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum_pages_hero_cta_link_appearance";
  CREATE TYPE "public"."enum_pages_hero_cta_link_appearance" AS ENUM('brand', 'default', 'primary', 'secondary', 'accent', 'neutral', 'success', 'outline');
  ALTER TABLE "pages" ALTER COLUMN "hero_cta_link_appearance" SET DEFAULT 'brand'::"public"."enum_pages_hero_cta_link_appearance";
  ALTER TABLE "pages" ALTER COLUMN "hero_cta_link_appearance" SET DATA TYPE "public"."enum_pages_hero_cta_link_appearance" USING "hero_cta_link_appearance"::"public"."enum_pages_hero_cta_link_appearance";
  ALTER TABLE "_pages_v_version_hero_slides" ALTER COLUMN "cta_link_appearance" SET DATA TYPE text;
  ALTER TABLE "_pages_v_version_hero_slides" ALTER COLUMN "cta_link_appearance" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum__pages_v_version_hero_slides_cta_link_appearance";
  CREATE TYPE "public"."enum__pages_v_version_hero_slides_cta_link_appearance" AS ENUM('brand', 'default', 'primary', 'secondary', 'accent', 'neutral', 'success', 'outline');
  ALTER TABLE "_pages_v_version_hero_slides" ALTER COLUMN "cta_link_appearance" SET DEFAULT 'brand'::"public"."enum__pages_v_version_hero_slides_cta_link_appearance";
  ALTER TABLE "_pages_v_version_hero_slides" ALTER COLUMN "cta_link_appearance" SET DATA TYPE "public"."enum__pages_v_version_hero_slides_cta_link_appearance" USING "cta_link_appearance"::"public"."enum__pages_v_version_hero_slides_cta_link_appearance";
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_appearance" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance";
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" AS ENUM('brand', 'default', 'primary', 'secondary', 'accent', 'neutral', 'success', 'outline');
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_appearance" SET DEFAULT 'brand'::"public"."enum__pages_v_blocks_content_columns_link_appearance";
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" USING "link_appearance"::"public"."enum__pages_v_blocks_content_columns_link_appearance";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_cta_link_appearance" SET DATA TYPE text;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_cta_link_appearance" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum__pages_v_version_hero_cta_link_appearance";
  CREATE TYPE "public"."enum__pages_v_version_hero_cta_link_appearance" AS ENUM('brand', 'default', 'primary', 'secondary', 'accent', 'neutral', 'success', 'outline');
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_cta_link_appearance" SET DEFAULT 'brand'::"public"."enum__pages_v_version_hero_cta_link_appearance";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_cta_link_appearance" SET DATA TYPE "public"."enum__pages_v_version_hero_cta_link_appearance" USING "version_hero_cta_link_appearance"::"public"."enum__pages_v_version_hero_cta_link_appearance";`)
}
