import React from 'react'
import { Link } from 'react-router-dom'
import { categoryMeta, formatPrice } from '../data/products'
import type { Product } from '../data/products'

type ProductCardProps = {
  product: Product
}

const fallbackImage = '/images/cat-roupas.jpg'

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget
    if (target.dataset.fallbackApplied) return
    target.dataset.fallbackApplied = 'true'
    target.src = fallbackImage
  }

  return (
    <div className="group card-hover h-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-brand-aqua/15">
      <div className="relative aspect-[4/5] overflow-hidden">
        {/* Troque o placeholder abaixo pela foto real do produto/cole??o */}
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
          onError={handleImageError}
        />
        <span className="chip absolute left-3 top-3 bg-white/90 text-brand-deep shadow-sm">{product.brand}</span>
      </div>

      <div className="flex h-full flex-col gap-2 p-4">
        <h3 className="font-display text-lg font-bold text-ink">{product.name}</h3>
        <p className="text-xs uppercase tracking-[0.2em] text-ink/60">
          {categoryMeta[product.category]?.label ?? product.category}
        </p>
        <p className="text-lg font-extrabold text-brand-deep">{formatPrice(product.price)}</p>
        <Link
          to={`/produto/${product.slug}`}
          className="mt-auto inline-flex w-full justify-center rounded-xl bg-brand-deep px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-ocean"
        >
          Comprar
        </Link>
      </div>
    </div>
  )
}

export default ProductCard
