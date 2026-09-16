import type { Field } from 'payload'

import { DIVIDER_COLORS, brandOptions } from '@/utilities/brand'

const colorOptions = [
  { label: 'Default (pattern)', value: 'default' },
  ...brandOptions(DIVIDER_COLORS),
]

const patternOptions = [
  { label: 'Pattern A — short', value: 'a' },
  { label: 'Pattern B — medium', value: 'b' },
  { label: 'Pattern C — thin', value: 'c' },
  { label: 'Pattern D — tall', value: 'd' },
]

const dividerFields: Field[] = [
  {
    name: 'pattern',
    type: 'select',
    label: 'Pattern',
    defaultValue: 'a',
    // Short names on purpose: Postgres caps identifiers at 63 characters, and
    // `<table>_divider_top_secondary_color` runs past it on the longer block
    // slugs. The labels carry the full meaning for the editor.
    options: patternOptions,
  },
  {
    name: 'bars',
    type: 'select',
    label: 'Primary color (bars)',
    defaultValue: 'default',
    options: colorOptions,
  },
  {
    name: 'accent',
    type: 'select',
    label: 'Secondary color (accent)',
    defaultValue: 'default',
    options: colorOptions,
  },
]

/**
 * The top and bottom dividers a full-width section is finished with.
 *
 * Only two blocks carry these — the base CTA and the timeline — and for those
 * two the dividers are not optional: the block always runs full width and always
 * draws both edges, because the band needs finishing either way. What is left to
 * the editor is which pattern and which colours, which is what these fields are.
 *
 * `condition` exists for the CTA, where the treatment belongs to one variant.
 */
export const sectionDividers = (
  condition?: (data: unknown, siblingData: Record<string, unknown>) => boolean,
): Field[] => [
  {
    name: 'dividerTop',
    type: 'group',
    label: 'Divider — top',
    fields: dividerFields,
    admin: condition ? { condition } : undefined,
  },
  {
    name: 'dividerBottom',
    type: 'group',
    label: 'Divider — bottom',
    fields: dividerFields,
    admin: condition ? { condition } : undefined,
  },
]
