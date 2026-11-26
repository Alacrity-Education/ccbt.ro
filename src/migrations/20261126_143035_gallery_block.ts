import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_gallery_sections_color" AS ENUM('purple', 'coral');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_sections_color" AS ENUM('purple', 'coral');
  CREATE TABLE "pages_blocks_gallery_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"subtitle" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"color" "enum_pages_blocks_gallery_sections_color" DEFAULT 'coral'
  );
  
  CREATE TABLE "pages_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_motif" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"color" "enum__pages_v_blocks_gallery_sections_color" DEFAULT 'coral',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_motif" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_gallery_sections_items" ADD CONSTRAINT "pages_blocks_gallery_sections_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_sections_items" ADD CONSTRAINT "pages_blocks_gallery_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_sections" ADD CONSTRAINT "pages_blocks_gallery_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery" ADD CONSTRAINT "pages_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_sections_items" ADD CONSTRAINT "_pages_v_blocks_gallery_sections_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_sections_items" ADD CONSTRAINT "_pages_v_blocks_gallery_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_sections" ADD CONSTRAINT "_pages_v_blocks_gallery_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery" ADD CONSTRAINT "_pages_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_gallery_sections_items_order_idx" ON "pages_blocks_gallery_sections_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_sections_items_parent_id_idx" ON "pages_blocks_gallery_sections_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_sections_items_image_idx" ON "pages_blocks_gallery_sections_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_gallery_sections_order_idx" ON "pages_blocks_gallery_sections" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_sections_parent_id_idx" ON "pages_blocks_gallery_sections" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_order_idx" ON "pages_blocks_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_parent_id_idx" ON "pages_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_path_idx" ON "pages_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_gallery_sections_items_order_idx" ON "_pages_v_blocks_gallery_sections_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_sections_items_parent_id_idx" ON "_pages_v_blocks_gallery_sections_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_sections_items_image_idx" ON "_pages_v_blocks_gallery_sections_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_gallery_sections_order_idx" ON "_pages_v_blocks_gallery_sections" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_sections_parent_id_idx" ON "_pages_v_blocks_gallery_sections" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_order_idx" ON "_pages_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_parent_id_idx" ON "_pages_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_path_idx" ON "_pages_v_blocks_gallery" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_gallery_sections_items" CASCADE;
  DROP TABLE "pages_blocks_gallery_sections" CASCADE;
  DROP TABLE "pages_blocks_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_sections_items" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_sections" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_gallery_sections_color";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_sections_color";`)
}
