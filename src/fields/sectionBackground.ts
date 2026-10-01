import type { Field } from 'payload'

/**
 * Whether the page motif shows through this block.
 *
 * The ribbon runs behind every block at z-index -10 (see components/PageMotif),
 * so a block shows it simply by having no background of its own. Turning this
 * off gives the block `bg-base-100`, which covers the ribbon for the height of
 * the section — the way to stop the weave running behind copy that needs a
 * clean field.
 *
 * Defaults to on, which is how every block behaved before the field existed.
 */
export const sectionBackground: Field = {
  name: 'showMotif',
  type: 'checkbox',
  label: 'Make motif visible',
  defaultValue: true,
}
