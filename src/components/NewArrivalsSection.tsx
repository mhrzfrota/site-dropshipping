import React, { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatPrice, getAllProducts } from '../data/products'

const fallbackImage = '/images/biquini-2.jpg'

const NewArrivalsSection: React.FC = () => {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [scrollStart, setScrollStart] = useState(0)

  const newArrivals = useMemo(() => getAllProducts().slice(0, 6), [])
  const featured = useMemo(() => getAllProducts().slice(4, 7), [])

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
    <section id="vitrine" className="bg-white py-16 scroll-mt-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.12em] text-stone-600">Lançamentos</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-stone-800">
              Lançamentos e destaques da semana
            </h2>
          </div>
          <Link to="/produtos" className="btn-secondary">
            Ver coleção completa
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.6fr_0.8fr]">
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
              {newArrivals.map((item, index) => {
                const gallery = item.images?.length ? item.images : [item.image]
                const conceptImage = gallery[1] ?? item.image
                const displayImage = index % 2 === 0 ? item.image : conceptImage

                return (
                  <div
                    key={item.id}
                    className="group card-surface card-hover relative min-w-[220px] max-w-[320px] snap-start flex-1 sm:min-w-[260px]"
                  >
                    <Link to={`/produto/${item.slug}`} className="block">
                      {item.isNew && (
                        <span className="badge badge-primary absolute left-4 top-4 z-10">
                          Lançamento
                        </span>
                      )}
                      <div className="aspect-[4/5] overflow-hidden rounded-t-2xl bg-stone-50">
                        <img
                          src={displayImage}
                          alt={item.name}
                          className="h-full w-full object-cover object-[center_20%] transition duration-500 group-hover:scale-105"
                          onError={handleImageError}
                          draggable={false}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </Link>
                    <div className="space-y-3 px-5 py-5 text-center">
                      <div className="flex justify-center">
                        <span className="badge badge-neutral">{item.brand}</span>
                      </div>
                      <p className="text-sm font-semibold text-stone-800">{item.name}</p>
                      <p className="text-lg font-extrabold text-stone-900">{formatPrice(item.price)}</p>
                      <Link to={`/produto/${item.slug}`} className="btn-primary w-full">
                        Comprar
                      </Link>
                    </div>
                  </div>
                )
              })}
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

          <div className="space-y-4">
            {featured.map((item) => (
              <Link
                key={item.id}
                to={`/produto/${item.slug}`}
                className="group flex items-center gap-4 rounded-3xl border border-stone-200 bg-white/90 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-24 w-24 overflow-hidden rounded-2xl bg-stone-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    onError={handleImageError}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex-1">
                  <span className="badge badge-soft">Destaque</span>
                  <p className="mt-2 text-sm font-semibold text-stone-800">{item.name}</p>
                  <p className="text-sm font-bold text-brand-deep">{formatPrice(item.price)}</p>
                </div>
              </Link>
            ))}
            <div className="rounded-3xl bg-brand-sand px-5 py-6">
              <p className="text-xs font-semibold tracking-[0.12em] text-stone-600">Vitrine</p>
              <p className="mt-2 text-sm text-stone-700">
                Descubra peças selecionadas para treinos, praia e looks casuais.
              </p>
              <Link to="/produtos" className="btn-secondary mt-4 w-full">
                Ver todos os produtos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewArrivalsSection
