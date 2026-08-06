import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_slides_color" AS ENUM('purple', 'coral', 'cyan');
  CREATE TYPE "public"."enum_pages_hero_slides_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_hero_slides_cta_link_appearance" AS ENUM('brand', 'default', 'primary', 'secondary', 'accent', 'neutral', 'success', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_appearance" AS ENUM('brand', 'outline', 'secondary', 'default');
  CREATE TYPE "public"."enum_pages_blocks_cta_cards_color" AS ENUM('purple', 'coral', 'cyan');
  CREATE TYPE "public"."enum_pages_blocks_cta_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_variant" AS ENUM('primary', 'secondary', 'background', 'highlight');
  CREATE TYPE "public"."enum_pages_blocks_cta_cta_type" AS ENUM('links', 'modal');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_type" AS ENUM('text', 'media');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_decorator_vertical_color" AS ENUM('purple', 'coral', 'cyan');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_decorator_horizontal_color" AS ENUM('purple', 'coral', 'cyan');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_appearance" AS ENUM('brand', 'default', 'primary', 'secondary', 'accent', 'neutral', 'success', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_archive_style" AS ENUM('text', 'cards');
  CREATE TYPE "public"."enum_pages_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_pages_blocks_archive_relation_to" AS ENUM('posts');
  CREATE TYPE "public"."enum_pages_blocks_archive_long_card_styles_card1" AS ENUM('primary', 'secondary', 'starry', 'transparent');
  CREATE TYPE "public"."enum_pages_blocks_archive_long_card_styles_card2" AS ENUM('primary', 'secondary', 'starry', 'transparent');
  CREATE TYPE "public"."enum_pages_blocks_archive_long_card_styles_card3" AS ENUM('primary', 'secondary', 'starry', 'transparent');
  CREATE TYPE "public"."enum_pages_blocks_archive_long_card_styles_card4" AS ENUM('primary', 'secondary', 'starry', 'transparent');
  CREATE TYPE "public"."enum_pages_blocks_card_block_cards_color" AS ENUM('purple', 'coral', 'cyan');
  CREATE TYPE "public"."enum_pages_blocks_card_block_cards_orientation" AS ENUM('vertical', 'horizontal');
  CREATE TYPE "public"."enum_pages_blocks_card_block_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_image_content_cells_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_image_content_cells_links_link_appearance" AS ENUM('brand', 'default', 'secondary');
  CREATE TYPE "public"."enum_pages_blocks_image_content_cells_type" AS ENUM('text', 'media');
  CREATE TYPE "public"."enum_pages_blocks_static_map_variant" AS ENUM('default', 'mono', 'mono-black');
  CREATE TYPE "public"."enum_pages_blocks_divider_pattern" AS ENUM('a', 'b', 'c', 'd');
  CREATE TYPE "public"."enum_pages_blocks_divider_primary_color" AS ENUM('default', 'purple', 'coral', 'cyan', 'green');
  CREATE TYPE "public"."enum_pages_blocks_divider_secondary_color" AS ENUM('default', 'purple', 'coral', 'cyan', 'green');
  CREATE TYPE "public"."enum_pages_blocks_timeline_entries_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_team_departments_members_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_team_departments_color" AS ENUM('purple', 'coral');
  CREATE TYPE "public"."enum_pages_hero_type" AS ENUM('none', 'homeHero', 'highImpactHero', 'lowImpact', 'slidingHero');
  CREATE TYPE "public"."enum_pages_hero_bg_color" AS ENUM('base', 'purple', 'coral', 'cyan');
  CREATE TYPE "public"."enum_pages_hero_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_hero_cta_link_appearance" AS ENUM('brand', 'default', 'primary', 'secondary', 'accent', 'neutral', 'success', 'outline');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_hero_slides_color" AS ENUM('purple', 'coral', 'cyan');
  CREATE TYPE "public"."enum__pages_v_version_hero_slides_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_hero_slides_cta_link_appearance" AS ENUM('brand', 'default', 'primary', 'secondary', 'accent', 'neutral', 'success', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" AS ENUM('brand', 'outline', 'secondary', 'default');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_cards_color" AS ENUM('purple', 'coral', 'cyan');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_variant" AS ENUM('primary', 'secondary', 'background', 'highlight');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_cta_type" AS ENUM('links', 'modal');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_type" AS ENUM('text', 'media');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_decorator_vertical_color" AS ENUM('purple', 'coral', 'cyan');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_decorator_horizontal_color" AS ENUM('purple', 'coral', 'cyan');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" AS ENUM('brand', 'default', 'primary', 'secondary', 'accent', 'neutral', 'success', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_style" AS ENUM('text', 'cards');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_relation_to" AS ENUM('posts');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_long_card_styles_card1" AS ENUM('primary', 'secondary', 'starry', 'transparent');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_long_card_styles_card2" AS ENUM('primary', 'secondary', 'starry', 'transparent');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_long_card_styles_card3" AS ENUM('primary', 'secondary', 'starry', 'transparent');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_long_card_styles_card4" AS ENUM('primary', 'secondary', 'starry', 'transparent');
  CREATE TYPE "public"."enum__pages_v_blocks_card_block_cards_color" AS ENUM('purple', 'coral', 'cyan');
  CREATE TYPE "public"."enum__pages_v_blocks_card_block_cards_orientation" AS ENUM('vertical', 'horizontal');
  CREATE TYPE "public"."enum__pages_v_blocks_card_block_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_image_content_cells_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_image_content_cells_links_link_appearance" AS ENUM('brand', 'default', 'secondary');
  CREATE TYPE "public"."enum__pages_v_blocks_image_content_cells_type" AS ENUM('text', 'media');
  CREATE TYPE "public"."enum__pages_v_blocks_static_map_variant" AS ENUM('default', 'mono', 'mono-black');
  CREATE TYPE "public"."enum__pages_v_blocks_divider_pattern" AS ENUM('a', 'b', 'c', 'd');
  CREATE TYPE "public"."enum__pages_v_blocks_divider_primary_color" AS ENUM('default', 'purple', 'coral', 'cyan', 'green');
  CREATE TYPE "public"."enum__pages_v_blocks_divider_secondary_color" AS ENUM('default', 'purple', 'coral', 'cyan', 'green');
  CREATE TYPE "public"."enum__pages_v_blocks_timeline_entries_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_team_departments_members_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_team_departments_color" AS ENUM('purple', 'coral');
  CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('none', 'homeHero', 'highImpactHero', 'lowImpact', 'slidingHero');
  CREATE TYPE "public"."enum__pages_v_version_hero_bg_color" AS ENUM('base', 'purple', 'coral', 'cyan');
  CREATE TYPE "public"."enum__pages_v_version_hero_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_hero_cta_link_appearance" AS ENUM('brand', 'default', 'primary', 'secondary', 'accent', 'neutral', 'success', 'outline');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_posts_hero_overlay_color" AS ENUM('base', 'purple', 'coral', 'cyan');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_hero_overlay_color" AS ENUM('base', 'purple', 'coral', 'cyan');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_folders_folder_type" AS ENUM('media');
  CREATE TYPE "public"."enum_header_nav_items_sub_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_nav_items_item_type" AS ENUM('link', 'parent');
  CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_sections_links_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "pages_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" "enum_pages_hero_slides_color" DEFAULT 'purple',
  	"media_id" integer,
  	"media_mobile_id" integer,
  	"title" varchar,
  	"subtitle" varchar,
  	"cta_enable" boolean DEFAULT false,
  	"cta_link_type" "enum_pages_hero_slides_cta_link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean,
  	"cta_link_url" varchar DEFAULT '#',
  	"cta_link_label" varchar,
  	"cta_link_appearance" "enum_pages_hero_slides_cta_link_appearance" DEFAULT 'brand'
  );
  
  CREATE TABLE "pages_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar DEFAULT '#',
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_cta_links_link_appearance" DEFAULT 'brand'
  );
  
  CREATE TABLE "pages_blocks_cta_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"color" "enum_pages_blocks_cta_cards_color" DEFAULT 'coral',
  	"with_link" boolean DEFAULT false,
  	"link_type" "enum_pages_blocks_cta_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar DEFAULT '#',
  	"link_label" varchar,
  	"background_image_id" integer,
  	"background_opacity" numeric DEFAULT 100
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"rich_text" jsonb,
  	"variant" "enum_pages_blocks_cta_variant",
  	"media_id" integer,
  	"cta_type" "enum_pages_blocks_cta_cta_type" DEFAULT 'links',
  	"modal_button_text" varchar,
  	"form_id" integer,
  	"enable_motif" boolean DEFAULT false,
  	"enable_cards" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_pages_blocks_content_columns_size" DEFAULT 'oneThird',
  	"type" "enum_pages_blocks_content_columns_type" DEFAULT 'text',
  	"rich_text" jsonb,
  	"media_id" integer,
  	"decorator_enabled" boolean DEFAULT false,
  	"decorator_vertical_color" "enum_pages_blocks_content_columns_decorator_vertical_color" DEFAULT 'coral',
  	"decorator_horizontal_color" "enum_pages_blocks_content_columns_decorator_horizontal_color" DEFAULT 'purple',
  	"enable_link" boolean,
  	"link_type" "enum_pages_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar DEFAULT '#',
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_content_columns_link_appearance" DEFAULT 'brand'
  );
  
  CREATE TABLE "pages_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"style" "enum_pages_blocks_archive_style" DEFAULT 'text',
  	"populate_by" "enum_pages_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_pages_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"long_card_styles_card1" "enum_pages_blocks_archive_long_card_styles_card1" DEFAULT 'primary',
  	"long_card_styles_card2" "enum_pages_blocks_archive_long_card_styles_card2" DEFAULT 'secondary',
  	"long_card_styles_card3" "enum_pages_blocks_archive_long_card_styles_card3" DEFAULT 'starry',
  	"long_card_styles_card4" "enum_pages_blocks_archive_long_card_styles_card4" DEFAULT 'transparent',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"show_title" boolean,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_card_block_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"color" "enum_pages_blocks_card_block_cards_color" DEFAULT 'coral',
  	"orientation" "enum_pages_blocks_card_block_cards_orientation" DEFAULT 'vertical',
  	"with_link" boolean DEFAULT false,
  	"link_type" "enum_pages_blocks_card_block_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar DEFAULT '#',
  	"link_label" varchar,
  	"background_image_id" integer,
  	"background_opacity" numeric DEFAULT 100
  );
  
  CREATE TABLE "pages_blocks_card_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_carousel_logo_block_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"media_id" integer,
  	"link" varchar
  );
  
  CREATE TABLE "pages_blocks_carousel_logo_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
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
  
  CREATE TABLE "pages_blocks_static_map_markers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"latitude" numeric,
  	"longitude" numeric,
  	"title" varchar,
  	"subtitle" varchar
  );
  
  CREATE TABLE "pages_blocks_static_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_static_map_variant" DEFAULT 'default',
  	"initial_view_latitude" numeric,
  	"initial_view_longitude" numeric,
  	"initial_view_zoom" numeric DEFAULT 14,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_divider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"pattern" "enum_pages_blocks_divider_pattern" DEFAULT 'a',
  	"primary_color" "enum_pages_blocks_divider_primary_color" DEFAULT 'default',
  	"secondary_color" "enum_pages_blocks_divider_secondary_color" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_timeline_entries" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" varchar,
  	"content" jsonb,
  	"with_link" boolean DEFAULT false,
  	"link_type" "enum_pages_blocks_timeline_entries_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar DEFAULT '#',
  	"link_label" varchar
  );
  
  CREATE TABLE "pages_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_team_departments_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"photo_id" integer,
  	"with_link" boolean DEFAULT false,
  	"link_type" "enum_pages_blocks_team_departments_members_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar DEFAULT '#',
  	"link_label" varchar
  );
  
  CREATE TABLE "pages_blocks_team_departments" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"color" "enum_pages_blocks_team_departments_color" DEFAULT 'coral'
  );
  
  CREATE TABLE "pages_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_type" "enum_pages_hero_type" DEFAULT 'homeHero',
  	"hero_bg_color" "enum_pages_hero_bg_color" DEFAULT 'base',
  	"hero_title" varchar,
  	"hero_subtitle" varchar,
  	"hero_body" varchar,
  	"hero_cta_link_type" "enum_pages_hero_cta_link_type" DEFAULT 'reference',
  	"hero_cta_link_new_tab" boolean,
  	"hero_cta_link_url" varchar DEFAULT '#',
  	"hero_cta_link_label" varchar,
  	"hero_cta_link_appearance" "enum_pages_hero_cta_link_appearance" DEFAULT 'brand',
  	"hero_media_id" integer,
  	"hero_media_mobile_id" integer,
  	"hero_timeout" numeric DEFAULT 6000,
  	"hero_rich_text" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"categories_id" integer
  );
  
  CREATE TABLE "_pages_v_version_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"color" "enum__pages_v_version_hero_slides_color" DEFAULT 'purple',
  	"media_id" integer,
  	"media_mobile_id" integer,
  	"title" varchar,
  	"subtitle" varchar,
  	"cta_enable" boolean DEFAULT false,
  	"cta_link_type" "enum__pages_v_version_hero_slides_cta_link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean,
  	"cta_link_url" varchar DEFAULT '#',
  	"cta_link_label" varchar,
  	"cta_link_appearance" "enum__pages_v_version_hero_slides_cta_link_appearance" DEFAULT 'brand',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar DEFAULT '#',
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_cta_links_link_appearance" DEFAULT 'brand',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"color" "enum__pages_v_blocks_cta_cards_color" DEFAULT 'coral',
  	"with_link" boolean DEFAULT false,
  	"link_type" "enum__pages_v_blocks_cta_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar DEFAULT '#',
  	"link_label" varchar,
  	"background_image_id" integer,
  	"background_opacity" numeric DEFAULT 100,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"rich_text" jsonb,
  	"variant" "enum__pages_v_blocks_cta_variant",
  	"media_id" integer,
  	"cta_type" "enum__pages_v_blocks_cta_cta_type" DEFAULT 'links',
  	"modal_button_text" varchar,
  	"form_id" integer,
  	"enable_motif" boolean DEFAULT false,
  	"enable_cards" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__pages_v_blocks_content_columns_size" DEFAULT 'oneThird',
  	"type" "enum__pages_v_blocks_content_columns_type" DEFAULT 'text',
  	"rich_text" jsonb,
  	"media_id" integer,
  	"decorator_enabled" boolean DEFAULT false,
  	"decorator_vertical_color" "enum__pages_v_blocks_content_columns_decorator_vertical_color" DEFAULT 'coral',
  	"decorator_horizontal_color" "enum__pages_v_blocks_content_columns_decorator_horizontal_color" DEFAULT 'purple',
  	"enable_link" boolean,
  	"link_type" "enum__pages_v_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar DEFAULT '#',
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_content_columns_link_appearance" DEFAULT 'brand',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"style" "enum__pages_v_blocks_archive_style" DEFAULT 'text',
  	"populate_by" "enum__pages_v_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum__pages_v_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"long_card_styles_card1" "enum__pages_v_blocks_archive_long_card_styles_card1" DEFAULT 'primary',
  	"long_card_styles_card2" "enum__pages_v_blocks_archive_long_card_styles_card2" DEFAULT 'secondary',
  	"long_card_styles_card3" "enum__pages_v_blocks_archive_long_card_styles_card3" DEFAULT 'starry',
  	"long_card_styles_card4" "enum__pages_v_blocks_archive_long_card_styles_card4" DEFAULT 'transparent',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"show_title" boolean,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_block_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"color" "enum__pages_v_blocks_card_block_cards_color" DEFAULT 'coral',
  	"orientation" "enum__pages_v_blocks_card_block_cards_orientation" DEFAULT 'vertical',
  	"with_link" boolean DEFAULT false,
  	"link_type" "enum__pages_v_blocks_card_block_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar DEFAULT '#',
  	"link_label" varchar,
  	"background_image_id" integer,
  	"background_opacity" numeric DEFAULT 100,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_carousel_logo_block_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"media_id" integer,
  	"link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_carousel_logo_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
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
  
  CREATE TABLE "_pages_v_blocks_static_map_markers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"latitude" numeric,
  	"longitude" numeric,
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_static_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_static_map_variant" DEFAULT 'default',
  	"initial_view_latitude" numeric,
  	"initial_view_longitude" numeric,
  	"initial_view_zoom" numeric DEFAULT 14,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_divider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"pattern" "enum__pages_v_blocks_divider_pattern" DEFAULT 'a',
  	"primary_color" "enum__pages_v_blocks_divider_primary_color" DEFAULT 'default',
  	"secondary_color" "enum__pages_v_blocks_divider_secondary_color" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_timeline_entries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" varchar,
  	"content" jsonb,
  	"with_link" boolean DEFAULT false,
  	"link_type" "enum__pages_v_blocks_timeline_entries_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar DEFAULT '#',
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_departments_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"photo_id" integer,
  	"with_link" boolean DEFAULT false,
  	"link_type" "enum__pages_v_blocks_team_departments_members_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar DEFAULT '#',
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_departments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"color" "enum__pages_v_blocks_team_departments_color" DEFAULT 'coral',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_type" "enum__pages_v_version_hero_type" DEFAULT 'homeHero',
  	"version_hero_bg_color" "enum__pages_v_version_hero_bg_color" DEFAULT 'base',
  	"version_hero_title" varchar,
  	"version_hero_subtitle" varchar,
  	"version_hero_body" varchar,
  	"version_hero_cta_link_type" "enum__pages_v_version_hero_cta_link_type" DEFAULT 'reference',
  	"version_hero_cta_link_new_tab" boolean,
  	"version_hero_cta_link_url" varchar DEFAULT '#',
  	"version_hero_cta_link_label" varchar,
  	"version_hero_cta_link_appearance" "enum__pages_v_version_hero_cta_link_appearance" DEFAULT 'brand',
  	"version_hero_media_id" integer,
  	"version_hero_media_mobile_id" integer,
  	"version_hero_timeout" numeric DEFAULT 6000,
  	"version_hero_rich_text" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"categories_id" integer
  );
  
  CREATE TABLE "posts_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"hero_image_m_d_id" integer,
  	"hero_image_s_m_id" integer,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"hero_overlay_color" "enum_posts_hero_overlay_color" DEFAULT 'purple',
  	"show_motif" boolean DEFAULT true,
  	"is_event" boolean DEFAULT false,
  	"event_date" timestamp(3) with time zone,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "_posts_v_version_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"name" varchar
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_subtitle" varchar,
  	"version_hero_image_m_d_id" integer,
  	"version_hero_image_s_m_id" integer,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_hero_overlay_color" "enum__posts_v_version_hero_overlay_color" DEFAULT 'purple',
  	"version_show_motif" boolean DEFAULT true,
  	"version_is_event" boolean DEFAULT false,
  	"version_event_date" timestamp(3) with time zone,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"caption" jsonb,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_square_url" varchar,
  	"sizes_square_width" numeric,
  	"sizes_square_height" numeric,
  	"sizes_square_mime_type" varchar,
  	"sizes_square_filesize" numeric,
  	"sizes_square_filename" varchar,
  	"sizes_small_url" varchar,
  	"sizes_small_width" numeric,
  	"sizes_small_height" numeric,
  	"sizes_small_mime_type" varchar,
  	"sizes_small_filesize" numeric,
  	"sizes_small_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_xlarge_url" varchar,
  	"sizes_xlarge_width" numeric,
  	"sizes_xlarge_height" numeric,
  	"sizes_xlarge_mime_type" varchar,
  	"sizes_xlarge_filesize" numeric,
  	"sizes_xlarge_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "categories_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"parent_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "forms_blocks_checkbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"default_value" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_country" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"message" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"placeholder" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_state" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar,
  	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
  	"message" jsonb
  );
  
  CREATE TABLE "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"submit_button_label" varchar,
  	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
  	"confirmation_message" jsonb,
  	"redirect_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "search_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"relation_to" varchar,
  	"category_i_d" varchar,
  	"title" varchar
  );
  
  CREATE TABLE "search" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"priority" numeric,
  	"slug" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "search_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_folders_folder_type" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_payload_folders_folder_type",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload_folders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"media_id" integer,
  	"categories_id" integer,
  	"users_id" integer,
  	"redirects_id" integer,
  	"forms_id" integer,
  	"form_submissions_id" integer,
  	"search_id" integer,
  	"payload_folders_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_nav_items_sub_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_sub_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar DEFAULT '#',
  	"link_label" varchar
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item_type" "enum_header_nav_items_item_type" DEFAULT 'link',
  	"link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar DEFAULT '#',
  	"link_label" varchar
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "footer_sections_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_sections_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar DEFAULT '#',
  	"link_label" varchar
  );
  
  CREATE TABLE "footer_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"col_start_lg" numeric
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"brand_logo_id" integer,
  	"credit" varchar DEFAULT 'Dezvoltat de Alacrity Education',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  ALTER TABLE "pages_hero_slides" ADD CONSTRAINT "pages_hero_slides_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_hero_slides" ADD CONSTRAINT "pages_hero_slides_media_mobile_id_media_id_fk" FOREIGN KEY ("media_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_hero_slides" ADD CONSTRAINT "pages_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_links" ADD CONSTRAINT "pages_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_cards" ADD CONSTRAINT "pages_blocks_cta_cards_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_cards" ADD CONSTRAINT "pages_blocks_cta_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_columns" ADD CONSTRAINT "pages_blocks_content_columns_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_columns" ADD CONSTRAINT "pages_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content" ADD CONSTRAINT "pages_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_archive" ADD CONSTRAINT "pages_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_block_cards" ADD CONSTRAINT "pages_blocks_card_block_cards_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_block_cards" ADD CONSTRAINT "pages_blocks_card_block_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_block" ADD CONSTRAINT "pages_blocks_card_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_carousel_logo_block_items" ADD CONSTRAINT "pages_blocks_carousel_logo_block_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_carousel_logo_block_items" ADD CONSTRAINT "pages_blocks_carousel_logo_block_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_carousel_logo_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_carousel_logo_block" ADD CONSTRAINT "pages_blocks_carousel_logo_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_content_cells_links" ADD CONSTRAINT "pages_blocks_image_content_cells_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_content_cells"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_content_cells" ADD CONSTRAINT "pages_blocks_image_content_cells_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_content_cells" ADD CONSTRAINT "pages_blocks_image_content_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_content" ADD CONSTRAINT "pages_blocks_image_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_static_map_markers" ADD CONSTRAINT "pages_blocks_static_map_markers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_static_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_static_map" ADD CONSTRAINT "pages_blocks_static_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_divider" ADD CONSTRAINT "pages_blocks_divider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline_entries" ADD CONSTRAINT "pages_blocks_timeline_entries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline" ADD CONSTRAINT "pages_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_departments_members" ADD CONSTRAINT "pages_blocks_team_departments_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_departments_members" ADD CONSTRAINT "pages_blocks_team_departments_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team_departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_departments" ADD CONSTRAINT "pages_blocks_team_departments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team" ADD CONSTRAINT "pages_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_media_mobile_id_media_id_fk" FOREIGN KEY ("hero_media_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_slides" ADD CONSTRAINT "_pages_v_version_hero_slides_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_slides" ADD CONSTRAINT "_pages_v_version_hero_slides_media_mobile_id_media_id_fk" FOREIGN KEY ("media_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_slides" ADD CONSTRAINT "_pages_v_version_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD CONSTRAINT "_pages_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_cards" ADD CONSTRAINT "_pages_v_blocks_cta_cards_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_cards" ADD CONSTRAINT "_pages_v_blocks_cta_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD CONSTRAINT "_pages_v_blocks_content_columns_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD CONSTRAINT "_pages_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content" ADD CONSTRAINT "_pages_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_archive" ADD CONSTRAINT "_pages_v_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_block_cards" ADD CONSTRAINT "_pages_v_blocks_card_block_cards_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_block_cards" ADD CONSTRAINT "_pages_v_blocks_card_block_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_card_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_block" ADD CONSTRAINT "_pages_v_blocks_card_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_carousel_logo_block_items" ADD CONSTRAINT "_pages_v_blocks_carousel_logo_block_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_carousel_logo_block_items" ADD CONSTRAINT "_pages_v_blocks_carousel_logo_block_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_carousel_logo_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_carousel_logo_block" ADD CONSTRAINT "_pages_v_blocks_carousel_logo_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_content_cells_links" ADD CONSTRAINT "_pages_v_blocks_image_content_cells_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_content_cells"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_content_cells" ADD CONSTRAINT "_pages_v_blocks_image_content_cells_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_content_cells" ADD CONSTRAINT "_pages_v_blocks_image_content_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_content" ADD CONSTRAINT "_pages_v_blocks_image_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_static_map_markers" ADD CONSTRAINT "_pages_v_blocks_static_map_markers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_static_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_static_map" ADD CONSTRAINT "_pages_v_blocks_static_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_divider" ADD CONSTRAINT "_pages_v_blocks_divider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline_entries" ADD CONSTRAINT "_pages_v_blocks_timeline_entries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline" ADD CONSTRAINT "_pages_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_departments_members" ADD CONSTRAINT "_pages_v_blocks_team_departments_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_departments_members" ADD CONSTRAINT "_pages_v_blocks_team_departments_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team_departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_departments" ADD CONSTRAINT "_pages_v_blocks_team_departments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team" ADD CONSTRAINT "_pages_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_media_mobile_id_media_id_fk" FOREIGN KEY ("version_hero_media_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_populated_authors" ADD CONSTRAINT "posts_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_hero_image_m_d_id_media_id_fk" FOREIGN KEY ("hero_image_m_d_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_hero_image_s_m_id_media_id_fk" FOREIGN KEY ("hero_image_s_m_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_populated_authors" ADD CONSTRAINT "_posts_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_hero_image_m_d_id_media_id_fk" FOREIGN KEY ("version_hero_image_m_d_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_hero_image_s_m_id_media_id_fk" FOREIGN KEY ("version_hero_image_s_m_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_breadcrumbs" ADD CONSTRAINT "categories_breadcrumbs_doc_id_categories_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_breadcrumbs" ADD CONSTRAINT "categories_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "search_categories" ADD CONSTRAINT "search_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search" ADD CONSTRAINT "search_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders_folder_type" ADD CONSTRAINT "payload_folders_folder_type_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders" ADD CONSTRAINT "payload_folders_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_search_fk" FOREIGN KEY ("search_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_folders_fk" FOREIGN KEY ("payload_folders_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_sub_items" ADD CONSTRAINT "header_nav_items_sub_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_sections_links" ADD CONSTRAINT "footer_sections_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_sections" ADD CONSTRAINT "footer_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_brand_logo_id_media_id_fk" FOREIGN KEY ("brand_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_hero_slides_order_idx" ON "pages_hero_slides" USING btree ("_order");
  CREATE INDEX "pages_hero_slides_parent_id_idx" ON "pages_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "pages_hero_slides_media_idx" ON "pages_hero_slides" USING btree ("media_id");
  CREATE INDEX "pages_hero_slides_media_mobile_idx" ON "pages_hero_slides" USING btree ("media_mobile_id");
  CREATE INDEX "pages_blocks_cta_links_order_idx" ON "pages_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_links_parent_id_idx" ON "pages_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_cards_order_idx" ON "pages_blocks_cta_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_cards_parent_id_idx" ON "pages_blocks_cta_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_cards_background_image_idx" ON "pages_blocks_cta_cards" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_media_idx" ON "pages_blocks_cta" USING btree ("media_id");
  CREATE INDEX "pages_blocks_cta_form_idx" ON "pages_blocks_cta" USING btree ("form_id");
  CREATE INDEX "pages_blocks_content_columns_order_idx" ON "pages_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_columns_parent_id_idx" ON "pages_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_columns_media_idx" ON "pages_blocks_content_columns" USING btree ("media_id");
  CREATE INDEX "pages_blocks_content_order_idx" ON "pages_blocks_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_parent_id_idx" ON "pages_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_path_idx" ON "pages_blocks_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_block_order_idx" ON "pages_blocks_media_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_block_parent_id_idx" ON "pages_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_block_path_idx" ON "pages_blocks_media_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_block_media_idx" ON "pages_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "pages_blocks_archive_order_idx" ON "pages_blocks_archive" USING btree ("_order");
  CREATE INDEX "pages_blocks_archive_parent_id_idx" ON "pages_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_archive_path_idx" ON "pages_blocks_archive" USING btree ("_path");
  CREATE INDEX "pages_blocks_form_block_order_idx" ON "pages_blocks_form_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_form_block_parent_id_idx" ON "pages_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_form_block_path_idx" ON "pages_blocks_form_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_form_block_form_idx" ON "pages_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "pages_blocks_card_block_cards_order_idx" ON "pages_blocks_card_block_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_block_cards_parent_id_idx" ON "pages_blocks_card_block_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_block_cards_background_image_idx" ON "pages_blocks_card_block_cards" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_card_block_order_idx" ON "pages_blocks_card_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_block_parent_id_idx" ON "pages_blocks_card_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_block_path_idx" ON "pages_blocks_card_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_carousel_logo_block_items_order_idx" ON "pages_blocks_carousel_logo_block_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_carousel_logo_block_items_parent_id_idx" ON "pages_blocks_carousel_logo_block_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_carousel_logo_block_items_media_idx" ON "pages_blocks_carousel_logo_block_items" USING btree ("media_id");
  CREATE INDEX "pages_blocks_carousel_logo_block_order_idx" ON "pages_blocks_carousel_logo_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_carousel_logo_block_parent_id_idx" ON "pages_blocks_carousel_logo_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_carousel_logo_block_path_idx" ON "pages_blocks_carousel_logo_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_content_cells_links_order_idx" ON "pages_blocks_image_content_cells_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_content_cells_links_parent_id_idx" ON "pages_blocks_image_content_cells_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_content_cells_order_idx" ON "pages_blocks_image_content_cells" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_content_cells_parent_id_idx" ON "pages_blocks_image_content_cells" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_content_cells_media_idx" ON "pages_blocks_image_content_cells" USING btree ("media_id");
  CREATE INDEX "pages_blocks_image_content_order_idx" ON "pages_blocks_image_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_content_parent_id_idx" ON "pages_blocks_image_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_content_path_idx" ON "pages_blocks_image_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_static_map_markers_order_idx" ON "pages_blocks_static_map_markers" USING btree ("_order");
  CREATE INDEX "pages_blocks_static_map_markers_parent_id_idx" ON "pages_blocks_static_map_markers" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_static_map_order_idx" ON "pages_blocks_static_map" USING btree ("_order");
  CREATE INDEX "pages_blocks_static_map_parent_id_idx" ON "pages_blocks_static_map" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_static_map_path_idx" ON "pages_blocks_static_map" USING btree ("_path");
  CREATE INDEX "pages_blocks_divider_order_idx" ON "pages_blocks_divider" USING btree ("_order");
  CREATE INDEX "pages_blocks_divider_parent_id_idx" ON "pages_blocks_divider" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_divider_path_idx" ON "pages_blocks_divider" USING btree ("_path");
  CREATE INDEX "pages_blocks_timeline_entries_order_idx" ON "pages_blocks_timeline_entries" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_entries_parent_id_idx" ON "pages_blocks_timeline_entries" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_order_idx" ON "pages_blocks_timeline" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_parent_id_idx" ON "pages_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_path_idx" ON "pages_blocks_timeline" USING btree ("_path");
  CREATE INDEX "pages_blocks_team_departments_members_order_idx" ON "pages_blocks_team_departments_members" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_departments_members_parent_id_idx" ON "pages_blocks_team_departments_members" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_departments_members_photo_idx" ON "pages_blocks_team_departments_members" USING btree ("photo_id");
  CREATE INDEX "pages_blocks_team_departments_order_idx" ON "pages_blocks_team_departments" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_departments_parent_id_idx" ON "pages_blocks_team_departments" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_order_idx" ON "pages_blocks_team" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_parent_id_idx" ON "pages_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_path_idx" ON "pages_blocks_team" USING btree ("_path");
  CREATE INDEX "pages_hero_hero_media_idx" ON "pages" USING btree ("hero_media_id");
  CREATE INDEX "pages_hero_hero_media_mobile_idx" ON "pages" USING btree ("hero_media_mobile_id");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  CREATE INDEX "pages_rels_categories_id_idx" ON "pages_rels" USING btree ("categories_id");
  CREATE INDEX "_pages_v_version_hero_slides_order_idx" ON "_pages_v_version_hero_slides" USING btree ("_order");
  CREATE INDEX "_pages_v_version_hero_slides_parent_id_idx" ON "_pages_v_version_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_hero_slides_media_idx" ON "_pages_v_version_hero_slides" USING btree ("media_id");
  CREATE INDEX "_pages_v_version_hero_slides_media_mobile_idx" ON "_pages_v_version_hero_slides" USING btree ("media_mobile_id");
  CREATE INDEX "_pages_v_blocks_cta_links_order_idx" ON "_pages_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_links_parent_id_idx" ON "_pages_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_cards_order_idx" ON "_pages_v_blocks_cta_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_cards_parent_id_idx" ON "_pages_v_blocks_cta_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_cards_background_image_idx" ON "_pages_v_blocks_cta_cards" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_media_idx" ON "_pages_v_blocks_cta" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_cta_form_idx" ON "_pages_v_blocks_cta" USING btree ("form_id");
  CREATE INDEX "_pages_v_blocks_content_columns_order_idx" ON "_pages_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_columns_parent_id_idx" ON "_pages_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_columns_media_idx" ON "_pages_v_blocks_content_columns" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_content_order_idx" ON "_pages_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_parent_id_idx" ON "_pages_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_path_idx" ON "_pages_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_block_order_idx" ON "_pages_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_block_parent_id_idx" ON "_pages_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_block_path_idx" ON "_pages_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_block_media_idx" ON "_pages_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_archive_order_idx" ON "_pages_v_blocks_archive" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_archive_parent_id_idx" ON "_pages_v_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_archive_path_idx" ON "_pages_v_blocks_archive" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_form_block_order_idx" ON "_pages_v_blocks_form_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_form_block_parent_id_idx" ON "_pages_v_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_form_block_path_idx" ON "_pages_v_blocks_form_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_form_block_form_idx" ON "_pages_v_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "_pages_v_blocks_card_block_cards_order_idx" ON "_pages_v_blocks_card_block_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_block_cards_parent_id_idx" ON "_pages_v_blocks_card_block_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_block_cards_background_image_idx" ON "_pages_v_blocks_card_block_cards" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_card_block_order_idx" ON "_pages_v_blocks_card_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_block_parent_id_idx" ON "_pages_v_blocks_card_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_block_path_idx" ON "_pages_v_blocks_card_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_carousel_logo_block_items_order_idx" ON "_pages_v_blocks_carousel_logo_block_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_carousel_logo_block_items_parent_id_idx" ON "_pages_v_blocks_carousel_logo_block_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_carousel_logo_block_items_media_idx" ON "_pages_v_blocks_carousel_logo_block_items" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_carousel_logo_block_order_idx" ON "_pages_v_blocks_carousel_logo_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_carousel_logo_block_parent_id_idx" ON "_pages_v_blocks_carousel_logo_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_carousel_logo_block_path_idx" ON "_pages_v_blocks_carousel_logo_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_content_cells_links_order_idx" ON "_pages_v_blocks_image_content_cells_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_content_cells_links_parent_id_idx" ON "_pages_v_blocks_image_content_cells_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_content_cells_order_idx" ON "_pages_v_blocks_image_content_cells" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_content_cells_parent_id_idx" ON "_pages_v_blocks_image_content_cells" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_content_cells_media_idx" ON "_pages_v_blocks_image_content_cells" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_image_content_order_idx" ON "_pages_v_blocks_image_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_content_parent_id_idx" ON "_pages_v_blocks_image_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_content_path_idx" ON "_pages_v_blocks_image_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_static_map_markers_order_idx" ON "_pages_v_blocks_static_map_markers" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_static_map_markers_parent_id_idx" ON "_pages_v_blocks_static_map_markers" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_static_map_order_idx" ON "_pages_v_blocks_static_map" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_static_map_parent_id_idx" ON "_pages_v_blocks_static_map" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_static_map_path_idx" ON "_pages_v_blocks_static_map" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_divider_order_idx" ON "_pages_v_blocks_divider" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_divider_parent_id_idx" ON "_pages_v_blocks_divider" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_divider_path_idx" ON "_pages_v_blocks_divider" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_timeline_entries_order_idx" ON "_pages_v_blocks_timeline_entries" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_timeline_entries_parent_id_idx" ON "_pages_v_blocks_timeline_entries" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_order_idx" ON "_pages_v_blocks_timeline" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_timeline_parent_id_idx" ON "_pages_v_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_path_idx" ON "_pages_v_blocks_timeline" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_team_departments_members_order_idx" ON "_pages_v_blocks_team_departments_members" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_departments_members_parent_id_idx" ON "_pages_v_blocks_team_departments_members" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_departments_members_photo_idx" ON "_pages_v_blocks_team_departments_members" USING btree ("photo_id");
  CREATE INDEX "_pages_v_blocks_team_departments_order_idx" ON "_pages_v_blocks_team_departments" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_departments_parent_id_idx" ON "_pages_v_blocks_team_departments" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_order_idx" ON "_pages_v_blocks_team" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_parent_id_idx" ON "_pages_v_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_path_idx" ON "_pages_v_blocks_team" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_hero_version_hero_media_idx" ON "_pages_v" USING btree ("version_hero_media_id");
  CREATE INDEX "_pages_v_version_hero_version_hero_media_mobile_idx" ON "_pages_v" USING btree ("version_hero_media_mobile_id");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id");
  CREATE INDEX "_pages_v_rels_categories_id_idx" ON "_pages_v_rels" USING btree ("categories_id");
  CREATE INDEX "posts_populated_authors_order_idx" ON "posts_populated_authors" USING btree ("_order");
  CREATE INDEX "posts_populated_authors_parent_id_idx" ON "posts_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "posts_hero_image_m_d_idx" ON "posts" USING btree ("hero_image_m_d_id");
  CREATE INDEX "posts_hero_image_s_m_idx" ON "posts" USING btree ("hero_image_s_m_id");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id");
  CREATE INDEX "posts_rels_users_id_idx" ON "posts_rels" USING btree ("users_id");
  CREATE INDEX "_posts_v_version_populated_authors_order_idx" ON "_posts_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX "_posts_v_version_populated_authors_parent_id_idx" ON "_posts_v_version_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_hero_image_m_d_idx" ON "_posts_v" USING btree ("version_hero_image_m_d_id");
  CREATE INDEX "_posts_v_version_version_hero_image_s_m_idx" ON "_posts_v" USING btree ("version_hero_image_s_m_id");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id");
  CREATE INDEX "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id");
  CREATE INDEX "_posts_v_rels_users_id_idx" ON "_posts_v_rels" USING btree ("users_id");
  CREATE INDEX "media_folder_idx" ON "media" USING btree ("folder_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  CREATE INDEX "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "media" USING btree ("sizes_xlarge_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "categories_breadcrumbs_order_idx" ON "categories_breadcrumbs" USING btree ("_order");
  CREATE INDEX "categories_breadcrumbs_parent_id_idx" ON "categories_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "categories_breadcrumbs_doc_idx" ON "categories_breadcrumbs" USING btree ("doc_id");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_parent_idx" ON "categories" USING btree ("parent_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX "redirects_rels_pages_id_idx" ON "redirects_rels" USING btree ("pages_id");
  CREATE INDEX "redirects_rels_posts_id_idx" ON "redirects_rels" USING btree ("posts_id");
  CREATE INDEX "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE INDEX "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");
  CREATE INDEX "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");
  CREATE INDEX "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE INDEX "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE INDEX "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
  CREATE INDEX "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
  CREATE INDEX "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE INDEX "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");
  CREATE INDEX "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");
  CREATE INDEX "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE INDEX "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE INDEX "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE INDEX "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX "search_categories_order_idx" ON "search_categories" USING btree ("_order");
  CREATE INDEX "search_categories_parent_id_idx" ON "search_categories" USING btree ("_parent_id");
  CREATE INDEX "search_slug_idx" ON "search" USING btree ("slug");
  CREATE INDEX "search_meta_meta_image_idx" ON "search" USING btree ("meta_image_id");
  CREATE INDEX "search_updated_at_idx" ON "search" USING btree ("updated_at");
  CREATE INDEX "search_created_at_idx" ON "search" USING btree ("created_at");
  CREATE INDEX "search_rels_order_idx" ON "search_rels" USING btree ("order");
  CREATE INDEX "search_rels_parent_idx" ON "search_rels" USING btree ("parent_id");
  CREATE INDEX "search_rels_path_idx" ON "search_rels" USING btree ("path");
  CREATE INDEX "search_rels_posts_id_idx" ON "search_rels" USING btree ("posts_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_folders_folder_type_order_idx" ON "payload_folders_folder_type" USING btree ("order");
  CREATE INDEX "payload_folders_folder_type_parent_idx" ON "payload_folders_folder_type" USING btree ("parent_id");
  CREATE INDEX "payload_folders_name_idx" ON "payload_folders" USING btree ("name");
  CREATE INDEX "payload_folders_folder_idx" ON "payload_folders" USING btree ("folder_id");
  CREATE INDEX "payload_folders_updated_at_idx" ON "payload_folders" USING btree ("updated_at");
  CREATE INDEX "payload_folders_created_at_idx" ON "payload_folders" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_search_id_idx" ON "payload_locked_documents_rels" USING btree ("search_id");
  CREATE INDEX "payload_locked_documents_rels_payload_folders_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_folders_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_nav_items_sub_items_order_idx" ON "header_nav_items_sub_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_sub_items_parent_id_idx" ON "header_nav_items_sub_items" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX "header_rels_pages_id_idx" ON "header_rels" USING btree ("pages_id");
  CREATE INDEX "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id");
  CREATE INDEX "footer_sections_links_order_idx" ON "footer_sections_links" USING btree ("_order");
  CREATE INDEX "footer_sections_links_parent_id_idx" ON "footer_sections_links" USING btree ("_parent_id");
  CREATE INDEX "footer_sections_order_idx" ON "footer_sections" USING btree ("_order");
  CREATE INDEX "footer_sections_parent_id_idx" ON "footer_sections" USING btree ("_parent_id");
  CREATE INDEX "footer_brand_brand_logo_idx" ON "footer" USING btree ("brand_logo_id");
  CREATE INDEX "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
  CREATE INDEX "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
  CREATE INDEX "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
  CREATE INDEX "footer_rels_pages_id_idx" ON "footer_rels" USING btree ("pages_id");
  CREATE INDEX "footer_rels_posts_id_idx" ON "footer_rels" USING btree ("posts_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_hero_slides" CASCADE;
  DROP TABLE "pages_blocks_cta_links" CASCADE;
  DROP TABLE "pages_blocks_cta_cards" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_content_columns" CASCADE;
  DROP TABLE "pages_blocks_content" CASCADE;
  DROP TABLE "pages_blocks_media_block" CASCADE;
  DROP TABLE "pages_blocks_archive" CASCADE;
  DROP TABLE "pages_blocks_form_block" CASCADE;
  DROP TABLE "pages_blocks_card_block_cards" CASCADE;
  DROP TABLE "pages_blocks_card_block" CASCADE;
  DROP TABLE "pages_blocks_carousel_logo_block_items" CASCADE;
  DROP TABLE "pages_blocks_carousel_logo_block" CASCADE;
  DROP TABLE "pages_blocks_image_content_cells_links" CASCADE;
  DROP TABLE "pages_blocks_image_content_cells" CASCADE;
  DROP TABLE "pages_blocks_image_content" CASCADE;
  DROP TABLE "pages_blocks_static_map_markers" CASCADE;
  DROP TABLE "pages_blocks_static_map" CASCADE;
  DROP TABLE "pages_blocks_divider" CASCADE;
  DROP TABLE "pages_blocks_timeline_entries" CASCADE;
  DROP TABLE "pages_blocks_timeline" CASCADE;
  DROP TABLE "pages_blocks_team_departments_members" CASCADE;
  DROP TABLE "pages_blocks_team_departments" CASCADE;
  DROP TABLE "pages_blocks_team" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_version_hero_slides" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_links" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_content_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_content" CASCADE;
  DROP TABLE "_pages_v_blocks_media_block" CASCADE;
  DROP TABLE "_pages_v_blocks_archive" CASCADE;
  DROP TABLE "_pages_v_blocks_form_block" CASCADE;
  DROP TABLE "_pages_v_blocks_card_block_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_card_block" CASCADE;
  DROP TABLE "_pages_v_blocks_carousel_logo_block_items" CASCADE;
  DROP TABLE "_pages_v_blocks_carousel_logo_block" CASCADE;
  DROP TABLE "_pages_v_blocks_image_content_cells_links" CASCADE;
  DROP TABLE "_pages_v_blocks_image_content_cells" CASCADE;
  DROP TABLE "_pages_v_blocks_image_content" CASCADE;
  DROP TABLE "_pages_v_blocks_static_map_markers" CASCADE;
  DROP TABLE "_pages_v_blocks_static_map" CASCADE;
  DROP TABLE "_pages_v_blocks_divider" CASCADE;
  DROP TABLE "_pages_v_blocks_timeline_entries" CASCADE;
  DROP TABLE "_pages_v_blocks_timeline" CASCADE;
  DROP TABLE "_pages_v_blocks_team_departments_members" CASCADE;
  DROP TABLE "_pages_v_blocks_team_departments" CASCADE;
  DROP TABLE "_pages_v_blocks_team" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "posts_populated_authors" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v_version_populated_authors" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "categories_breadcrumbs" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "redirects_rels" CASCADE;
  DROP TABLE "forms_blocks_checkbox" CASCADE;
  DROP TABLE "forms_blocks_country" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_message" CASCADE;
  DROP TABLE "forms_blocks_number" CASCADE;
  DROP TABLE "forms_blocks_select_options" CASCADE;
  DROP TABLE "forms_blocks_select" CASCADE;
  DROP TABLE "forms_blocks_state" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "form_submissions_submission_data" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "search_categories" CASCADE;
  DROP TABLE "search" CASCADE;
  DROP TABLE "search_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_folders_folder_type" CASCADE;
  DROP TABLE "payload_folders" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_nav_items_sub_items" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  DROP TABLE "footer_sections_links" CASCADE;
  DROP TABLE "footer_sections" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_rels" CASCADE;
  DROP TYPE "public"."enum_pages_hero_slides_color";
  DROP TYPE "public"."enum_pages_hero_slides_cta_link_type";
  DROP TYPE "public"."enum_pages_hero_slides_cta_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_cta_cards_color";
  DROP TYPE "public"."enum_pages_blocks_cta_cards_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_variant";
  DROP TYPE "public"."enum_pages_blocks_cta_cta_type";
  DROP TYPE "public"."enum_pages_blocks_content_columns_size";
  DROP TYPE "public"."enum_pages_blocks_content_columns_type";
  DROP TYPE "public"."enum_pages_blocks_content_columns_decorator_vertical_color";
  DROP TYPE "public"."enum_pages_blocks_content_columns_decorator_horizontal_color";
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_archive_style";
  DROP TYPE "public"."enum_pages_blocks_archive_populate_by";
  DROP TYPE "public"."enum_pages_blocks_archive_relation_to";
  DROP TYPE "public"."enum_pages_blocks_archive_long_card_styles_card1";
  DROP TYPE "public"."enum_pages_blocks_archive_long_card_styles_card2";
  DROP TYPE "public"."enum_pages_blocks_archive_long_card_styles_card3";
  DROP TYPE "public"."enum_pages_blocks_archive_long_card_styles_card4";
  DROP TYPE "public"."enum_pages_blocks_card_block_cards_color";
  DROP TYPE "public"."enum_pages_blocks_card_block_cards_orientation";
  DROP TYPE "public"."enum_pages_blocks_card_block_cards_link_type";
  DROP TYPE "public"."enum_pages_blocks_image_content_cells_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_image_content_cells_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_image_content_cells_type";
  DROP TYPE "public"."enum_pages_blocks_static_map_variant";
  DROP TYPE "public"."enum_pages_blocks_divider_pattern";
  DROP TYPE "public"."enum_pages_blocks_divider_primary_color";
  DROP TYPE "public"."enum_pages_blocks_divider_secondary_color";
  DROP TYPE "public"."enum_pages_blocks_timeline_entries_link_type";
  DROP TYPE "public"."enum_pages_blocks_team_departments_members_link_type";
  DROP TYPE "public"."enum_pages_blocks_team_departments_color";
  DROP TYPE "public"."enum_pages_hero_type";
  DROP TYPE "public"."enum_pages_hero_bg_color";
  DROP TYPE "public"."enum_pages_hero_cta_link_type";
  DROP TYPE "public"."enum_pages_hero_cta_link_appearance";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_hero_slides_color";
  DROP TYPE "public"."enum__pages_v_version_hero_slides_cta_link_type";
  DROP TYPE "public"."enum__pages_v_version_hero_slides_cta_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_cta_cards_color";
  DROP TYPE "public"."enum__pages_v_blocks_cta_cards_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_variant";
  DROP TYPE "public"."enum__pages_v_blocks_cta_cta_type";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_type";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_decorator_vertical_color";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_decorator_horizontal_color";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_archive_style";
  DROP TYPE "public"."enum__pages_v_blocks_archive_populate_by";
  DROP TYPE "public"."enum__pages_v_blocks_archive_relation_to";
  DROP TYPE "public"."enum__pages_v_blocks_archive_long_card_styles_card1";
  DROP TYPE "public"."enum__pages_v_blocks_archive_long_card_styles_card2";
  DROP TYPE "public"."enum__pages_v_blocks_archive_long_card_styles_card3";
  DROP TYPE "public"."enum__pages_v_blocks_archive_long_card_styles_card4";
  DROP TYPE "public"."enum__pages_v_blocks_card_block_cards_color";
  DROP TYPE "public"."enum__pages_v_blocks_card_block_cards_orientation";
  DROP TYPE "public"."enum__pages_v_blocks_card_block_cards_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_image_content_cells_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_image_content_cells_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_image_content_cells_type";
  DROP TYPE "public"."enum__pages_v_blocks_static_map_variant";
  DROP TYPE "public"."enum__pages_v_blocks_divider_pattern";
  DROP TYPE "public"."enum__pages_v_blocks_divider_primary_color";
  DROP TYPE "public"."enum__pages_v_blocks_divider_secondary_color";
  DROP TYPE "public"."enum__pages_v_blocks_timeline_entries_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_team_departments_members_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_team_departments_color";
  DROP TYPE "public"."enum__pages_v_version_hero_type";
  DROP TYPE "public"."enum__pages_v_version_hero_bg_color";
  DROP TYPE "public"."enum__pages_v_version_hero_cta_link_type";
  DROP TYPE "public"."enum__pages_v_version_hero_cta_link_appearance";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_posts_hero_overlay_color";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_hero_overlay_color";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum_redirects_to_type";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_payload_folders_folder_type";
  DROP TYPE "public"."enum_header_nav_items_sub_items_link_type";
  DROP TYPE "public"."enum_header_nav_items_item_type";
  DROP TYPE "public"."enum_header_nav_items_link_type";
  DROP TYPE "public"."enum_footer_sections_links_link_type";`)
}
