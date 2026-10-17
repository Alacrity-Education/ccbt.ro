'use client'

import React, { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'

interface CarouselProps {
  children?: ReactNode
}

export const CarouselCard = ({ media, link }: { media: MediaType | number; link: string }) => (
  // `draggable={false}`: a native link drag starts a ghost image and swallows
  // the pointer, so the first few pixels of every drag that began on a logo —
  // which is most of them — went to the browser instead of to the carousel.
  <Link href={link} target="_blank" rel="noopener noreferrer" draggable={false}>
    <div className="flex items-center justify-center p-2 h-30 sm:h-40 aspect-square bg-white border border-primary/40 rounded-lg overflow-hidden hover:shadow-lg transition-shadow shrink-0">
      <Media
        imgClassName="h-full w-full object-contain"
        pictureClassName="h-full w-full object-contain"
        className="h-full w-full object-contain"
        resource={media}
      />
    </div>
  </Link>
)

// Exponential-decay spring — higher = snappier (0.1 sluggish … 0.25 snappy)
const FRICTION = 0.18
// Auto-scroll speed in px per frame at 60 fps (1 ≈ 60 px/s)
const AUTO_SPEED = 1
// How far the pointer must travel before a press counts as a drag rather than
// a click. Below it the logo's link still opens; at or past it the click that
// ends the drag is swallowed, or every drag would navigate away.
const DRAG_SLOP = 5
// How much of the release velocity carries on as a throw. The spring already
// decays, so this only decides how far one flick travels.
const THROW = 12

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const trackRef  = useRef<HTMLDivElement>(null)
  const copy1Ref  = useRef<HTMLDivElement>(null)
  const wrapRef   = useRef<HTMLDivElement>(null)
  const posRef    = useRef(0)    // current animated position
  const targetRef = useRef(0)    // destination the spring chases
  const pausedRef = useRef(false)
  const rafRef    = useRef<number | null>(null)
  // Live drag: where the pointer went down, where the track was at the time,
  // how far it has travelled since, and the last step's distance — which is
  // the velocity the throw is built from.
  const dragRef   = useRef<{ id: number; startX: number; startPos: number; lastX: number; velocity: number; distance: number; captured: boolean } | null>(null)
  // Raised by a drag that travelled, lowered by the click it produced.
  const clickGuardRef = useRef(false)
  const [dragging, setDragging] = useState(false)
  const [numCopies, setNumCopies] = useState(10)

  const items = React.Children.toArray(children).filter(Boolean)

  // Width of one copy: items + internal gap-6 spacings + trailing pr-6 padding
  // (the trailing padding makes the inter-copy visual gap match the inter-item gap)
  const getW = () => copy1Ref.current?.offsetWidth ?? 0
  const computeCopies = (W: number) => Math.max(3, Math.ceil(window.innerWidth / W) + 2)

  // Map any raw position into the middle-copy zone (-2W, -W] via modulo (O(1)).
  // Because all three copies are identical, the wrap is undetectable.
  const normalise = (raw: number, W: number): number => {
    if (W < 1) return raw
    const x = ((raw + 2 * W) % W + W) % W
    return x === 0 ? -W : x - 2 * W
  }

  const applyTransform = (raw: number) => {
    const track = trackRef.current
    const W = getW()
    if (!track || W === 0) return
    track.style.transform = `translateX(${normalise(raw, W)}px)`
  }

  // Initialise to the start of the middle copy before the first paint
  useLayoutEffect(() => {
    const W = getW()
    if (!W) return
    posRef.current    = -W
    targetRef.current = -W
    applyTransform(-W)
    setNumCopies(computeCopies(W))
  }, [items.length])

  // Continuous spring loop — always running so arrow clicks are immediately responsive
  useEffect(() => {
    const tick = () => {
      const W = getW()
      if (W > 0) {
        // Auto-scroll: advance both pos and target together so there is no
        // spring lag for the baseline drift. Paused while the user hovers or touches.
        // Use half speed on narrow screens so fast motion doesn't feel jarring.
        //
        // A live drag is checked for separately rather than left to the pause
        // flag: a mouse that leaves the element mid-drag fires `mouseleave`,
        // which resumes, and the drift would then fight the pointer for the
        // position every frame.
        if (!pausedRef.current && !dragRef.current) {
          const speed = window.innerWidth < 640 ? AUTO_SPEED * 0.5 : AUTO_SPEED
          posRef.current    -= speed
          targetRef.current -= speed
        }

        // When pos crosses a copy boundary, normalise it and shift target by the
        // same delta so the spring's remaining distance is perfectly preserved.
        // A drag in progress is anchored to an absolute position too, so it
        // takes the same shift — otherwise the next pointer move would undo
        // the wrap and the track would jump a whole copy backwards.
        const n = normalise(posRef.current, W)
        if (n !== posRef.current) {
          targetRef.current += n - posRef.current
          if (dragRef.current) dragRef.current.startPos += n - posRef.current
          posRef.current = n
        }

        const diff = targetRef.current - posRef.current
        if (Math.abs(diff) < 0.3) {
          posRef.current = targetRef.current
        } else {
          posRef.current += diff * FRICTION
        }
        applyTransform(posRef.current)
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [items.length])

  // Pause auto-scroll on hover and touch
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const pause  = () => { pausedRef.current = true  }
    const resume = () => { pausedRef.current = false }
    el.addEventListener('mouseenter',  pause)
    el.addEventListener('mouseleave',  resume)
    el.addEventListener('touchstart',  pause,  { passive: true })
    el.addEventListener('touchend',    resume)
    el.addEventListener('touchcancel', resume)
    return () => {
      el.removeEventListener('mouseenter',  pause)
      el.removeEventListener('mouseleave',  resume)
      el.removeEventListener('touchstart',  pause)
      el.removeEventListener('touchend',    resume)
      el.removeEventListener('touchcancel', resume)
    }
  }, [])

  // Drag to scroll.
  //
  // Pointer events rather than mouse events, so one path covers the mouse, a
  // pen and a finger. `touch-action: pan-y` on the element is what splits the
  // two axes on a phone: a sideways drag comes here, an up-and-down one is
  // left to the page, and neither has to be guessed at from the coordinates.
  //
  // Position and target move together while the pointer is down, so the track
  // sits exactly under it instead of chasing it a frame behind — the spring is
  // only re-engaged on release, to carry the throw.
  //
  // Nothing is captured until the pointer has travelled DRAG_SLOP. Capturing
  // on the press would retarget every following event at this element, the
  // click among them, and the click is what opens the logo's link — so a
  // carousel that could be dragged would be one whose logos no longer opened.
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    const down = (e: PointerEvent) => {
      // Secondary buttons belong to the browser's own menus.
      if (e.button !== 0) return
      // A drag that produced no click leaves the guard raised; a new press is
      // the point at which it can no longer be meant for anything.
      clickGuardRef.current = false
      dragRef.current = {
        id: e.pointerId,
        startX: e.clientX,
        startPos: posRef.current,
        lastX: e.clientX,
        velocity: 0,
        distance: 0,
        captured: false,
      }
      pausedRef.current = true
    }

    const move = (e: PointerEvent) => {
      const drag = dragRef.current
      if (!drag || drag.id !== e.pointerId) return

      const dx = e.clientX - drag.startX
      drag.distance = Math.max(drag.distance, Math.abs(dx))

      // Still inside the slop: this may yet turn out to be a click, so leave
      // the track where it is and leave the events alone.
      if (!drag.captured) {
        if (drag.distance < DRAG_SLOP) return
        drag.captured = true
        setDragging(true)
        el.setPointerCapture(e.pointerId)
      }

      drag.velocity = e.clientX - drag.lastX
      drag.lastX = e.clientX
      posRef.current = drag.startPos + dx
      targetRef.current = posRef.current
      applyTransform(posRef.current)
    }

    const up = (e: PointerEvent) => {
      const drag = dragRef.current
      if (!drag || drag.id !== e.pointerId) return
      dragRef.current = null

      if (drag.captured) {
        setDragging(false)
        if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId)
        // The throw. The spring takes it from here.
        targetRef.current = posRef.current + drag.velocity * THROW
        // The click this press is about to produce has to be swallowed, or
        // every drag that started on a logo would also open it.
        clickGuardRef.current = true
      }

      // A mouse that is still over the carousel keeps it paused, the way a
      // plain hover does; a finger has left for good.
      if (e.pointerType !== 'mouse') pausedRef.current = false
    }

    // Capture phase, because the click lands on the logo's own link: by the
    // time it bubbled up here the navigation would already be under way.
    const click = (e: MouseEvent) => {
      if (!clickGuardRef.current) return
      clickGuardRef.current = false
      e.preventDefault()
      e.stopPropagation()
    }

    el.addEventListener('pointerdown',   down)
    el.addEventListener('pointermove',   move)
    el.addEventListener('pointerup',     up)
    el.addEventListener('pointercancel', up)
    el.addEventListener('click',         click, true)
    return () => {
      el.removeEventListener('pointerdown',   down)
      el.removeEventListener('pointermove',   move)
      el.removeEventListener('pointerup',     up)
      el.removeEventListener('pointercancel', up)
      el.removeEventListener('click',         click, true)
    }
  }, [])

  // Re-anchor when copy width changes (e.g. responsive card size breakpoint hit)
  useEffect(() => {
    const el = copy1Ref.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      const W = el.offsetWidth
      if (W < 1) return
      const n = normalise(posRef.current, W)
      if (n !== posRef.current) {
        targetRef.current += n - posRef.current
        if (dragRef.current) dragRef.current.startPos += n - posRef.current
        posRef.current = n
      }
      setNumCopies(computeCopies(W))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Update copy count when viewport width changes (card sizes don't change, only coverage does)
  useEffect(() => {
    const handleResize = () => {
      const W = getW()
      if (W > 0) setNumCopies(computeCopies(W))
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const scroll = (dir: 'left' | 'right') => {
    targetRef.current += dir === 'left' ? 300 : -300
  }

  if (items.length === 0) return null

  return (
    <div
      ref={wrapRef}
      // `touch-action: pan-y` hands the vertical axis back to the page, so a
      // phone can still scroll past a carousel it happens to start the gesture
      // on; the horizontal axis is ours. `select-none` stops a drag across the
      // logos from highlighting the page instead of moving the track.
      className={`w-full touch-pan-y py-16 select-none ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
    >
      <div className="relative">

        {/* Arrows live outside the overflow-hidden clip so they are never cropped.

            `inset-0` alone left this over-constrained against `.container`'s own
            max-width: with left and right both pinned, the max-width won and the
            box anchored left, so the right arrow sat short of the right edge and
            the pair read as off-centre. `mx-auto` resolves it and centres the
            box; `bottom-4` matches the track's own `pb-4`, so the arrows centre
            on the logos rather than on the logos plus their padding.

            Hidden below `lg`: the carousel drifts on its own and takes a swipe,
            so on a phone the arrows only cover logos. */}
        <div className="absolute inset-x-0 top-0 bottom-4 container mx-auto pointer-events-none z-10 hidden lg:block">
          <button
            onClick={() => scroll('left')}
            className="pointer-events-auto absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="pointer-events-auto absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* overflow-hidden clips the wide track; the `lg` padding keeps items
            clear of the arrows, which only exist at that width. */}
        <div className="overflow-hidden px-4 pb-4 lg:px-12">
          {/* numCopies identical copies — dynamically sized to always cover the viewport.
              pr-6 on each copy adds a trailing gap equal to the inter-item gap,
              so the loop point is visually seamless. */}
          <div ref={trackRef} className="flex will-change-transform">
            <div ref={copy1Ref} className="flex gap-6 shrink-0 pr-6">{items}</div>
            {Array.from({ length: numCopies - 1 }, (_, i) => (
              <div key={i} className="flex gap-6 shrink-0 pr-6">{items}</div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Carousel