import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import { categoryMeta, getProductsByBrand, type ProductCategory } from '../data/products'

const BrandPage: React.FC = () => {
  const { slug } = useParams()
  const items = slug ? getProductsByBrand(slug) : []
  const brandLabel = items[0]?.brand
  const [selectedCategory, setSelectedCategory] = useState<'all' | ProductCategory>('all')

  useEffect(() => {
    setSelectedCategory('all')
  }, [slug])

  const categories = useMemo(
    () => Array.from(new Set(items.map((item) => item.category))),
    [items],
  )
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return items
    return items.filter((item) => item.category === selectedCategory)
  }, [items, selectedCategory])

  return (
    <section className="bg-brand-sand py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Marca</p>
          <h1 className="mt-3 font-display text-3xl font-black text-stone-800 sm:text-4xl">
            {brandLabel ?? 'Marca não encontrada'}
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            {brandLabel
              ? `Descubra o estilo da marca ${brandLabel} em nossa curadoria.`
              : 'Tente outra marca para continuar navegando.'}
          </p>
          <div className="mt-4 flex items-center justify-center gap-3 text-sm">
            <Link to="/produtos" className="font-semibold text-brand-deep transition hover:text-brand-ocean">
              Ver todos os produtos
            </Link>
            {brandLabel && (
              <Link
                to="/"
                className="rounded-full border border-stone-300 px-3 py-1 text-xs font-semibold text-stone-600 transition hover:border-stone-500 hover:text-stone-800"
              >
                Voltar para a home
              </Link>
            )}
          </div>
        </div>
        {brandLabel && categories.length > 1 && (
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                selectedCategory === 'all'
                  ? 'border-brand-deep bg-brand-deep text-white'
                  : 'border-white/70 bg-white/70 text-stone-600 hover:border-brand-deep hover:text-brand-deep'
              }`}
            >
              Todas
            </button>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                  selectedCategory === category
                    ? 'border-brand-deep bg-brand-deep text-white'
                    : 'border-white/70 bg-white/70 text-stone-600 hover:border-brand-deep hover:text-brand-deep'
                }`}
              >
                {categoryMeta[category]?.label ?? category}
              </button>
            ))}
          </div>
        )}
        <ProductGrid items={filteredItems} />
      </div>
    </section>
  )
}

export default BrandPage
