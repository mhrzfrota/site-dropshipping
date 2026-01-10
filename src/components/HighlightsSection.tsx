import React from 'react'
import { Link } from 'react-router-dom'

const fallbackImage = '/images/home-hero.png'

const highlights = [
  {
    title: 'Praia & Resort',
    description: 'Beachwear leve e elegante para curtir o sol.',
    image: '/images/biquini-2.jpg',
    href: '/categoria/biquinis',
  },
  {
    title: 'Fitness & Treino',
    description: 'Performance e conforto para qualquer movimento.',
    image: '/images/academia-1.jpg',
    href: '/categoria/roupas',
  },
  {
    title: 'Acessórios Essenciais',
    description: 'Detalhes que completam o look do dia.',
    image: '/images/bolsa-1.jpg',
    href: '/categoria/acessorios',
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
    <section id="categorias" className="bg-white py-16 scroll-mt-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold tracking-[0.12em] text-stone-500">Performance para</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-stone-900">
            Qualquer movimento
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            Curadoria Mar&Mov para praia, treino e momentos casuais.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center">
              <div className="w-full overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
                <div className="aspect-[4/5]">
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
              <p className="mt-4 text-sm font-semibold text-stone-900">{item.title}</p>
              <p className="mt-1 text-xs text-stone-600">{item.description}</p>
              <Link
                to={item.href}
                className="mt-4 inline-flex min-h-[42px] items-center justify-center rounded-full border border-stone-300 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-stone-700 transition hover:border-stone-500 hover:text-stone-900"
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
