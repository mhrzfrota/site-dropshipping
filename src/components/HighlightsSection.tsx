import React from 'react'
import { Link } from 'react-router-dom'

const fallbackImage = '/images/home-hero.png'

type HighlightCard = {
  title: string
  image: string
  href: string
}

const featured: HighlightCard = {
  title: 'Moda Praia',
  image: '/images/biquinis.jpg',
  href: '/categoria/biquinis',
}

const regularHighlights: HighlightCard[] = [
  { title: 'Biquínis & Maiôs', image: '/images/maio-1.jpg', href: '/categoria/biquinis' },
  { title: 'Roupas & Fitness', image: '/images/blusa-1.jpg', href: '/categoria/roupas' },
  { title: 'Acessórios', image: '/images/bolsa-1.jpg', href: '/categoria/acessorios' },
]

const HighlightsSection: React.FC = () => {
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget
    if (target.dataset.fallbackApplied) return
    target.dataset.fallbackApplied = 'true'
    target.src = fallbackImage
  }

  return (
    <section id="categorias" className="bg-white pt-14 pb-14 scroll-mt-28">
      {/* Section header */}
      <div className="mx-auto max-w-7xl px-6 mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#477e8a] mb-2">
          Nossas Categorias
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-black text-stone-900">
          Explore por estilo
        </h2>
      </div>

      {/* Featured card — full bleed */}
      <Link
        to={featured.href}
        className="group relative left-1/2 isolate block aspect-[5/2] w-screen -translate-x-1/2 overflow-hidden bg-stone-100"
      >
        <img
          src={featured.image}
          alt={featured.title}
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105 group-focus-visible:scale-105"
          onError={handleImageError}
          loading="lazy"
          decoding="async"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/10 transition duration-500 group-hover:from-black/75 group-focus-visible:from-black/75" />

        <div className="absolute inset-0 flex flex-col justify-end px-8 pb-8 text-white">
          <p className="text-4xl font-black leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,.45)]">
            {featured.title}
          </p>
          <span
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white/80 translate-y-2 opacity-0 transition duration-400 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
            aria-hidden="true"
          >
            Explorar
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </Link>

      {/* Regular cards grid — full bleed */}
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
                className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105 group-focus-visible:scale-105"
                onError={handleImageError}
                loading="lazy"
                decoding="async"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/10 transition duration-500 group-hover:from-black/75 group-focus-visible:from-black/75" />

              <div className="absolute inset-0 flex flex-col justify-end px-6 pb-6 text-white">
                <p className="text-2xl font-bold leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,.45)]">
                  {item.title}
                </p>
                <span
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-white/75 translate-y-2 opacity-0 transition duration-400 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                  aria-hidden="true"
                >
                  Explorar
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mx-auto max-w-7xl px-6 mt-10 text-center">
        <Link
          to="/produtos"
          className="inline-flex items-center gap-2 text-sm font-semibold text-stone-500 hover:text-stone-900 transition-colors"
        >
          Explorar todos os produtos
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </section>
  )
}

export default HighlightsSection
