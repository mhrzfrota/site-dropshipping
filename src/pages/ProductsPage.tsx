import React from 'react'
import ProductGrid from '../components/ProductGrid'
import { products } from '../data/products'

const ProductsPage: React.FC = () => {
  return (
    <section className="bg-brand-sand py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Produtos</p>
          <h1 className="mt-3 font-display text-3xl font-black text-stone-800 sm:text-4xl">Todos os produtos</h1>
          <p className="mt-2 text-sm text-stone-500">
            Seleção completa com moda praia, fitness e acessórios.
          </p>
        </div>
        <ProductGrid items={products} />
      </div>
    </section>
  )
}

export default ProductsPage
