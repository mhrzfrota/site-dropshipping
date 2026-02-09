import React from 'react'
import { Link } from 'react-router-dom'

const fallbackImage = '/images/home-hero.png'

type HighlightCard = {
  title: string
  image: string
  href: string
  featured: boolean
}

const highlights: HighlightCard[] = [
  {
    title: 'Bíquinis',
    image: '/images/academia-4.jpg',
    href: '/categoria/roupas',
    featured: true,
  },
  {
    title: 'Blusas',
    image: '/images/bolsa-1.jpg',
    href: '/categoria/acessorios',
    featured: false,
  },
  {
    title: 'Calças',
    image: '/images/short-masc-2.jpg',
    href: '/categoria/roupas',
    featured: false,
  },
  {
    title: 'Ver mais',
    image: '/images/blusa-1.jpg',
    href: '/produtos',
    featured: false,
  },
]

const HighlightsSection: React.FC = () => {
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget
    if (target.dataset.fallbackApplied) return
    target.dataset.fallbackApplied = 'true'
    target.src = fallbackImage
  }

  const featuredHighlight = highlights.find((item) => item.featured)
  const regularHighlights = highlights.filter((item) => !item.featured)

  return (
    <section id="categorias" className="bg-white pt-6 pb-14 scroll-mt-28">
      {featuredHighlight && (
        <Link
          key={featuredHighlight.title}
          to={featuredHighlight.href}
          className="group relative left-1/2 isolate block aspect-[5/2] w-screen -translate-x-1/2 overflow-hidden bg-stone-100"
        >
          <img
            src={featuredHighlight.image}
            alt={featuredHighlight.title}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105 group-hover:brightness-[.72] group-focus-visible:scale-105 group-focus-visible:brightness-[.72]"
            onError={handleImageError}
            loading="lazy"
            decoding="async"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/10 transition duration-500 group-hover:from-black/65 group-hover:via-black/30 group-focus-visible:from-black/65 group-focus-visible:via-black/30" />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center text-white">
            <p className="text-3xl font-semibold leading-tight underline decoration-2 underline-offset-[10px] decoration-white drop-shadow-[0_4px_10px_rgba(0,0,0,.45)]">
              {featuredHighlight.title}
            </p>

            <span className="inline-flex min-h-[42px] translate-y-3 items-center justify-center border border-white/90 px-8 text-sm font-semibold uppercase tracking-[0.08em] text-white opacity-0 transition duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              Ver mais
            </span>
          </div>
        </Link>
      )}

      <div className="relative left-1/2 mt-[3px] w-screen -translate-x-1/2">
        <div className="grid gap-[3px] bg-white sm:grid-cols-2 lg:grid-cols-3">
          {regularHighlights.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className="group relative isolate block aspect-[8/11] overflow-hidden bg-stone-100 sm:aspect-[4/3]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105 group-hover:brightness-[.72] group-focus-visible:scale-105 group-focus-visible:brightness-[.72]"
                onError={handleImageError}
                loading="lazy"
                decoding="async"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/10 transition duration-500 group-hover:from-black/65 group-hover:via-black/30 group-focus-visible:from-black/65 group-focus-visible:via-black/30" />

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center text-white">
                <p className="text-3xl font-semibold leading-tight underline decoration-2 underline-offset-[10px] decoration-white drop-shadow-[0_4px_10px_rgba(0,0,0,.45)]">
                  {item.title}
                </p>

                <span className="inline-flex min-h-[42px] translate-y-3 items-center justify-center border border-white/90 px-8 text-sm font-semibold uppercase tracking-[0.08em] text-white opacity-0 transition duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  Ver mais
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HighlightsSection

