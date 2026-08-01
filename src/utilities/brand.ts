export type BrandColor =
  | 'purple'
  | 'coral'
  | 'cyan'
  | 'green'
  | 'ink'
  | 'base'
  | 'white'
  | 'pink'
  | 'amber'
  | 'coralBright'

type BrandEntry = {
  /** Shown in the admin select. */
  label: string
  hex: string
  cssVar?: string
  /** True when the surface is dark enough to need light foreground text. */
  dark: boolean
  /**
   * Full Tailwind class strings, never assembled at runtime — the compiler only
   * emits classes it can find written out in the source.
   */
  surface?: string
  fill?: string
}

export const BRAND: Record<BrandColor, BrandEntry> = {
  purple: {
    label: 'Purple',
    hex: '#5F0058',
    cssVar: 'var(--ccbt-purple)',
    dark: true,
    surface: 'bg-primary text-primary-content',
    fill: 'fill-primary',
  },
  coral: {
    label: 'Coral',
    hex: '#E84935',
    cssVar: 'var(--ccbt-coral)',
    dark: true,
    surface: 'bg-secondary text-secondary-content',
    fill: 'fill-secondary',
  },
  cyan: {
    label: 'Cyan',
    hex: '#5ED9FC',
    cssVar: 'var(--ccbt-cyan)',
    dark: false,
    surface: 'bg-accent text-accent-content',
    fill: 'fill-accent',
  },
  green: {
    label: 'Green',
    hex: '#009E5C',
    cssVar: 'var(--ccbt-green)',
    dark: true,
    surface: 'bg-success text-success-content',
    fill: 'fill-success',
  },
  ink: {
    label: 'Ink',
    hex: '#201D1E',
    cssVar: 'var(--ccbt-ink)',
    dark: true,
    surface: 'bg-neutral text-neutral-content',
    fill: 'fill-neutral',
  },
  base: {
    label: 'Base (light)',
    hex: '#F1F3FB',
    cssVar: 'var(--ccbt-base)',
    dark: false,
    surface: 'bg-base-100 text-base-content',
    fill: 'fill-base-100',
  },
  white: { label: 'White', hex: '#FFFFFF', cssVar: 'var(--ccbt-white)', dark: false },
  // Artwork-only shades: they appear inside exported SVGs and have no theme token.
  pink: { label: 'Pink', hex: '#F6C4DA', dark: false },
  amber: { label: 'Amber', hex: '#9B5B00', dark: true },
  // The brighter coral used by the divider artwork (--ccbt-coral-bright). Not
  // offered as a choice; it exists so the difference from `coral` is documented
  // rather than looking like a typo.
  coralBright: { label: 'Coral (bright)', hex: '#FB3524', cssVar: 'var(--ccbt-coral-bright)', dark: true },
}

/** Builds Payload select options for a subset of the palette, in the given order. */
export const brandOptions = (names: readonly BrandColor[]) =>
  names.map((name) => ({ label: BRAND[name].label, value: name }))

/** The four-color set offered by cards, decorators and other solid surfaces. */
export const SURFACE_COLORS = ['coral', 'purple', 'cyan', 'green'] as const
export type SurfaceColor = (typeof SURFACE_COLORS)[number]

/**
 * High Impact & Sliding heroes draw a gradient over media with light text, so the
 * neutral page base is not a valid surface for them — RenderHero falls back to
 * purple when it is chosen anyway.
 */
export const GRADIENT_COLORS = ['purple', 'green', 'coral', 'cyan'] as const

/** Hero backgrounds, which additionally allow the neutral page base. */
export const HERO_COLORS = ['base', ...GRADIENT_COLORS] as const
export type HeroSurfaceColor = (typeof HERO_COLORS)[number]

/** The wider set the divider artwork can be recolored to. */
export const DIVIDER_COLORS = [
  'purple',
  'coral',
  'cyan',
  'green',
  'pink',
  'amber',
  'white',
  'ink',
] as const

const entry = (name: string | null | undefined, fallback: BrandColor) =>
  BRAND[name as BrandColor] ?? BRAND[fallback]

/** Background + readable foreground classes for a solid panel. */
export const brandSurface = (name: string | null | undefined, fallback: BrandColor = 'coral') =>
  entry(name, fallback).surface ?? BRAND[fallback].surface

/** SVG `fill-*` class. */
export const brandFill = (name: string | null | undefined, fallback: BrandColor = 'coral') =>
  entry(name, fallback).fill ?? BRAND[fallback].fill

/** Raw hex, for SVG source strings and anywhere a class won't do. */
export const brandHex = (name: string | null | undefined, fallback: BrandColor = 'coral') =>
  entry(name, fallback).hex
