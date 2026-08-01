import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { cn } from '@/utilities/ui'

// Blocks that butt directly against the section above them (their top margin is
// cancelled), keeping only bottom spacing. Add any full-bleed block that should
// sit flush on top here. (Dividers now keep spacing on both sides, so they're not
// listed — they get the normal bottom margin plus the preceding block's margin.)
const FLUSH_BLOCKS = new Set<string>([])

// Vertical spacing between blocks. A flush block cancels the preceding block's
// bottom margin with an equal negative top margin so it sits flush on top.
const BLOCK_MARGIN = 'mb-16'
const FLUSH_PULL = '-mt-16'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {CardBlock} from "@/blocks/CardBlock/Component";
import { CarouselLogoBlock } from "@/blocks/LogoCarouselBlock/Component";
import { ImageContentBlock } from "@/blocks/ImageContent/Component";
import { StaticMapBlock } from "@/blocks/StaticMap/Component";
import { DividerBlock } from "@/blocks/Divider/Component";
import { TimelineBlock } from "@/blocks/Timeline/Component";

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  cardBlock: CardBlock,
  carouselLogoBlock: CarouselLogoBlock,
  imageContent: ImageContentBlock,
  staticMap: StaticMapBlock,
  divider: DividerBlock,
  timeline: TimelineBlock,
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
              return (
                <div
                  className={cn(
                    // Every block keeps bottom spacing; flush blocks additionally
                    // pull up over the previous block's margin (unless first).
                    BLOCK_MARGIN,
                    flush && index > 0 && FLUSH_PULL,
                  )}
                  key={index}
                >
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
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
