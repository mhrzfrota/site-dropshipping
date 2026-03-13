import React from 'react'
import { Link } from 'react-router-dom'

const fallbackImage = '/images/home-hero.png'

const rhythmCards = [
  {
    title: ['Praia &', 'Piscina'],
    image: '/images/biquinis.jpg',
    href: '/categoria/biquinis',
  },
  {
    title: ['Fitness', '& Academia'],
    image: '/images/academia-4.jpg',
    href: '/categoria/roupas',
  },
  {
    title: ['Acessórios', '& Looks'],
    image: '/images/bolsa-1.jpg',
    href: '/categoria/acessorios',
  },
]

const RhythmSection: React.FC = () => {
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget
    if (target.dataset.fallbackApplied) return
    target.dataset.fallbackApplied = 'true'
    target.src = fallbackImage
  }

  return (
    <section className="bg-[#0a1f3d] py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 mb-2">
            Lifestyle
          </p>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white">
            Peças para cada momento
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid gap-4 sm:grid-cols-3">
          {rhythmCards.map((card) => (
            <Link
              key={card.title.join('-')}
              to={card.href}
              className="group relative overflow-hidden"
            >
              <div className="aspect-[4/5] sm:aspect-[3/4]">
                <img
                  src={card.image}
                  alt={card.title.join(' ')}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  onError={handleImageError}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 px-6 pb-6 text-white">
                <p className="text-2xl font-bold leading-tight">
                  <span className="block">{card.title[0]}</span>
                  <span className="block">{card.title[1]}</span>
                </p>
                <span
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-white/75 translate-y-4 opacity-0 transition duration-400 group-hover:translate-y-0 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  Explorar
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/produtos"
            className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-white px-10 text-sm font-semibold uppercase tracking-[0.15em] text-[#0a1f3d] transition hover:bg-white/90"
          >
            Ver toda a coleção
          </Link>
        </div>
      </div>
    </section>
  )
}

export default RhythmSection
