import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_posts_hero_slides_overlay_color" AS ENUM('base', 'purple', 'coral', 'cyan', 'none');
  CREATE TYPE "public"."enum__posts_v_version_hero_slides_overlay_color" AS ENUM('base', 'purple', 'coral', 'cyan', 'none');
  ALTER TYPE "public"."enum_pages_hero_slides_color" ADD VALUE 'none';
  ALTER TYPE "public"."enum_pages_hero_bg_color" ADD VALUE 'none';
  ALTER TYPE "public"."enum__pages_v_version_hero_slides_color" ADD VALUE 'none';
  ALTER TYPE "public"."enum__pages_v_version_hero_bg_color" ADD VALUE 'none';
  ALTER TYPE "public"."enum_posts_hero_overlay_color" ADD VALUE 'none';
  ALTER TYPE "public"."enum__posts_v_version_hero_overlay_color" ADD VALUE 'none';
  CREATE TABLE "posts_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"media_mobile_id" integer,
  	"overlay_color" "enum_posts_hero_slides_overlay_color" DEFAULT 'purple'
  );
  
  CREATE TABLE "_posts_v_version_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"media_mobile_id" integer,
  	"overlay_color" "enum__posts_v_version_hero_slides_overlay_color" DEFAULT 'purple',
  	"_uuid" varchar
  );
  
  ALTER TABLE "posts" ADD COLUMN "hero_slide_timeout" numeric DEFAULT 6000;
  ALTER TABLE "_posts_v" ADD COLUMN "version_hero_slide_timeout" numeric DEFAULT 6000;
  ALTER TABLE "posts_hero_slides" ADD CONSTRAINT "posts_hero_slides_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_hero_slides" ADD CONSTRAINT "posts_hero_slides_media_mobile_id_media_id_fk" FOREIGN KEY ("media_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_hero_slides" ADD CONSTRAINT "posts_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_hero_slides" ADD CONSTRAINT "_posts_v_version_hero_slides_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_version_hero_slides" ADD CONSTRAINT "_posts_v_version_hero_slides_media_mobile_id_media_id_fk" FOREIGN KEY ("media_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_version_hero_slides" ADD CONSTRAINT "_posts_v_version_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_hero_slides_order_idx" ON "posts_hero_slides" USING btree ("_order");
  CREATE INDEX "posts_hero_slides_parent_id_idx" ON "posts_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "posts_hero_slides_media_idx" ON "posts_hero_slides" USING btree ("media_id");
  CREATE INDEX "posts_hero_slides_media_mobile_idx" ON "posts_hero_slides" USING btree ("media_mobile_id");
  CREATE INDEX "_posts_v_version_hero_slides_order_idx" ON "_posts_v_version_hero_slides" USING btree ("_order");
  CREATE INDEX "_posts_v_version_hero_slides_parent_id_idx" ON "_posts_v_version_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_hero_slides_media_idx" ON "_posts_v_version_hero_slides" USING btree ("media_id");
  CREATE INDEX "_posts_v_version_hero_slides_media_mobile_idx" ON "_posts_v_version_hero_slides" USING btree ("media_mobile_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "posts_hero_slides" CASCADE;
  DROP TABLE "_posts_v_version_hero_slides" CASCADE;
  ALTER TABLE "pages_hero_slides" ALTER COLUMN "color" SET DATA TYPE text;
  ALTER TABLE "pages_hero_slides" ALTER COLUMN "color" SET DEFAULT 'purple'::text;
  DROP TYPE "public"."enum_pages_hero_slides_color";
  CREATE TYPE "public"."enum_pages_hero_slides_color" AS ENUM('purple', 'coral', 'cyan');
  ALTER TABLE "pages_hero_slides" ALTER COLUMN "color" SET DEFAULT 'purple'::"public"."enum_pages_hero_slides_color";
  ALTER TABLE "pages_hero_slides" ALTER COLUMN "color" SET DATA TYPE "public"."enum_pages_hero_slides_color" USING "color"::"public"."enum_pages_hero_slides_color";
  ALTER TABLE "pages" ALTER COLUMN "hero_bg_color" SET DATA TYPE text;
  ALTER TABLE "pages" ALTER COLUMN "hero_bg_color" SET DEFAULT 'base'::text;
  DROP TYPE "public"."enum_pages_hero_bg_color";
  CREATE TYPE "public"."enum_pages_hero_bg_color" AS ENUM('base', 'purple', 'coral', 'cyan');
  ALTER TABLE "pages" ALTER COLUMN "hero_bg_color" SET DEFAULT 'base'::"public"."enum_pages_hero_bg_color";
  ALTER TABLE "pages" ALTER COLUMN "hero_bg_color" SET DATA TYPE "public"."enum_pages_hero_bg_color" USING "hero_bg_color"::"public"."enum_pages_hero_bg_color";
  ALTER TABLE "_pages_v_version_hero_slides" ALTER COLUMN "color" SET DATA TYPE text;
  ALTER TABLE "_pages_v_version_hero_slides" ALTER COLUMN "color" SET DEFAULT 'purple'::text;
  DROP TYPE "public"."enum__pages_v_version_hero_slides_color";
  CREATE TYPE "public"."enum__pages_v_version_hero_slides_color" AS ENUM('purple', 'coral', 'cyan');
  ALTER TABLE "_pages_v_version_hero_slides" ALTER COLUMN "color" SET DEFAULT 'purple'::"public"."enum__pages_v_version_hero_slides_color";
  ALTER TABLE "_pages_v_version_hero_slides" ALTER COLUMN "color" SET DATA TYPE "public"."enum__pages_v_version_hero_slides_color" USING "color"::"public"."enum__pages_v_version_hero_slides_color";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_bg_color" SET DATA TYPE text;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_bg_color" SET DEFAULT 'base'::text;
  DROP TYPE "public"."enum__pages_v_version_hero_bg_color";
  CREATE TYPE "public"."enum__pages_v_version_hero_bg_color" AS ENUM('base', 'purple', 'coral', 'cyan');
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_bg_color" SET DEFAULT 'base'::"public"."enum__pages_v_version_hero_bg_color";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_bg_color" SET DATA TYPE "public"."enum__pages_v_version_hero_bg_color" USING "version_hero_bg_color"::"public"."enum__pages_v_version_hero_bg_color";
  ALTER TABLE "posts" ALTER COLUMN "hero_overlay_color" SET DATA TYPE text;
  ALTER TABLE "posts" ALTER COLUMN "hero_overlay_color" SET DEFAULT 'purple'::text;
  DROP TYPE "public"."enum_posts_hero_overlay_color";
  CREATE TYPE "public"."enum_posts_hero_overlay_color" AS ENUM('base', 'purple', 'coral', 'cyan');
  ALTER TABLE "posts" ALTER COLUMN "hero_overlay_color" SET DEFAULT 'purple'::"public"."enum_posts_hero_overlay_color";
  ALTER TABLE "posts" ALTER COLUMN "hero_overlay_color" SET DATA TYPE "public"."enum_posts_hero_overlay_color" USING "hero_overlay_color"::"public"."enum_posts_hero_overlay_color";
  ALTER TABLE "_posts_v" ALTER COLUMN "version_hero_overlay_color" SET DATA TYPE text;
  ALTER TABLE "_posts_v" ALTER COLUMN "version_hero_overlay_color" SET DEFAULT 'purple'::text;
  DROP TYPE "public"."enum__posts_v_version_hero_overlay_color";
  CREATE TYPE "public"."enum__posts_v_version_hero_overlay_color" AS ENUM('base', 'purple', 'coral', 'cyan');
  ALTER TABLE "_posts_v" ALTER COLUMN "version_hero_overlay_color" SET DEFAULT 'purple'::"public"."enum__posts_v_version_hero_overlay_color";
  ALTER TABLE "_posts_v" ALTER COLUMN "version_hero_overlay_color" SET DATA TYPE "public"."enum__posts_v_version_hero_overlay_color" USING "version_hero_overlay_color"::"public"."enum__posts_v_version_hero_overlay_color";
  ALTER TABLE "posts" DROP COLUMN "hero_slide_timeout";
  ALTER TABLE "_posts_v" DROP COLUMN "version_hero_slide_timeout";
  DROP TYPE "public"."enum_posts_hero_slides_overlay_color";
  DROP TYPE "public"."enum__posts_v_version_hero_slides_overlay_color";`)
}
