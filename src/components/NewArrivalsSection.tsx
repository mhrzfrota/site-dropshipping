import React, { useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { getAllProducts } from '../data/products'

const fallbackImage = '/images/biquini-2.jpg'

const NewArrivalsSection: React.FC = () => {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const dragState = useRef({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
    hasDragged: false,
  })

  const newArrivals = useMemo(() => getAllProducts().slice(0, 12), [])

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (!trackRef.current) return
    const amount = trackRef.current.clientWidth * 0.85
    trackRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || !trackRef.current) return
    event.preventDefault()
    const container = trackRef.current
    dragState.current.isDragging = true
    dragState.current.startX = event.clientX
    dragState.current.scrollLeft = container.scrollLeft
    dragState.current.hasDragged = false
    container.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || !trackRef.current) return
    if (!dragState.current.isDragging) return
    event.preventDefault()
    const delta = event.clientX - dragState.current.startX
    if (Math.abs(delta) > 6) {
      dragState.current.hasDragged = true
    }
    trackRef.current.scrollLeft = dragState.current.scrollLeft - delta
  }

  const stopDragging = (event?: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.isDragging) return
    dragState.current.isDragging = false
    if (event && trackRef.current?.hasPointerCapture(event.pointerId)) {
      trackRef.current.releasePointerCapture(event.pointerId)
    }
    window.setTimeout(() => {
      dragState.current.hasDragged = false
    }, 0)
  }

  const handleCardClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (dragState.current.hasDragged) {
      event.preventDefault()
    }
  }

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget
    if (target.dataset.fallbackApplied) return
    target.dataset.fallbackApplied = 'true'
    target.src = fallbackImage
  }

  return (
    <section id="vitrine" className="bg-white py-12 scroll-mt-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative">
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => scrollByAmount('left')}
            className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-stone-200 bg-white/95 text-stone-600 shadow-sm transition hover:text-stone-900"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path
                d="M15 6l-6 6 6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div
            ref={trackRef}
            className="no-scrollbar flex gap-6 overflow-x-auto pb-4 pt-1 scroll-smooth select-none cursor-grab active:cursor-grabbing"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerLeave={stopDragging}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
          >
            {newArrivals.map((item, index) => {
              const gallery = item.images?.length ? item.images : [item.image]
              const conceptImage = gallery[1] ?? item.image
              const displayImage = index % 2 === 0 ? item.image : conceptImage

              return (
                <Link
                  key={item.id}
                  to={`/produto/${item.slug}`}
                  onClick={handleCardClick}
                  className="shrink-0"
                >
                  <div className="w-[240px] overflow-hidden rounded-2xl bg-stone-100 sm:w-[260px] lg:w-[280px]">
                    <div className="aspect-[4/5]">
                      <img
                        src={displayImage}
                        alt={item.name}
                        className="h-full w-full object-cover object-[center_20%]"
                        onError={handleImageError}
                        draggable={false}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
          <button
            type="button"
            aria-label="Proximo"
            onClick={() => scrollByAmount('right')}
            className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-stone-200 bg-white/95 text-stone-600 shadow-sm transition hover:text-stone-900"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path
                d="M9 6l6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default NewArrivalsSection
