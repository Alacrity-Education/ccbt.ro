import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_image_content_cells_links" CASCADE;
  DROP TABLE "pages_blocks_image_content_cells" CASCADE;
  DROP TABLE "pages_blocks_image_content" CASCADE;
  DROP TABLE "_pages_v_blocks_image_content_cells_links" CASCADE;
  DROP TABLE "_pages_v_blocks_image_content_cells" CASCADE;
  DROP TABLE "_pages_v_blocks_image_content" CASCADE;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "center_content" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "center_content" boolean DEFAULT false;
  DROP TYPE "public"."enum_pages_blocks_image_content_cells_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_image_content_cells_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_image_content_cells_type";
  DROP TYPE "public"."enum__pages_v_blocks_image_content_cells_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_image_content_cells_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_image_content_cells_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_image_content_cells_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_image_content_cells_links_link_appearance" AS ENUM('brand', 'default', 'secondary');
  CREATE TYPE "public"."enum_pages_blocks_image_content_cells_type" AS ENUM('text', 'media');
  CREATE TYPE "public"."enum__pages_v_blocks_image_content_cells_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_image_content_cells_links_link_appearance" AS ENUM('brand', 'default', 'secondary');
  CREATE TYPE "public"."enum__pages_v_blocks_image_content_cells_type" AS ENUM('text', 'media');
  CREATE TABLE "pages_blocks_image_content_cells_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_image_content_cells_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar DEFAULT '#',
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_image_content_cells_links_link_appearance" DEFAULT 'brand'
  );
  
  CREATE TABLE "pages_blocks_image_content_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_image_content_cells_type" DEFAULT 'text',
  	"row_span" numeric DEFAULT 1,
  	"rich_text" jsonb,
  	"media_id" integer
  );
  
  CREATE TABLE "pages_blocks_image_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cols_lg" numeric DEFAULT 2,
  	"rows_lg" numeric DEFAULT 2,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_content_cells_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_image_content_cells_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar DEFAULT '#',
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_image_content_cells_links_link_appearance" DEFAULT 'brand',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_content_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_image_content_cells_type" DEFAULT 'text',
  	"row_span" numeric DEFAULT 1,
  	"rich_text" jsonb,
  	"media_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cols_lg" numeric DEFAULT 2,
  	"rows_lg" numeric DEFAULT 2,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_image_content_cells_links" ADD CONSTRAINT "pages_blocks_image_content_cells_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_content_cells"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_content_cells" ADD CONSTRAINT "pages_blocks_image_content_cells_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_content_cells" ADD CONSTRAINT "pages_blocks_image_content_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_content" ADD CONSTRAINT "pages_blocks_image_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_content_cells_links" ADD CONSTRAINT "_pages_v_blocks_image_content_cells_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_content_cells"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_content_cells" ADD CONSTRAINT "_pages_v_blocks_image_content_cells_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_content_cells" ADD CONSTRAINT "_pages_v_blocks_image_content_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_content" ADD CONSTRAINT "_pages_v_blocks_image_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_image_content_cells_links_order_idx" ON "pages_blocks_image_content_cells_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_content_cells_links_parent_id_idx" ON "pages_blocks_image_content_cells_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_content_cells_order_idx" ON "pages_blocks_image_content_cells" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_content_cells_parent_id_idx" ON "pages_blocks_image_content_cells" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_content_cells_media_idx" ON "pages_blocks_image_content_cells" USING btree ("media_id");
  CREATE INDEX "pages_blocks_image_content_order_idx" ON "pages_blocks_image_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_content_parent_id_idx" ON "pages_blocks_image_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_content_path_idx" ON "pages_blocks_image_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_content_cells_links_order_idx" ON "_pages_v_blocks_image_content_cells_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_content_cells_links_parent_id_idx" ON "_pages_v_blocks_image_content_cells_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_content_cells_order_idx" ON "_pages_v_blocks_image_content_cells" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_content_cells_parent_id_idx" ON "_pages_v_blocks_image_content_cells" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_content_cells_media_idx" ON "_pages_v_blocks_image_content_cells" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_image_content_order_idx" ON "_pages_v_blocks_image_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_content_parent_id_idx" ON "_pages_v_blocks_image_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_content_path_idx" ON "_pages_v_blocks_image_content" USING btree ("_path");
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "center_content";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "center_content";`)
}
