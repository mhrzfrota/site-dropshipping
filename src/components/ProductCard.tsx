import React from 'react'
import { Link } from 'react-router-dom'
import { categoryMeta, formatPrice } from '../data/products'
import type { Product } from '../data/products'

type ProductCardProps = {
  product: Product
}

const fallbackImage = '/images/cat-roupas.jpg'

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const productIndex = Number(product.id.split('-')[1]) || 0
  const badgeLabel = productIndex <= 3 ? 'Lançamento' : productIndex <= 6 ? 'Novo' : null

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget
    if (target.dataset.fallbackApplied) return
    target.dataset.fallbackApplied = 'true'
    target.src = fallbackImage
  }

  return (
    <div className="group card-hover h-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-brand-aqua/15">
      <div className="relative aspect-[4/5] overflow-hidden">
        {badgeLabel && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-brand-deep px-3 py-1 text-[10px] font-semibold text-white shadow-sm">
            {badgeLabel}
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
          onError={handleImageError}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="flex h-full flex-col gap-3 p-5">
        <p className="text-xs font-semibold tracking-[0.2em] text-brand-deep/80">{product.brand}</p>
        <h3 className="font-display text-lg font-bold text-ink">{product.name}</h3>
        <p className="text-xs tracking-[0.2em] text-ink/60">
          {categoryMeta[product.category]?.label ?? product.category}
        </p>
        <p className="text-lg font-extrabold text-brand-deep">{formatPrice(product.price)}</p>
        <Link
          to={`/produto/${product.slug}`}
          className="btn-primary mt-auto w-full"
        >
          Comprar
        </Link>
      </div>
    </div>
  )
}

export default ProductCard
