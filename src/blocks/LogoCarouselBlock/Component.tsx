import React from 'react'
import Carousel, { CarouselCard } from './Component.client'
import type { CarouselLogoBlock as CarouselLogoProps } from '@/payload-types'

export const CarouselLogoBlock: React.FC<CarouselLogoProps> = async ({ items }) => {
  return (
    <div>
      <Carousel>
        {items?.map((item, index) => (
          item.media && <CarouselCard key={index} link={item.link || ''} media={item.media} />
        ))}
      </Carousel>
    </div>
  )
}