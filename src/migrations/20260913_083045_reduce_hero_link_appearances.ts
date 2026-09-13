import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Narrows the hero CTA appearance options to five (see heros/config.ts).
 *
 * The generated cast back into the rebuilt enum fails outright on any row still
 * holding a dropped value — `primary`, `accent`, `neutral` or `success` — which
 * on a database with real hero links would abort the deploy. The UPDATE before
 * each cast folds those to `brand`, the site's standard button. There is no way
 * to preserve them: the option they named no longer exists.
 */
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_hero_slides" ALTER COLUMN "cta_link_appearance" SET DATA TYPE text;
  ALTER TABLE "pages_hero_slides" ALTER COLUMN "cta_link_appearance" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum_pages_hero_slides_cta_link_appearance";
  CREATE TYPE "public"."enum_pages_hero_slides_cta_link_appearance" AS ENUM('brand', 'brandPlinth', 'default', 'secondary', 'outline');
  ALTER TABLE "pages_hero_slides" ALTER COLUMN "cta_link_appearance" SET DEFAULT 'brand'::"public"."enum_pages_hero_slides_cta_link_appearance";
  UPDATE "pages_hero_slides" SET "cta_link_appearance" = 'brand' WHERE "cta_link_appearance" IS NOT NULL AND "cta_link_appearance" NOT IN ('brand', 'brandPlinth', 'default', 'secondary', 'outline');
  ALTER TABLE "pages_hero_slides" ALTER COLUMN "cta_link_appearance" SET DATA TYPE "public"."enum_pages_hero_slides_cta_link_appearance" USING "cta_link_appearance"::"public"."enum_pages_hero_slides_cta_link_appearance";
  ALTER TABLE "pages" ALTER COLUMN "hero_cta_link_appearance" SET DATA TYPE text;
  ALTER TABLE "pages" ALTER COLUMN "hero_cta_link_appearance" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum_pages_hero_cta_link_appearance";
  CREATE TYPE "public"."enum_pages_hero_cta_link_appearance" AS ENUM('brand', 'brandPlinth', 'default', 'secondary', 'outline');
  ALTER TABLE "pages" ALTER COLUMN "hero_cta_link_appearance" SET DEFAULT 'brand'::"public"."enum_pages_hero_cta_link_appearance";
  UPDATE "pages" SET "hero_cta_link_appearance" = 'brand' WHERE "hero_cta_link_appearance" IS NOT NULL AND "hero_cta_link_appearance" NOT IN ('brand', 'brandPlinth', 'default', 'secondary', 'outline');
  ALTER TABLE "pages" ALTER COLUMN "hero_cta_link_appearance" SET DATA TYPE "public"."enum_pages_hero_cta_link_appearance" USING "hero_cta_link_appearance"::"public"."enum_pages_hero_cta_link_appearance";
  ALTER TABLE "_pages_v_version_hero_slides" ALTER COLUMN "cta_link_appearance" SET DATA TYPE text;
  ALTER TABLE "_pages_v_version_hero_slides" ALTER COLUMN "cta_link_appearance" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum__pages_v_version_hero_slides_cta_link_appearance";
  CREATE TYPE "public"."enum__pages_v_version_hero_slides_cta_link_appearance" AS ENUM('brand', 'brandPlinth', 'default', 'secondary', 'outline');
  ALTER TABLE "_pages_v_version_hero_slides" ALTER COLUMN "cta_link_appearance" SET DEFAULT 'brand'::"public"."enum__pages_v_version_hero_slides_cta_link_appearance";
  UPDATE "_pages_v_version_hero_slides" SET "cta_link_appearance" = 'brand' WHERE "cta_link_appearance" IS NOT NULL AND "cta_link_appearance" NOT IN ('brand', 'brandPlinth', 'default', 'secondary', 'outline');
  ALTER TABLE "_pages_v_version_hero_slides" ALTER COLUMN "cta_link_appearance" SET DATA TYPE "public"."enum__pages_v_version_hero_slides_cta_link_appearance" USING "cta_link_appearance"::"public"."enum__pages_v_version_hero_slides_cta_link_appearance";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_cta_link_appearance" SET DATA TYPE text;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_cta_link_appearance" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum__pages_v_version_hero_cta_link_appearance";
  CREATE TYPE "public"."enum__pages_v_version_hero_cta_link_appearance" AS ENUM('brand', 'brandPlinth', 'default', 'secondary', 'outline');
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_cta_link_appearance" SET DEFAULT 'brand'::"public"."enum__pages_v_version_hero_cta_link_appearance";
  UPDATE "_pages_v" SET "version_hero_cta_link_appearance" = 'brand' WHERE "version_hero_cta_link_appearance" IS NOT NULL AND "version_hero_cta_link_appearance" NOT IN ('brand', 'brandPlinth', 'default', 'secondary', 'outline');
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_cta_link_appearance" SET DATA TYPE "public"."enum__pages_v_version_hero_cta_link_appearance" USING "version_hero_cta_link_appearance"::"public"."enum__pages_v_version_hero_cta_link_appearance";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_hero_slides_cta_link_appearance" ADD VALUE 'primary' BEFORE 'secondary';
  ALTER TYPE "public"."enum_pages_hero_slides_cta_link_appearance" ADD VALUE 'accent' BEFORE 'outline';
  ALTER TYPE "public"."enum_pages_hero_slides_cta_link_appearance" ADD VALUE 'neutral' BEFORE 'outline';
  ALTER TYPE "public"."enum_pages_hero_slides_cta_link_appearance" ADD VALUE 'success' BEFORE 'outline';
  ALTER TYPE "public"."enum_pages_hero_cta_link_appearance" ADD VALUE 'primary' BEFORE 'secondary';
  ALTER TYPE "public"."enum_pages_hero_cta_link_appearance" ADD VALUE 'accent' BEFORE 'outline';
  ALTER TYPE "public"."enum_pages_hero_cta_link_appearance" ADD VALUE 'neutral' BEFORE 'outline';
  ALTER TYPE "public"."enum_pages_hero_cta_link_appearance" ADD VALUE 'success' BEFORE 'outline';
  ALTER TYPE "public"."enum__pages_v_version_hero_slides_cta_link_appearance" ADD VALUE 'primary' BEFORE 'secondary';
  ALTER TYPE "public"."enum__pages_v_version_hero_slides_cta_link_appearance" ADD VALUE 'accent' BEFORE 'outline';
  ALTER TYPE "public"."enum__pages_v_version_hero_slides_cta_link_appearance" ADD VALUE 'neutral' BEFORE 'outline';
  ALTER TYPE "public"."enum__pages_v_version_hero_slides_cta_link_appearance" ADD VALUE 'success' BEFORE 'outline';
  ALTER TYPE "public"."enum__pages_v_version_hero_cta_link_appearance" ADD VALUE 'primary' BEFORE 'secondary';
  ALTER TYPE "public"."enum__pages_v_version_hero_cta_link_appearance" ADD VALUE 'accent' BEFORE 'outline';
  ALTER TYPE "public"."enum__pages_v_version_hero_cta_link_appearance" ADD VALUE 'neutral' BEFORE 'outline';
  ALTER TYPE "public"."enum__pages_v_version_hero_cta_link_appearance" ADD VALUE 'success' BEFORE 'outline';`)
}
