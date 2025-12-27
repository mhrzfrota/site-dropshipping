import React from 'react'
import { Link } from 'react-router-dom'
import { categoryMeta } from '../data/products'

const fallbackImage = '/images/cat-roupas.jpg'

const HighlightsSection: React.FC = () => {
  const categories = Object.entries(categoryMeta).map(([slug, meta]) => ({
    slug,
    label: meta.label,
    image: meta.image,
  }))

  return (
    <section id="categorias" className="bg-[#f3e8dc] scroll-mt-28">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/categoria/${cat.slug}`}
              className="group relative block overflow-hidden rounded-lg border border-white/70 shadow-lg shadow-black/10 transition-transform duration-500 hover:-translate-y-1"
              aria-label={`Ver categoria ${cat.label}`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-stone-200"
                style={{ backgroundImage: `url(${cat.image}), url(${fallbackImage})` }}
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent"
                aria-hidden="true"
              />
              <div className="relative flex h-[240px] items-end justify-center pb-6 text-center sm:h-[300px] lg:h-[340px]">
                <span className="text-lg font-semibold tracking-[0.2em] text-white">
                  {cat.label}
                  <span
                    className="mt-2 block h-[2px] w-12 bg-white/80 transition-all duration-300 group-hover:w-16"
                    aria-hidden="true"
                  />
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
