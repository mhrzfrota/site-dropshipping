import React, { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getAllProducts, formatPrice } from '../data/products'

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')?.trim() ?? ''

  const results = useMemo(() => {
    if (!query) return []
    const lower = query.toLowerCase()
    return getAllProducts().filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.brand.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower),
    )
  }, [query])

  return (
    <section className="bg-brand-sand min-h-screen pt-28 pb-16">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="font-display text-2xl font-black text-ink mb-1">
          {query ? `Resultados para "${query}"` : 'Buscar produtos'}
        </h1>
        {query && (
          <p className="text-sm text-stone-500 mb-8">
            {results.length === 0
              ? 'Nenhum produto encontrado.'
              : `${results.length} produto${results.length > 1 ? 's' : ''} encontrado${results.length > 1 ? 's' : ''}.`}
          </p>
        )}

        {results.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {results.map((product) => {
              const discountedPrice = product.price * 0.85
              return (
                <Link
                  key={product.id}
                  to={`/produto/${product.slug}`}
                  className="group block rounded border border-stone-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition"
                >
                  <div className="aspect-square bg-stone-50 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-stone-500">{product.brand}</p>
                    <p className="font-semibold text-ink text-sm mt-0.5 leading-snug">{product.name}</p>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-base font-bold text-ink">{formatPrice(discountedPrice)}</span>
                      <span className="text-xs text-stone-400 line-through">{formatPrice(product.price)}</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {query && results.length === 0 && (
          <div className="mt-8 text-center space-y-4">
            <p className="text-stone-600">Tente um termo diferente ou explore nossa vitrine completa.</p>
            <Link
              to="/produtos"
              className="inline-flex items-center gap-2 rounded bg-orange-500 px-6 py-3 text-sm font-bold text-white hover:bg-orange-600 transition"
            >
              Ver todos os produtos
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default SearchPage
