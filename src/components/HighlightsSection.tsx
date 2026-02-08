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
    title: 'Looks casuais para come\u00E7ar o ano',
    image: '/images/academia-4.jpg',
    href: '/categoria/roupas',
    featured: true,
  },
  {
    title: 'Leve, pr\u00E1tica, essencial',
    image: '/images/bolsa-1.jpg',
    href: '/categoria/acessorios',
    featured: false,
  },
  {
    title: 'Camisetas com design e movimento',
    image: '/images/short-masc-2.jpg',
    href: '/categoria/roupas',
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

  return (
    <section id="categorias" className="bg-white py-20 scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4">

        <div className="grid gap-[3px] bg-white md:grid-cols-2">
          {highlights.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className={`group relative isolate block overflow-hidden bg-stone-100 ${
                item.featured ? 'aspect-[5/2] md:col-span-2' : 'aspect-[8/11] sm:aspect-[4/3]'
              }`}
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
                <p className="text-3xl font-semibold leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,.45)]">
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
