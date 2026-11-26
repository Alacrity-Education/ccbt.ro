import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_archive_extra_months_month" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_extra_months_month" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TABLE "pages_blocks_archive_extra_months" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"month" "enum_pages_blocks_archive_extra_months_month",
  	"year" numeric
  );
  
  CREATE TABLE "_pages_v_blocks_archive_extra_months" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"month" "enum__pages_v_blocks_archive_extra_months_month",
  	"year" numeric,
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages_blocks_archive_extra_months" ADD CONSTRAINT "pages_blocks_archive_extra_months_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_archive"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_archive_extra_months" ADD CONSTRAINT "_pages_v_blocks_archive_extra_months_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_archive"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_archive_extra_months_order_idx" ON "pages_blocks_archive_extra_months" USING btree ("_order");
  CREATE INDEX "pages_blocks_archive_extra_months_parent_id_idx" ON "pages_blocks_archive_extra_months" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_archive_extra_months_order_idx" ON "_pages_v_blocks_archive_extra_months" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_archive_extra_months_parent_id_idx" ON "_pages_v_blocks_archive_extra_months" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_archive_extra_months" CASCADE;
  DROP TABLE "_pages_v_blocks_archive_extra_months" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_archive_extra_months_month";
  DROP TYPE "public"."enum__pages_v_blocks_archive_extra_months_month";`)
}
