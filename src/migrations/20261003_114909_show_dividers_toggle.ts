import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_timeline" ADD COLUMN "show_dividers" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_timeline" ADD COLUMN "show_dividers" boolean DEFAULT true;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_timeline" DROP COLUMN "show_dividers";
  ALTER TABLE "_pages_v_blocks_timeline" DROP COLUMN "show_dividers";`)
}
