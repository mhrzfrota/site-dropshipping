import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import {
  categoryMeta,
  getProductsByBrand,
  productSortOptions,
  sortProducts,
  type ProductCategory,
  type ProductSortKey,
} from '../data/products'

const BrandPage: React.FC = () => {
  const { slug } = useParams()
  const items = slug ? getProductsByBrand(slug) : []
  const brandLabel = items[0]?.brand
  const [selectedCategory, setSelectedCategory] = useState<'all' | ProductCategory>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState<ProductSortKey>('destaques')

  useEffect(() => {
    setSelectedCategory('all')
    setSortBy('destaques')
  }, [slug])

  useEffect(() => {
    setIsLoading(true)
    const timer = window.setTimeout(() => setIsLoading(false), 350)
    return () => window.clearTimeout(timer)
  }, [slug])

  const categories = useMemo(
    () => Array.from(new Set(items.map((item) => item.category))),
    [items],
  )
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return items
    return items.filter((item) => item.category === selectedCategory)
  }, [items, selectedCategory])
  const sortedItems = useMemo(() => sortProducts(filteredItems, sortBy), [filteredItems, sortBy])

  return (
    <section className="bg-brand-sand py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold tracking-[0.12em] text-stone-600">Marca</p>
          <h1 className="mt-3 font-display text-3xl font-black text-stone-800 sm:text-4xl">
            {brandLabel ?? 'Marca não encontrada'}
          </h1>
          <p className="mt-2 text-sm text-stone-600">
            {brandLabel
              ? `Descubra o estilo da marca ${brandLabel} em nossa curadoria.`
              : 'Tente outra marca para continuar navegando.'}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
            <Link to="/sale" className="btn-primary">
              Ver todos os produtos
            </Link>
            {brandLabel && (
              <Link to="/" className="btn-secondary">
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
              aria-pressed={selectedCategory === 'all'}
              className={`btn-secondary px-4 text-xs ${
                selectedCategory === 'all' ? 'border-brand-deep bg-brand-deep text-white hover:text-white' : ''
              }`}
            >
              Todas
            </button>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}
                className={`btn-secondary px-4 text-xs ${
                  selectedCategory === category
                    ? 'border-brand-deep bg-brand-deep text-white hover:text-white'
                    : ''
                }`}
              >
                {categoryMeta[category]?.label ?? category}
              </button>
            ))}
          </div>
        )}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-sm text-stone-600">
          <span>{sortedItems.length} produtos</span>
          <div className="flex items-center gap-2">
            <label htmlFor="sort-brand" className="text-xs font-semibold tracking-[0.08em] text-stone-600">
              Ordenar por
            </label>
            <select
              id="sort-brand"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as ProductSortKey)}
              className="rounded-full border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-stone-700 shadow-sm focus:border-brand-ocean focus:outline-none focus:ring-2 focus:ring-brand-ocean/30"
            >
              {productSortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <ProductGrid items={sortedItems} isLoading={isLoading} />
      </div>
    </section>
  )
}

export default BrandPage
