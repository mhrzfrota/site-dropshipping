import React from 'react'
import { Link } from 'react-router-dom'
import { categoryMeta, formatPrice } from '../data/products'
import type { Product } from '../data/products'

type ProductCardProps = {
  product: Product
}

const fallbackImage = '/images/blusa-1.jpg'

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const productIndex = Number(product.id.split('-')[1]) || 0
  const badgeLabel = productIndex <= 3 ? 'Lançamento' : productIndex <= 6 ? 'Novo' : null
  const secondaryImage = product.images?.find((image) => image !== product.image)

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget
    if (target.dataset.fallbackApplied) return
    target.dataset.fallbackApplied = 'true'
    target.src = fallbackImage
  }

  return (
    <div className="group card-surface card-hover h-full overflow-hidden">
      <div className="relative aspect-[4/5] overflow-hidden">
        {badgeLabel && (
          <span className="badge badge-primary absolute left-3 top-3 z-10">
            {badgeLabel}
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`h-full w-full object-cover object-[center_20%] transition duration-500 ease-out group-hover:scale-105 ${
            secondaryImage ? 'group-hover:opacity-0' : ''
          }`}
          onError={handleImageError}
          loading="lazy"
          decoding="async"
        />
        {secondaryImage && (
          <img
            src={secondaryImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-[center_20%] opacity-0 transition duration-500 ease-out group-hover:opacity-100"
            onError={handleImageError}
            loading="lazy"
            decoding="async"
          />
        )}
      </div>

      <div className="flex h-full flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="badge badge-neutral">{product.brand}</span>
        </div>
        <h3 className="font-display text-lg font-bold text-ink">{product.name}</h3>
        <p className="text-xs font-semibold tracking-[0.12em] text-stone-600">
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
