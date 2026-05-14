import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { CardBlock } from "@/blocks/CardBlock/Component"
import { LogoCarousel } from "@/blocks/LogoCarouselBlock/Component.client"
import { ImageContentBlock } from "@/blocks/ImageContent/Component"
import { StaticMapBlock } from "@/blocks/StaticMap/Component"
import { AboutSectionBlock } from "@/blocks/AboutSection/Component"
import { TeamTeaserBlock } from "@/blocks/TeamTeaser/Component"
import { ChronologyBlock } from "@/blocks/ChronologyBlock/Component"

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  cardBlock: CardBlock,
  logoCarousel: LogoCarousel,
  imageContent: ImageContentBlock,
  staticMap: StaticMapBlock,
  aboutSection: AboutSectionBlock,
  teamTeaser: TeamTeaserBlock,
  chronology: ChronologyBlock,
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
            const Block = blockComponents[blockType as keyof typeof blockComponents]

            if (Block) {
              return (
                // @ts-expect-error block type mismatch between generated types
                <Block key={index} {...block} />
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
