import React, { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatPrice, getAllProducts } from '../data/products'

const fallbackImage = '/images/cat-biquinis.jpg'

const NewArrivalsSection: React.FC = () => {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [scrollStart, setScrollStart] = useState(0)

  const newArrivals = useMemo(() => getAllProducts().slice(0, 6), [])

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (!trackRef.current) return
    const amount = trackRef.current.clientWidth * 0.7
    trackRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return
    setIsDragging(true)
    setDragStart(event.pageX - trackRef.current.offsetLeft)
    setScrollStart(trackRef.current.scrollLeft)
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !trackRef.current) return
    event.preventDefault()
    const x = event.pageX - trackRef.current.offsetLeft
    const walk = x - dragStart
    trackRef.current.scrollLeft = scrollStart - walk
  }

  const stopDragging = () => {
    setIsDragging(false)
  }

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget
    if (target.dataset.fallbackApplied) return
    target.dataset.fallbackApplied = 'true'
    target.src = fallbackImage
  }

  return (
    <section id="lancamentos" className="bg-white py-14 scroll-mt-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="flex-1 text-center font-display text-3xl font-black text-stone-800">
            Novidades que acabaram de chegar
          </h2>
          <Link
            to="/produtos"
            className="hidden items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-stone-500 hover:text-stone-900 sm:inline-flex"
          >
            Ver coleção completa <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="relative">
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => scrollByAmount('left')}
            className="absolute left-1 top-1/2 z-10 hidden h-12 w-9 -translate-y-1/2 items-center justify-center rounded-r-xl bg-white/90 text-stone-600 shadow-md ring-1 ring-stone-200 transition hover:bg-white hover:text-stone-900 sm:flex"
          >
            <span aria-hidden="true">&larr;</span>
          </button>
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto scroll-smooth px-2 pb-6 snap-x snap-mandatory"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseLeave={stopDragging}
            onMouseUp={stopDragging}
          >
            {newArrivals.map((item) => (
              <div
                key={item.id}
                className="group relative min-w-[220px] max-w-[320px] snap-start flex-1 rounded-lg border border-stone-100 bg-white shadow-sm transition hover:-translate-y-1 sm:min-w-[260px]"
              >
                <Link to={`/produto/${item.slug}`} className="block">
                  <div className="overflow-hidden rounded-t-lg bg-stone-50">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-[320px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[380px]"
                      onError={handleImageError}
                      draggable={false}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </Link>
                <div className="space-y-3 px-4 py-4 text-center">
                  <p className="text-sm font-semibold text-stone-700">{item.name}</p>
                  <div className="space-y-1">
                    <p className="text-base font-extrabold text-stone-900">{formatPrice(item.price)}</p>
                    <p className="text-xs text-stone-500">{item.brand}</p>
                  </div>
                  <Link
                    to={`/produto/${item.slug}`}
                    className="inline-flex w-full items-center justify-center rounded-md bg-brand-deep px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-brand-ocean"
                  >
                    Ver detalhes
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            aria-label="Próximo"
            onClick={() => scrollByAmount('right')}
            className="absolute right-1 top-1/2 z-10 hidden h-12 w-9 -translate-y-1/2 items-center justify-center rounded-l-xl bg-white/90 text-stone-600 shadow-md ring-1 ring-stone-200 transition hover:bg-white hover:text-stone-900 sm:flex"
          >
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default NewArrivalsSection
