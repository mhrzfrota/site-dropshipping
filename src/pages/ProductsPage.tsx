import React, { useEffect, useState } from 'react'
import ProductGrid from '../components/ProductGrid'
import { getAllProducts } from '../data/products'

const ProductsPage: React.FC = () => {
  const items = getAllProducts()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 350)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <section className="bg-brand-sand py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-stone-600">Produtos</p>
          <h1 className="mt-3 font-display text-3xl font-black text-stone-800 sm:text-4xl">Todos os produtos</h1>
          <p className="mt-2 text-sm text-stone-600">
            Curadoria completa com moda praia, fitness e acessórios.
          </p>
        </div>
        <ProductGrid items={items} isLoading={isLoading} />
      </div>
    </section>
  )
}

export default ProductsPage
