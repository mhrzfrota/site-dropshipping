import React from 'react'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import type { Product } from '../data/products'

type ProductGridProps = {
  items: Product[]
  isLoading?: boolean
  skeletonCount?: number
}

const ProductGrid: React.FC<ProductGridProps> = ({ items, isLoading = false, skeletonCount = 6 }) => {
  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div
            key={`skeleton-${index}`}
            className="animate-pulse overflow-hidden rounded-2xl border border-white/70 bg-white/70 shadow-sm"
          >
            <div className="aspect-[4/5] bg-stone-200/70" />
            <div className="space-y-3 p-4">
              <div className="h-4 w-3/4 rounded-full bg-stone-200/80" />
              <div className="h-3 w-1/3 rounded-full bg-stone-200/60" />
              <div className="h-5 w-1/2 rounded-full bg-stone-200/70" />
              <div className="h-11 w-full rounded-xl bg-stone-200/70" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!items.length) {
    return (
      <div className="rounded-3xl border border-dashed border-brand-aqua/40 bg-white/80 px-6 py-12 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-aqua/20 text-brand-deep">
          <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
            <path
              d="M6 7h12l-1 12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 7Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 7V5a3 3 0 0 1 6 0v2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 className="mt-4 text-lg font-semibold text-stone-700">Nenhum produto por aqui</h3>
        <p className="mt-2 text-sm text-stone-500">
          Ajuste os filtros ou explore a coleção completa da Mar&Mov.
        </p>
        <Link to="/produtos" className="mt-5 inline-flex items-center justify-center btn-primary">
          Ver coleção completa
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid
