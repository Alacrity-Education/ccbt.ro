'use client'

import type { PayloadAdminBarProps, PayloadMeUser } from '@payloadcms/admin-bar'

import { cn } from '@/utilities/ui'
import { useSelectedLayoutSegments } from 'next/navigation'
import { PayloadAdminBar } from '@payloadcms/admin-bar'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import './index.scss'

import { getClientSideURL } from '@/utilities/getURL'

const baseClass = 'admin-bar'

const collectionLabels = {
  pages: {
    plural: 'Pages',
    singular: 'Page',
  },
  posts: {
    plural: 'Posts',
    singular: 'Post',
  },
  projects: {
    plural: 'Projects',
    singular: 'Project',
  },
}

const Title: React.FC = () => <span>Dashboard</span>

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps
}> = (props) => {
  const { adminBarProps } = props || {}
  const segments = useSelectedLayoutSegments()
  const [show, setShow] = useState(false)
  const barRef = React.useRef<HTMLDivElement>(null)
  const collection = (
    collectionLabels[segments?.[1] as keyof typeof collectionLabels] ? segments[1] : 'pages'
  ) as keyof typeof collectionLabels
  const router = useRouter()

  const onAuthChange = React.useCallback((user: PayloadMeUser) => {
    setShow(Boolean(user?.id))
  }, [])

  /**
   * Publishes this bar's height, so the fixed header can sit below it.
   *
   * The bar is in normal flow and the header is `fixed top-0`, which means the
   * header is drawn over the bar while the bar still takes up its own height
   * further down the page. Everything below ends up pushed by exactly that
   * much, and the result is a band of page background between the header and
   * the content — the bar's space, with the bar itself hidden behind the
   * header. Only someone logged in ever sees it, which is what made it so hard
   * to pin down.
   *
   * Measured rather than hardcoded: the bar's height follows its own contents
   * and its padding, and a number written here would be wrong the first time
   * either changed.
   */
  React.useEffect(() => {
    const root = document.documentElement
    const apply = () => {
      const h = show ? (barRef.current?.offsetHeight ?? 0) : 0
      root.style.setProperty('--admin-bar-height', `${h}px`)
    }

    apply()
    if (!show) return

    const observer = new ResizeObserver(apply)
    if (barRef.current) observer.observe(barRef.current)
    return () => observer.disconnect()
  }, [show])

  return (
    <div
      ref={barRef}
      className={cn(baseClass, 'py-2 bg-black text-white', {
        block: show,
        hidden: !show,
      })}
    >
      <div className="container">
        <PayloadAdminBar
          {...adminBarProps}
          className="py-2 text-white"
          classNames={{
            controls: 'font-medium text-white',
            logo: 'text-white',
            user: 'text-white',
          }}
          cmsURL={getClientSideURL()}
          collectionSlug={collection}
          collectionLabels={{
            plural: collectionLabels[collection]?.plural || 'Pages',
            singular: collectionLabels[collection]?.singular || 'Page',
          }}
          logo={<Title />}
          onAuthChange={onAuthChange}
          onPreviewExit={() => {
            fetch('/next/exit-preview').then(() => {
              router.push('/')
              router.refresh()
            })
          }}
          style={{
            backgroundColor: 'transparent',
            padding: 0,
            position: 'relative',
            zIndex: 'unset',
          }}
        />
      </div>
    </div>
  )
}
