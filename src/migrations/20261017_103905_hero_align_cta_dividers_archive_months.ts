import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_align" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_version_hero_align" AS ENUM('left', 'right');
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "show_dividers" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_archive" ADD COLUMN "group_by_date" boolean DEFAULT true;
  ALTER TABLE "pages" ADD COLUMN "hero_align" "enum_pages_hero_align" DEFAULT 'left';
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "show_dividers" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN "group_by_date" boolean DEFAULT true;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_align" "enum__pages_v_version_hero_align" DEFAULT 'left';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_cta" DROP COLUMN "show_dividers";
  ALTER TABLE "pages_blocks_archive" DROP COLUMN "group_by_date";
  ALTER TABLE "pages" DROP COLUMN "hero_align";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "show_dividers";
  ALTER TABLE "_pages_v_blocks_archive" DROP COLUMN "group_by_date";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_align";
  DROP TYPE "public"."enum_pages_hero_align";
  DROP TYPE "public"."enum__pages_v_version_hero_align";`)
}
