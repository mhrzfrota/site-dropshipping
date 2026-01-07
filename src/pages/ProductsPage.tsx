import React, { useEffect, useMemo, useState } from 'react'
import ProductGrid from '../components/ProductGrid'
import { getAllProducts, productSortOptions, sortProducts, type ProductSortKey } from '../data/products'

const ProductsPage: React.FC = () => {
  const items = useMemo(() => getAllProducts(), [])
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState<ProductSortKey>('destaques')

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 350)
    return () => window.clearTimeout(timer)
  }, [])

  const sortedItems = useMemo(() => sortProducts(items, sortBy), [items, sortBy])

  return (
    <section className="bg-brand-sand py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold tracking-[0.12em] text-stone-600">Produtos</p>
          <h1 className="mt-3 font-display text-3xl font-black text-stone-800 sm:text-4xl">Todos os produtos</h1>
          <p className="mt-2 text-sm text-stone-600">
            Curadoria completa com moda praia, fitness e acessórios.
          </p>
        </div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-sm text-stone-600">
          <span>{sortedItems.length} produtos</span>
          <div className="flex items-center gap-2">
            <label htmlFor="sort-products" className="text-xs font-semibold tracking-[0.08em] text-stone-600">
              Ordenar por
            </label>
            <select
              id="sort-products"
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

export default ProductsPage
