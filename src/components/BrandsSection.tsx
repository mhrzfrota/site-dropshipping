import React from 'react'
import { Link } from 'react-router-dom'
import { getAllProducts, normalizeSlug } from '../data/products'

const BrandsSection: React.FC = () => {
  const brands = Array.from(
    getAllProducts().reduce((map, product) => {
      const slug = normalizeSlug(product.brand)
      if (!map.has(slug)) {
        map.set(slug, product.brand)
      }
      return map
    }, new Map<string, string>()),
  ).map(([slug, label]) => ({ slug, label }))

  return (
    <section id="marcas" className="bg-brand-sand py-16 scroll-mt-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold tracking-[0.12em] text-stone-600">Marcas parceiras</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-stone-800">
            Nossas marcas favoritas
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            Seleção de marcas que combinam performance, conforto e estilo.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              to={`/marca/${brand.slug}`}
              className="rounded-full border border-brand-deep/20 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-700 transition hover:border-brand-deep hover:text-brand-deep hover:shadow-md"
            >
              {brand.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BrandsSection
