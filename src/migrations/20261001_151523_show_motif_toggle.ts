import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_cta" ADD COLUMN "show_motif" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_content" ADD COLUMN "show_motif" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "show_motif" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_archive" ADD COLUMN "show_motif" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "show_motif" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_card_block" ADD COLUMN "show_motif" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_carousel_logo_block" ADD COLUMN "show_motif" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_static_map" ADD COLUMN "show_motif" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_timeline" ADD COLUMN "show_motif" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_team" ADD COLUMN "show_motif" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "show_motif" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "show_motif" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "show_motif" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN "show_motif" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "show_motif" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_card_block" ADD COLUMN "show_motif" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_carousel_logo_block" ADD COLUMN "show_motif" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_static_map" ADD COLUMN "show_motif" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_timeline" ADD COLUMN "show_motif" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_team" ADD COLUMN "show_motif" boolean DEFAULT true;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_cta" DROP COLUMN "show_motif";
  ALTER TABLE "pages_blocks_content" DROP COLUMN "show_motif";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "show_motif";
  ALTER TABLE "pages_blocks_archive" DROP COLUMN "show_motif";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN "show_motif";
  ALTER TABLE "pages_blocks_card_block" DROP COLUMN "show_motif";
  ALTER TABLE "pages_blocks_carousel_logo_block" DROP COLUMN "show_motif";
  ALTER TABLE "pages_blocks_static_map" DROP COLUMN "show_motif";
  ALTER TABLE "pages_blocks_timeline" DROP COLUMN "show_motif";
  ALTER TABLE "pages_blocks_team" DROP COLUMN "show_motif";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "show_motif";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN "show_motif";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "show_motif";
  ALTER TABLE "_pages_v_blocks_archive" DROP COLUMN "show_motif";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN "show_motif";
  ALTER TABLE "_pages_v_blocks_card_block" DROP COLUMN "show_motif";
  ALTER TABLE "_pages_v_blocks_carousel_logo_block" DROP COLUMN "show_motif";
  ALTER TABLE "_pages_v_blocks_static_map" DROP COLUMN "show_motif";
  ALTER TABLE "_pages_v_blocks_timeline" DROP COLUMN "show_motif";
  ALTER TABLE "_pages_v_blocks_team" DROP COLUMN "show_motif";`)
}
