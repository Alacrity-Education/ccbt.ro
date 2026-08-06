import { BRAND, type HeroSurfaceColor } from "@/utilities/brand";

export type HeroColor = HeroSurfaceColor;

/**
 * Resolves a hero's chosen brand colour into the value the scrim paints with and
 * whether the surface needs light text.
 *
 * Deliberately in its own module rather than alongside the Hero component: that
 * file is `"use client"`, and anything exported from a client module becomes a
 * client reference — so the server-rendered PostHero calling it there failed with
 * "Attempted to call resolveColor() from the server".
 */
export function resolveColor(color: HeroColor) {
  const entry = BRAND[color] ?? BRAND.base;
  return { bg: entry.cssVar ?? entry.hex, dark: entry.dark };
}
