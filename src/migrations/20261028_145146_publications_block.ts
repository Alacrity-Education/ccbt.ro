import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_publications_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"cover_id" integer,
  	"author" varchar,
  	"year" numeric,
  	"file_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_publications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"show_motif" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_publications_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"cover_id" integer,
  	"author" varchar,
  	"year" numeric,
  	"file_id" integer,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_publications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"show_motif" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_publications_items" ADD CONSTRAINT "pages_blocks_publications_items_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_publications_items" ADD CONSTRAINT "pages_blocks_publications_items_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_publications_items" ADD CONSTRAINT "pages_blocks_publications_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_publications" ADD CONSTRAINT "pages_blocks_publications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_publications_items" ADD CONSTRAINT "_pages_v_blocks_publications_items_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_publications_items" ADD CONSTRAINT "_pages_v_blocks_publications_items_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_publications_items" ADD CONSTRAINT "_pages_v_blocks_publications_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_publications" ADD CONSTRAINT "_pages_v_blocks_publications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_publications_items_order_idx" ON "pages_blocks_publications_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_publications_items_parent_id_idx" ON "pages_blocks_publications_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_publications_items_cover_idx" ON "pages_blocks_publications_items" USING btree ("cover_id");
  CREATE INDEX "pages_blocks_publications_items_file_idx" ON "pages_blocks_publications_items" USING btree ("file_id");
  CREATE INDEX "pages_blocks_publications_order_idx" ON "pages_blocks_publications" USING btree ("_order");
  CREATE INDEX "pages_blocks_publications_parent_id_idx" ON "pages_blocks_publications" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_publications_path_idx" ON "pages_blocks_publications" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_publications_items_order_idx" ON "_pages_v_blocks_publications_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_publications_items_parent_id_idx" ON "_pages_v_blocks_publications_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_publications_items_cover_idx" ON "_pages_v_blocks_publications_items" USING btree ("cover_id");
  CREATE INDEX "_pages_v_blocks_publications_items_file_idx" ON "_pages_v_blocks_publications_items" USING btree ("file_id");
  CREATE INDEX "_pages_v_blocks_publications_order_idx" ON "_pages_v_blocks_publications" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_publications_parent_id_idx" ON "_pages_v_blocks_publications" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_publications_path_idx" ON "_pages_v_blocks_publications" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_publications_items" CASCADE;
  DROP TABLE "pages_blocks_publications" CASCADE;
  DROP TABLE "_pages_v_blocks_publications_items" CASCADE;
  DROP TABLE "_pages_v_blocks_publications" CASCADE;`)
}
