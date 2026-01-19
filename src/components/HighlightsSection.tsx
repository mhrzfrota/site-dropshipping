import React from 'react'
import { Link } from 'react-router-dom'

const fallbackImage = '/images/home-hero.png'

const highlights = [
  {
    title: 'Looks casuais para começar o ano.',
    image: '/images/academia-4.jpg',
    href: '/categoria/roupas',
  },
  {
    title: 'Leve. Prática. Essencial.',
    image: '/images/bolsa-1.jpg',
    href: '/categoria/acessorios',
  },
  {
    title: 'Camisetas com design e movimento.',
    image: '/images/short-masc-2.jpg',
    href: '/categoria/roupas',
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
        <div className="mb-12 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-stone-500">
            Performance para
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-stone-900 sm:text-4xl">
            Qualquer movimento
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center">
              <div className="w-full overflow-hidden bg-stone-100">
                <div className="aspect-[3/4]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                    onError={handleImageError}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              <p className="mt-5 text-sm font-semibold text-[#0a1f3d]">{item.title}</p>
              <Link
                to={item.href}
                className="mt-6 inline-flex min-h-[44px] items-center justify-center border border-[#0a1f3d] px-8 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0a1f3d] transition hover:bg-[#0a1f3d] hover:text-white"
              >
                Confira
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HighlightsSection
