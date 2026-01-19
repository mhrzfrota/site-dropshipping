import React from 'react'
import { Link } from 'react-router-dom'

const fallbackImage = '/images/home-hero.png'

const rhythmCards = [
  {
    title: ['Tops e', 'Leggings'],
    image: '/images/academia-4.jpg',
    href: '/categoria/roupas',
  },
  {
    title: ['Camisetas', 'e Bermudas'],
    image: '/images/short-masc-2.jpg',
    href: '/categoria/roupas',
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
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="font-display text-3xl font-extrabold text-stone-900 sm:text-4xl">
            Peças que acompanham seu ritmo
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {rhythmCards.map((card) => (
            <Link key={card.title.join('-')} to={card.href} className="group relative overflow-hidden">
              <div className="aspect-[16/9]">
                <img
                  src={card.image}
                  alt={card.title.join(' ')}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  onError={handleImageError}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 px-6 pb-6 text-white">
                <p className="text-3xl font-semibold leading-tight">
                  <span className="block">{card.title[0]}</span>
                  <span className="block">{card.title[1]}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RhythmSection
