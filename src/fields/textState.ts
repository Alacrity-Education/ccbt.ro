import { BRAND } from '@/utilities/brand'

/**
 * Inline text colors offered by every rich text field, kept to the three brand
 * tokens plus one decorated variant.
 *
 * The two maps below describe the same states from opposite sides and have to be
 * kept in step, which is why they live in one file:
 *
 * - `TEXT_STATE` styles the text *inside the admin editor*. The admin panel does
 *   not load the frontend stylesheet, so `--ccbt-*` and `--color-*` resolve to
 *   nothing there — these have to be literal hexes, taken from BRAND so there is
 *   still a single source of truth.
 * - `TEXT_STATE_CLASS` styles the *rendered page*, as Tailwind classes, so the
 *   output follows the theme rather than being frozen to a hex.
 */
export const TEXT_STATE = {
  color: {
    purple: { label: 'Purple', css: { color: BRAND.purple.hex } },
    coral: { label: 'Coral', css: { color: BRAND.coral.hex } },
    cyan: { label: 'Cyan', css: { color: BRAND.cyan.hex } },
    // The hand-drawn arrow is frontend-only; in the editor this reads as purple
    // text, and the positioning below is what the arrow will anchor to.
    arrowUnderline: {
      label: 'Arrow underline',
      css: {
        color: BRAND.purple.hex,
        position: 'relative',
        display: 'inline-block',
      },
    },
  },
  // `as const` so `position`/`display` keep their literal types — csstype types
  // those properties as unions of literals, which a widened `string` fails.
} as const

export const TEXT_STATE_CLASS = {
  purple: 'text-primary',
  coral: 'text-secondary',
  cyan: 'text-accent',
  arrowUnderline: 'text-primary relative inline-block',
} as const

export type TextColorState = keyof typeof TEXT_STATE_CLASS
