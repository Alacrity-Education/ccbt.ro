import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { cn } from '@/utilities/ui'
import { SectionDivider, type SectionDividerProps } from '@/components/SectionDivider'

// Blocks that butt directly against the section above them (their top margin is
// cancelled), keeping only bottom spacing. Add any full-bleed block that should
// sit flush on top here. (Dividers now keep spacing on both sides, so they're not
// listed — they get the normal bottom margin plus the preceding block's margin.)
const FLUSH_BLOCKS = new Set<string>([])

// Vertical spacing between blocks. A flush block cancels the preceding block's
// bottom margin with an equal negative top margin so it sits flush on top.
// The two are one measure: change them together or a flush block stops being
// flush.
const BLOCK_MARGIN = 'mb-24'
const FLUSH_PULL = '-mt-24'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {CardBlock} from "@/blocks/CardBlock/Component";
import { CarouselLogoBlock } from "@/blocks/LogoCarouselBlock/Component";
import { StaticMapBlock } from "@/blocks/StaticMap/Component";
import { TimelineBlock } from "@/blocks/Timeline/Component";
import { TeamBlock } from "@/blocks/Team/Component";

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  cardBlock: CardBlock,
  carouselLogoBlock: CarouselLogoBlock,
  staticMap: StaticMapBlock,
  timeline: TimelineBlock,
  team: TeamBlock,
}

/** The section-level fields every block carries (see fields/sectionLayout). */
type BlockLayout = {
  fullWidth?: boolean | null
  dividerTop?: SectionDividerProps & { enabled?: boolean | null }
  dividerBottom?: SectionDividerProps & { enabled?: boolean | null }
}

export const RenderBlocks: React.FC<{
  blocks: NonNullable<Page['layout']>
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              const flush = FLUSH_BLOCKS.has(blockType)
              const { fullWidth, dividerTop, dividerBottom } =
                block as BlockLayout

              return (
                <div
                  // `data-full-bleed` hands the motif's lane back to the
                  // content, so the block runs at the container's full measure
                  // and the ribbon passes behind it. See globals.css.
                  data-full-bleed={fullWidth ? '' : undefined}
                  className={cn(
                    // Every block keeps bottom spacing; flush blocks additionally
                    // pull up over the previous block's margin (unless first).
                    BLOCK_MARGIN,
                    flush && index > 0 && FLUSH_PULL,
                    // Two things at once: the block takes the container's full
                    // measure back (see `data-full-bleed` above), and its own
                    // opaque background covers the ribbon running behind it —
                    // which is what makes a full-width section read as a break.
                    fullWidth && 'bg-base-200 relative w-full',
                  )}
                  key={index}
                >
                  {dividerTop?.enabled && (
                    <SectionDivider {...dividerTop} uid={`${index}-top`} />
                  )}

                  {/* Sits inside the dividers rather than on the wrapper, so a
                      divider stays flush against the block's edge instead of
                      floating in from it. */}
                  <div className={cn(fullWidth && 'py-10 lg:py-14')}>
                    {/* @ts-expect-error there may be some mismatch between the expected types here */}
                    <Block {...block} disableInnerContainer />
                  </div>

                  {dividerBottom?.enabled && (
                    <SectionDivider {...dividerBottom} uid={`${index}-bottom`} />
                  )}
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
