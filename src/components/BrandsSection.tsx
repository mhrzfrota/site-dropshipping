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
          <p className="text-xs font-semibold tracking-[0.2em] text-stone-600">Marcas</p>
          <h2 className="mt-3 font-display text-3xl font-black text-stone-800">Marcas em destaque</h2>
          <p className="mt-2 text-sm text-stone-600">Seleção de marcas parceiras e exclusivas da Mar&Mov.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              to={`/marca/${brand.slug}`}
              className="btn-secondary w-full text-xs"
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
