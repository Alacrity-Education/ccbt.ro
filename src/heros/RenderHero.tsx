import React from 'react'

import type { Page } from '@/payload-types'

import { Hero, type HeroImpact } from './Home'
import type { HeroColor, HeroOverlay } from './heroColor'
import { SlidingHero } from '@/heros/SlidingHero'

// Stored enum value → impact level. See src/heros/config.ts for the mapping:
// homeHero = High Impact, highImpactHero = Medium Impact, lowImpact = Low Impact.
const IMPACT: Record<string, HeroImpact> = {
  homeHero: 'high',
  highImpactHero: 'medium',
  lowImpact: 'low',
}

type RenderHeroProps = Page['hero']

export const RenderHero: React.FC<RenderHeroProps> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const selected = (props as { bgColor?: HeroOverlay | null }).bgColor ?? null

  // High Impact & Sliding are gradient heroes over media with light text — they
  // need a dark surface, so "base" is not a valid choice and falls back to purple.
  // "none" is the one exception: it is a decision to draw no overlay, not an
  // unset value, so it passes through rather than being filled in.
  const gradientColor: HeroOverlay =
    selected === 'none' ? 'none' : selected && selected !== 'base' ? selected : 'purple'

  let hero: React.ReactNode = null

  if (type === 'slidingHero') {
    hero = <SlidingHero {...props} color={gradientColor} />
  } else {
    const impact = IMPACT[type]
    if (!impact) return null

    // High impact uses the gradient color; medium/low use their own bgColor (base
    // ok). Those two paint the colour as their surface rather than over media,
    // so "none" would leave them with no background at all — they read it as the
    // neutral base instead.
    const color: HeroOverlay =
      impact === 'high'
        ? gradientColor
        : selected && selected !== 'none'
          ? (selected as HeroColor)
          : 'base'

    hero = <Hero {...props} impact={impact} color={color} />
  }

  return (
    <>
      {hero}
      {/* Purple transition strip between the hero and the sections below. */}
      <div className="h-10 w-full bg-primary" />
    </>
  )
}
