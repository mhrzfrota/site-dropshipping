import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import { categoryMeta, getProductsByCategory } from '../data/products'

const CategoryPage: React.FC = () => {
  const { slug } = useParams()
  const items = slug ? getProductsByCategory(slug) : []
  const categoryInfo = slug ? categoryMeta[slug as keyof typeof categoryMeta] : undefined
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const timer = window.setTimeout(() => setIsLoading(false), 350)
    return () => window.clearTimeout(timer)
  }, [slug])

  return (
    <section className="bg-brand-sand py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-stone-600">Categoria</p>
          <h1 className="mt-3 font-display text-3xl font-black text-stone-800 sm:text-4xl">
            {categoryInfo ? categoryInfo.label : 'Categoria não encontrada'}
          </h1>
          <p className="mt-2 text-sm text-stone-600">
            {categoryInfo
              ? `Confira os produtos selecionados em ${categoryInfo.label.toLowerCase()}.`
              : 'Escolha outra categoria para continuar explorando.'}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
            <Link to="/produtos" className="btn-primary">
              Ver todos os produtos
            </Link>
            {categoryInfo && (
              <Link to="/" className="btn-secondary">
                Voltar para a home
              </Link>
            )}
          </div>
        </div>
        <ProductGrid items={items} isLoading={isLoading} />
      </div>
    </section>
  )
}

export default CategoryPage
