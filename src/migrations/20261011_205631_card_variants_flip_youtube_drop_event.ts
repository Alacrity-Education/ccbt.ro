import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_card_block_variant" AS ENUM('default', 'vertical');
  CREATE TYPE "public"."enum__pages_v_blocks_card_block_variant" AS ENUM('default', 'vertical');
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "youtube_url" varchar;
  ALTER TABLE "pages_blocks_card_block_cards" ADD COLUMN "flippable" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_card_block" ADD COLUMN "variant" "enum_pages_blocks_card_block_variant" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "youtube_url" varchar;
  ALTER TABLE "_pages_v_blocks_card_block_cards" ADD COLUMN "flippable" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_card_block" ADD COLUMN "variant" "enum__pages_v_blocks_card_block_variant" DEFAULT 'default';
  ALTER TABLE "posts" DROP COLUMN "is_event";
  ALTER TABLE "posts" DROP COLUMN "event_date";
  ALTER TABLE "_posts_v" DROP COLUMN "version_is_event";
  ALTER TABLE "_posts_v" DROP COLUMN "version_event_date";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts" ADD COLUMN "is_event" boolean DEFAULT false;
  ALTER TABLE "posts" ADD COLUMN "event_date" timestamp(3) with time zone;
  ALTER TABLE "_posts_v" ADD COLUMN "version_is_event" boolean DEFAULT false;
  ALTER TABLE "_posts_v" ADD COLUMN "version_event_date" timestamp(3) with time zone;
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "youtube_url";
  ALTER TABLE "pages_blocks_card_block_cards" DROP COLUMN "flippable";
  ALTER TABLE "pages_blocks_card_block" DROP COLUMN "variant";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "youtube_url";
  ALTER TABLE "_pages_v_blocks_card_block_cards" DROP COLUMN "flippable";
  ALTER TABLE "_pages_v_blocks_card_block" DROP COLUMN "variant";
  DROP TYPE "public"."enum_pages_blocks_card_block_variant";
  DROP TYPE "public"."enum__pages_v_blocks_card_block_variant";`)
}
