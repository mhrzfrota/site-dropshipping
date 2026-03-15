import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import {
  categoryMeta,
  getProductsByCategory,
  productSortOptions,
  sortProducts,
  type ProductSortKey,
} from '../data/products'

const CategoryPage: React.FC = () => {
  const { slug } = useParams()
  const items = slug ? getProductsByCategory(slug) : []
  const categoryInfo = slug ? categoryMeta[slug as keyof typeof categoryMeta] : undefined
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState<ProductSortKey>('destaques')

  useEffect(() => {
    setIsLoading(true)
    setSortBy('destaques')
    const timer = window.setTimeout(() => setIsLoading(false), 350)
    return () => window.clearTimeout(timer)
  }, [slug])

  const sortedItems = useMemo(() => sortProducts(items, sortBy), [items, sortBy])

  return (
    <section className="bg-brand-sand py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold tracking-[0.12em] text-stone-600">Categoria</p>
          <h1 className="mt-3 font-display text-3xl font-black text-stone-800 sm:text-4xl">
            {categoryInfo ? categoryInfo.label : 'Categoria não encontrada'}
          </h1>
          <p className="mt-2 text-sm text-stone-600">
            {categoryInfo
              ? `Confira os produtos selecionados em ${categoryInfo.label.toLowerCase()}.`
              : 'Escolha outra categoria para continuar explorando.'}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
            <Link to="/sale" className="btn-primary">
              Ver todos os produtos
            </Link>
            {categoryInfo && (
              <Link to="/" className="btn-secondary">
                Voltar para a home
              </Link>
            )}
          </div>
        </div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-sm text-stone-600">
          <span>{sortedItems.length} produtos</span>
          <div className="flex items-center gap-2">
            <label htmlFor="sort-category" className="text-xs font-semibold tracking-[0.08em] text-stone-600">
              Ordenar por
            </label>
            <select
              id="sort-category"
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

export default CategoryPage
