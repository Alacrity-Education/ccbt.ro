import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_slides_object_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum_pages_hero_object_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum__pages_v_version_hero_slides_object_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum__pages_v_version_hero_object_fit" AS ENUM('cover', 'contain');
  ALTER TABLE "pages_hero_slides" ADD COLUMN "object_fit" "enum_pages_hero_slides_object_fit" DEFAULT 'cover';
  ALTER TABLE "pages" ADD COLUMN "hero_object_fit" "enum_pages_hero_object_fit" DEFAULT 'cover';
  ALTER TABLE "_pages_v_version_hero_slides" ADD COLUMN "object_fit" "enum__pages_v_version_hero_slides_object_fit" DEFAULT 'cover';
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_object_fit" "enum__pages_v_version_hero_object_fit" DEFAULT 'cover';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_hero_slides" DROP COLUMN "object_fit";
  ALTER TABLE "pages" DROP COLUMN "hero_object_fit";
  ALTER TABLE "_pages_v_version_hero_slides" DROP COLUMN "object_fit";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_object_fit";
  DROP TYPE "public"."enum_pages_hero_slides_object_fit";
  DROP TYPE "public"."enum_pages_hero_object_fit";
  DROP TYPE "public"."enum__pages_v_version_hero_slides_object_fit";
  DROP TYPE "public"."enum__pages_v_version_hero_object_fit";`)
}
