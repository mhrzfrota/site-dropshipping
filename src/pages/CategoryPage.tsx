import React from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import { categories, products } from '../data/products'

const CategoryPage: React.FC = () => {
  const { slug } = useParams()
  const category = categories.find((item) => item.slug === slug)
  const filtered = products.filter((product) => product.category === slug)

  return (
    <section className="bg-brand-sand py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Categoria</p>
          <h1 className="mt-3 font-display text-3xl font-black text-stone-800 sm:text-4xl">
            {category ? category.label : 'Categoria não encontrada'}
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            {category
              ? `Confira os produtos selecionados em ${category.label.toLowerCase()}.`
              : 'Escolha outra categoria para continuar explorando.'}
          </p>
          <div className="mt-4 flex items-center justify-center gap-3 text-sm">
            <Link to="/produtos" className="font-semibold text-brand-deep transition hover:text-brand-ocean">
              Ver todos os produtos
            </Link>
            {category && (
              <Link
                to="/"
                className="rounded-full border border-stone-300 px-3 py-1 text-xs font-semibold text-stone-600 transition hover:border-stone-500 hover:text-stone-800"
              >
                Voltar para a home
              </Link>
            )}
          </div>
        </div>
        <ProductGrid items={filtered} />
      </div>
    </section>
  )
}

export default CategoryPage
