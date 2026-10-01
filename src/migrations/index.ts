import * as migration_20260806_132502_initial from './20260806_132502_initial';
import * as migration_20260912_112737_add_brand_plinth_appearance from './20260912_112737_add_brand_plinth_appearance';
import * as migration_20260913_075405_remove_image_content_add_center_content from './20260913_075405_remove_image_content_add_center_content';
import * as migration_20260913_083045_reduce_hero_link_appearances from './20260913_083045_reduce_hero_link_appearances';
import * as migration_20260913_092930 from './20260913_092930';
import * as migration_20260913_094411_rename_cta_highlight_to_base from './20260913_094411_rename_cta_highlight_to_base';
import * as migration_20260914_154015_card_block_title from './20260914_154015_card_block_title';
import * as migration_20260914_160117_mcp_plugin_api_keys from './20260914_160117_mcp_plugin_api_keys';
import * as migration_20260915_094522_hero_object_fit from './20260915_094522_hero_object_fit';
import * as migration_20260916_152042_strip_section_layout_cards_refactor from './20260916_152042_strip_section_layout_cards_refactor';
import * as migration_20261001_151523_show_motif_toggle from './20261001_151523_show_motif_toggle';

export const migrations = [
  {
    up: migration_20260806_132502_initial.up,
    down: migration_20260806_132502_initial.down,
    name: '20260806_132502_initial',
  },
  {
    up: migration_20260912_112737_add_brand_plinth_appearance.up,
    down: migration_20260912_112737_add_brand_plinth_appearance.down,
    name: '20260912_112737_add_brand_plinth_appearance',
  },
  {
    up: migration_20260913_075405_remove_image_content_add_center_content.up,
    down: migration_20260913_075405_remove_image_content_add_center_content.down,
    name: '20260913_075405_remove_image_content_add_center_content',
  },
  {
    up: migration_20260913_083045_reduce_hero_link_appearances.up,
    down: migration_20260913_083045_reduce_hero_link_appearances.down,
    name: '20260913_083045_reduce_hero_link_appearances',
  },
  {
    up: migration_20260913_092930.up,
    down: migration_20260913_092930.down,
    name: '20260913_092930',
  },
  {
    up: migration_20260913_094411_rename_cta_highlight_to_base.up,
    down: migration_20260913_094411_rename_cta_highlight_to_base.down,
    name: '20260913_094411_rename_cta_highlight_to_base',
  },
  {
    up: migration_20260914_154015_card_block_title.up,
    down: migration_20260914_154015_card_block_title.down,
    name: '20260914_154015_card_block_title',
  },
  {
    up: migration_20260914_160117_mcp_plugin_api_keys.up,
    down: migration_20260914_160117_mcp_plugin_api_keys.down,
    name: '20260914_160117_mcp_plugin_api_keys',
  },
  {
    up: migration_20260915_094522_hero_object_fit.up,
    down: migration_20260915_094522_hero_object_fit.down,
    name: '20260915_094522_hero_object_fit',
  },
  {
    up: migration_20260916_152042_strip_section_layout_cards_refactor.up,
    down: migration_20260916_152042_strip_section_layout_cards_refactor.down,
    name: '20260916_152042_strip_section_layout_cards_refactor',
  },
  {
    up: migration_20261001_151523_show_motif_toggle.up,
    down: migration_20261001_151523_show_motif_toggle.down,
    name: '20261001_151523_show_motif_toggle'
  },
];
