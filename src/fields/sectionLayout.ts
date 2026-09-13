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
  { name: 'enabled', type: 'checkbox', label: 'Enable', defaultValue: false },
  {
    name: 'pattern',
    type: 'select',
    label: 'Pattern',
    defaultValue: 'a',
    options: patternOptions,
    admin: { condition: (_, sibling) => Boolean(sibling?.enabled) },
  },
  {
    // Short names on purpose: Postgres caps identifiers at 63 characters, and
    // `<table>_divider_top_secondary_color` runs past it on the longer block
    // slugs. The labels above carry the full meaning for the editor.
    name: 'bars',
    type: 'select',
    label: 'Primary color (bars)',
    defaultValue: 'default',
    options: colorOptions,
    admin: { condition: (_, sibling) => Boolean(sibling?.enabled) },
  },
  {
    name: 'accent',
    type: 'select',
    label: 'Secondary color (accent)',
    defaultValue: 'default',
    options: colorOptions,
    admin: { condition: (_, sibling) => Boolean(sibling?.enabled) },
  },
]

/**
 * The two things every block can do to the page around it.
 *
 * `fullWidth` takes the block out of the motif's lane: it paints its own
 * background across the whole screen, which covers the ribbon running behind the
 * blocks (see components/PageMotif) and reads as a break in it.
 *
 * The dividers are independent of it. They started out tied to full width, as
 * the finished edge of that break, but a divider is just as useful as a rule
 * between two ordinary sections — so every block can carry one at either edge,
 * whatever else it is doing.
 */
export const sectionLayout = (): Field[] => [
  {
    name: 'fullWidth',
    type: 'checkbox',
    label: 'Full width',
    defaultValue: false,
  },
  {
    name: 'dividerTop',
    type: 'group',
    label: 'Divider — top',
    fields: dividerFields,
  },
  {
    name: 'dividerBottom',
    type: 'group',
    label: 'Divider — bottom',
    fields: dividerFields,
  },
]
