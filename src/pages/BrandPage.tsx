import React from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import { brands, products } from '../data/products'

const BrandPage: React.FC = () => {
  const { slug } = useParams()
  const brand = brands.find((item) => item.slug === slug)
  const filtered = products.filter((product) => product.brandSlug === slug)

  return (
    <section className="bg-brand-sand py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Marca</p>
          <h1 className="mt-3 font-display text-3xl font-black text-stone-800 sm:text-4xl">
            {brand ? brand.label : 'Marca não encontrada'}
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            {brand
              ? `Descubra o estilo da marca ${brand.label} em nossa curadoria.`
              : 'Tente outra marca para continuar navegando.'}
          </p>
          <div className="mt-4 flex items-center justify-center gap-3 text-sm">
            <Link to="/produtos" className="font-semibold text-brand-deep transition hover:text-brand-ocean">
              Ver todos os produtos
            </Link>
            {brand && (
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

export default BrandPage
