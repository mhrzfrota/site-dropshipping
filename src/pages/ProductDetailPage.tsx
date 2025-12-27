import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { categoryMeta, formatPrice, getProductBySlug, normalizeSlug } from '../data/products'

const fallbackImage = '/images/cat-roupas.jpg'

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams()
  const product = slug ? getProductBySlug(slug) : undefined
  const categoryInfo = product ? categoryMeta[product.category] : undefined

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget
    if (target.dataset.fallbackApplied) return
    target.dataset.fallbackApplied = 'true'
    target.src = fallbackImage
  }

  if (!product) {
    return (
      <section className="bg-brand-sand py-12">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Produto</p>
          <h1 className="mt-3 font-display text-3xl font-black text-stone-800">Produto não encontrado</h1>
          <p className="mt-2 text-sm text-stone-500">Confira outras opções na vitrine completa.</p>
          <Link
            to="/produtos"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-deep px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-ocean"
          >
            Ver todos os produtos
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-brand-sand py-12">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1.1fr_1fr]">
        <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
            onError={handleImageError}
          />
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Produto</p>
            <h1 className="font-display text-3xl font-black text-stone-800 sm:text-4xl">{product.name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-stone-500">
              <Link to={`/marca/${normalizeSlug(product.brand)}`} className="font-semibold text-brand-deep">
                {product.brand}
              </Link>
              <span aria-hidden="true">•</span>
              {categoryInfo ? (
                <Link to={`/categoria/${product.category}`} className="font-semibold text-stone-600">
                  {categoryInfo.label}
                </Link>
              ) : (
                <span className="font-semibold text-stone-600">Categoria especial</span>
              )}
            </div>
          </div>

          <p className="text-base text-stone-600">
            Peça selecionada com acabamento premium e conforto para acompanhar sua rotina.
          </p>

          <div className="space-y-1">
            <p className="text-2xl font-extrabold text-stone-900">{formatPrice(product.price)}</p>
            <p className="text-sm text-stone-500">Pagamento em até 6x sem juros.</p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white/70 px-5 py-4 text-sm text-stone-600">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold">Tamanhos:</span>
              <span>
                {product.variants.sizes.length ? product.variants.sizes.join(', ') : 'Tamanho único'}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="font-semibold">Cores:</span>
              <span>{product.variants.colors.join(', ')}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="rounded-full bg-brand-deep px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-ocean">
              Comprar agora
            </button>
            <Link
              to="/produtos"
              className="rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-500 hover:text-stone-900"
            >
              Voltar para produtos
            </Link>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white/70 px-5 py-4 text-sm text-stone-600">
            Entrega para todo o Brasil ou retirada na loja física. Troca facilitada em até 7 dias.
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetailPage
