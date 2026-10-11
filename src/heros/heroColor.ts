import { BRAND, type HeroSurfaceColor } from "@/utilities/brand";

export type HeroColor = HeroSurfaceColor;

/**
 * What a gradient hero can be set to, which includes not drawing one at all.
 * Kept apart from HeroColor because `none` is not a colour: nothing else that
 * takes a brand colour should have to understand it.
 */
export type HeroOverlay = HeroColor | "none";

/**
 * Resolves a hero's chosen brand colour into the value the scrim paints with and
 * whether the surface needs light text.
 *
 * Deliberately in its own module rather than alongside the Hero component: that
 * file is `"use client"`, and anything exported from a client module becomes a
 * client reference — so the server-rendered PostHero calling it there failed with
 * "Attempted to call resolveColor() from the server".
 */
export function resolveColor(color: HeroOverlay): {
  bg: string | undefined;
  dark: boolean;
} {
  // No overlay: nothing to paint, and nothing to fill the letterbox around a
  // `contain` image with either — both read `bg`. The copy still sits over the
  // media, which is what light text was chosen for, so `dark` stays true.
  if (color === "none") return { bg: undefined, dark: true };

  const entry = BRAND[color] ?? BRAND.base;
  return { bg: entry.cssVar ?? entry.hex, dark: entry.dark };
}
