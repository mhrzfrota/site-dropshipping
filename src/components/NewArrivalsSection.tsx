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
    <section id="lancamentos" className="bg-white py-16 scroll-mt-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="flex-1 text-center font-display text-3xl font-black text-stone-800">
            Lançamentos do momento
          </h2>
          <Link
            to="/produtos"
            className="btn-secondary hidden items-center gap-2 sm:inline-flex"
          >
            Ver coleção
            <span aria-hidden="true">&rarr;</span>
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
                className="group card-hover relative min-w-[220px] max-w-[320px] snap-start flex-1 rounded-2xl border border-stone-100 bg-white shadow-sm sm:min-w-[260px]"
              >
                <Link to={`/produto/${item.slug}`} className="block">
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-brand-deep px-3 py-1 text-[10px] font-semibold text-white shadow-sm">
                    Lançamento
                  </span>
                  <div className="aspect-[4/5] overflow-hidden rounded-t-2xl bg-stone-50">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      onError={handleImageError}
                      draggable={false}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </Link>
                <div className="space-y-3 px-5 py-5 text-center">
                  <p className="text-xs font-semibold tracking-[0.12em] text-brand-deep/80">
                    {item.brand}
                  </p>
                  <p className="text-sm font-semibold text-stone-800">{item.name}</p>
                  <p className="text-lg font-extrabold text-stone-900">{formatPrice(item.price)}</p>
                  <Link
                    to={`/produto/${item.slug}`}
                    className="btn-primary w-full"
                  >
                    Comprar
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
