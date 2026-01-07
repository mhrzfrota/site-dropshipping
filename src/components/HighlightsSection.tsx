import React from 'react'
import { Link } from 'react-router-dom'
import { categoryMeta } from '../data/products'

const fallbackImage = '/images/home-hero.png'

const HighlightsSection: React.FC = () => {
  const categories = Object.entries(categoryMeta).map(([slug, meta]) => ({
    slug,
    label: meta.label,
    image: meta.image,
  }))

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget
    if (target.dataset.fallbackApplied) return
    target.dataset.fallbackApplied = 'true'
    target.src = fallbackImage
  }

  return (
    <section id="categorias" className="bg-brand-sand scroll-mt-28">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/categoria/${cat.slug}`}
              className="group relative block overflow-hidden rounded-3xl border border-white/70 shadow-lg shadow-black/10 transition-transform duration-500 hover:-translate-y-1"
              aria-label={`Ver categoria ${cat.label}`}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={cat.image}
                  alt={`Categoria ${cat.label}`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  onError={handleImageError}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="inline-flex items-center gap-3 rounded-full bg-black/45 px-5 py-2 text-white backdrop-blur-sm">
                  <span className="text-sm font-semibold tracking-[0.12em]">{cat.label}</span>
                  <span
                    className="h-[2px] w-8 bg-white/80 transition-all duration-300 group-hover:w-12"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HighlightsSection
