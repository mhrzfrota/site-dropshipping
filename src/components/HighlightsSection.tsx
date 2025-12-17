import React from 'react'

type CategoryCard = {
  id: string
  title: string
  image: string
  href: string
}

const categories: CategoryCard[] = [
  {
    id: 'biquinis',
    title: 'Biquínis',
    image: '/images/cat-biquinis.jpg',
    href: '#biquinis',
  },
  {
    id: 'maios',
    title: 'Maiôs',
    image: '/images/cat-maios.jpg',
    href: '#maios',
  },
  {
    id: 'roupas',
    title: 'Roupas',
    image: '/images/cat-roupas.jpg',
    href: '#roupas',
  },
  {
    id: 'acessorios',
    title: 'Acessórios',
    image: '/images/cat-acessorios.jpg',
    href: '#acessorios',
  },
]

const HighlightsSection: React.FC = () => {
  return (
    <section id="novidades" className="bg-[#f3e8dc] scroll-mt-28">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={cat.href}
              className="group relative block overflow-hidden rounded-lg border border-white/70 shadow-lg shadow-black/10 transition-transform duration-500 hover:-translate-y-1"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${cat.image})` }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" aria-hidden="true" />
              <div className="relative flex h-[340px] items-end justify-center pb-6 text-center">
                <span className="text-lg font-semibold uppercase tracking-[0.2em] text-white">
                  {cat.title}
                  <span className="mt-2 block h-[2px] w-12 bg-white/80 transition-all duration-300 group-hover:w-16" aria-hidden="true" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HighlightsSection
