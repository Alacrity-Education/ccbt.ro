'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useRef } from 'react'

import type { Props as MediaProps } from '../types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { onClick, resource, videoClassName } = props

  const videoRef = useRef<HTMLVideoElement>(null)
  // const [showFallback] = useState<boolean>()

  useEffect(() => {
    const { current: video } = videoRef
    if (video) {
      video.addEventListener('suspend', () => {
        // setShowFallback(true);
        // console.warn('Video was suspended, rendering fallback image.')
      })
    }
  }, [])

  if (resource && typeof resource === 'object') {
    const { filename, url, updatedAt } = resource

    /**
     * The upload's own URL, not `/media/<filename>`.
     *
     * `public/media` is where Payload writes uploads on the machine running
     * the CMS. It is gitignored and lives on that container's volume, so it is
     * not part of either deployment's static files — on ccbt.ro the directory
     * does not exist at all. The API route Payload serves uploads from is the
     * only address that works from both sites, and `getMediaUrl` points it at
     * the CMS origin. The filename fallback is for a resource read at a depth
     * that left `url` off.
     */
    const source = getMediaUrl(url || `/api/media/file/${filename}`, updatedAt)

    return (
      <video
        autoPlay
        className={cn(videoClassName)}
        controls={false}
        loop
        muted
        onClick={onClick}
        playsInline
        ref={videoRef}
      >
        <source src={source} />
      </video>
    )
  }

  return null
}
