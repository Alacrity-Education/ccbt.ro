import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_slides_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_hero_slides_cta_link_appearance" AS ENUM('default', 'secondary', 'primary', 'outline');
  CREATE TYPE "public"."enum__pages_v_version_hero_slides_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_hero_slides_cta_link_appearance" AS ENUM('default', 'secondary', 'primary', 'outline');
  ALTER TABLE "pages_hero_slides" ADD COLUMN "cta_enable" boolean DEFAULT false;
  ALTER TABLE "pages_hero_slides" ADD COLUMN "cta_link_type" "enum_pages_hero_slides_cta_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_hero_slides" ADD COLUMN "cta_link_new_tab" boolean;
  ALTER TABLE "pages_hero_slides" ADD COLUMN "cta_link_url" varchar DEFAULT '#';
  ALTER TABLE "pages_hero_slides" ADD COLUMN "cta_link_label" varchar;
  ALTER TABLE "pages_hero_slides" ADD COLUMN "cta_link_appearance" "enum_pages_hero_slides_cta_link_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v_version_hero_slides" ADD COLUMN "cta_enable" boolean DEFAULT false;
  ALTER TABLE "_pages_v_version_hero_slides" ADD COLUMN "cta_link_type" "enum__pages_v_version_hero_slides_cta_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_version_hero_slides" ADD COLUMN "cta_link_new_tab" boolean;
  ALTER TABLE "_pages_v_version_hero_slides" ADD COLUMN "cta_link_url" varchar DEFAULT '#';
  ALTER TABLE "_pages_v_version_hero_slides" ADD COLUMN "cta_link_label" varchar;
  ALTER TABLE "_pages_v_version_hero_slides" ADD COLUMN "cta_link_appearance" "enum__pages_v_version_hero_slides_cta_link_appearance" DEFAULT 'default';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_hero_slides" DROP COLUMN "cta_enable";
  ALTER TABLE "pages_hero_slides" DROP COLUMN "cta_link_type";
  ALTER TABLE "pages_hero_slides" DROP COLUMN "cta_link_new_tab";
  ALTER TABLE "pages_hero_slides" DROP COLUMN "cta_link_url";
  ALTER TABLE "pages_hero_slides" DROP COLUMN "cta_link_label";
  ALTER TABLE "pages_hero_slides" DROP COLUMN "cta_link_appearance";
  ALTER TABLE "_pages_v_version_hero_slides" DROP COLUMN "cta_enable";
  ALTER TABLE "_pages_v_version_hero_slides" DROP COLUMN "cta_link_type";
  ALTER TABLE "_pages_v_version_hero_slides" DROP COLUMN "cta_link_new_tab";
  ALTER TABLE "_pages_v_version_hero_slides" DROP COLUMN "cta_link_url";
  ALTER TABLE "_pages_v_version_hero_slides" DROP COLUMN "cta_link_label";
  ALTER TABLE "_pages_v_version_hero_slides" DROP COLUMN "cta_link_appearance";
  DROP TYPE "public"."enum_pages_hero_slides_cta_link_type";
  DROP TYPE "public"."enum_pages_hero_slides_cta_link_appearance";
  DROP TYPE "public"."enum__pages_v_version_hero_slides_cta_link_type";
  DROP TYPE "public"."enum__pages_v_version_hero_slides_cta_link_appearance";`)
}
