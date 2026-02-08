import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllProducts, formatPrice, normalizeSlug, type Product } from '../data/products'

const fallbackImage = '/images/home-hero.png'

const FeaturedProductsSection: React.FC = () => {
  const products = getAllProducts()
  const loopedProducts = [...products, ...products, ...products]
  const carouselRef = useRef<HTMLDivElement | null>(null)

  const normalizeInfiniteScroll = () => {
    const container = carouselRef.current
    if (!container) return

    const singleLoopWidth = container.scrollWidth / 3
    if (!singleLoopWidth) return

    if (container.scrollLeft >= singleLoopWidth * 2) {
      container.scrollLeft -= singleLoopWidth
    } else if (container.scrollLeft <= 0) {
      container.scrollLeft += singleLoopWidth
    }
  }

  const setMiddleLoopPosition = () => {
    const container = carouselRef.current
    if (!container) return

    const singleLoopWidth = container.scrollWidth / 3
    if (!singleLoopWidth) return

    container.scrollLeft = singleLoopWidth
  }

  useEffect(() => {
    setMiddleLoopPosition()
    window.addEventListener('resize', setMiddleLoopPosition)

    return () => {
      window.removeEventListener('resize', setMiddleLoopPosition)
    }
  }, [])

  const scrollProducts = (direction: 'prev' | 'next') => {
    const container = carouselRef.current
    if (!container) return

    const firstItem = container.querySelector<HTMLElement>('[data-carousel-item]')
    const itemWidth = firstItem?.getBoundingClientRect().width ?? Math.max(container.clientWidth * 0.25, 220)
    const styles = window.getComputedStyle(container)
    const gap = Number.parseFloat(styles.columnGap || styles.gap || '0') || 0
    const amount = itemWidth + gap
    const left = direction === 'next' ? amount : -amount

    container.scrollBy({
      left,
      behavior: 'smooth',
    })

    window.setTimeout(() => {
      normalizeInfiniteScroll()
    }, 320)
  }

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="mb-6 text-center">
          <h2 className="font-raleway text-2xl font-normal tracking-[0.01em] text-stone-900 sm:text-[2rem]">
            Produtos Destaques
          </h2>
        </div>

        <div className="relative">
          <button
            type="button"
            aria-label="Produtos anteriores"
            onClick={() => scrollProducts('prev')}
            className="absolute left-0 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-[#0a1f3d] bg-white/95 text-[#0a1f3d] transition hover:bg-[#0a1f3d] hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Proximos produtos"
            onClick={() => scrollProducts('next')}
            className="absolute right-0 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-[#0a1f3d] bg-white/95 text-[#0a1f3d] transition hover:bg-[#0a1f3d] hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div
            ref={carouselRef}
            onScroll={normalizeInfiniteScroll}
            className="flex gap-4 overflow-x-hidden scroll-smooth px-14 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {loopedProducts.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                data-carousel-item
                className="min-w-0 shrink-0 basis-[calc(50%-0.5rem)] md:basis-[calc(33.333%-0.7rem)] lg:basis-[calc(25%-0.75rem)]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/produtos"
            className="inline-flex min-h-[48px] items-center justify-center border border-[#0a1f3d] px-10 font-body text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0a1f3d] transition hover:bg-[#0a1f3d] hover:text-white"
          >
            Ver todos os produtos
          </Link>
        </div>
      </div>
    </section>
  )
}

type ProductCardProps = {
  product: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [secondImageError, setSecondImageError] = useState(false)

  const primaryImage = product.image
  const secondaryImage = product.images && product.images.length > 1 ? product.images[1] : null

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget
    if (target.dataset.fallbackApplied) return
    target.dataset.fallbackApplied = 'true'
    target.src = fallbackImage
  }

  const handleSecondImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget
    if (target.dataset.fallbackApplied) return
    target.dataset.fallbackApplied = 'true'
    setSecondImageError(true)
  }

  const showSecondImage = isHovered && secondaryImage && !secondImageError

  return (
    <Link
      to={`/produto/${normalizeSlug(product.slug)}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
        {/* Primary Image */}
        <img
          src={primaryImage}
          alt={product.name}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            showSecondImage ? 'opacity-0' : 'opacity-100'
          }`}
          onError={handleImageError}
          loading="lazy"
          decoding="async"
        />

        {/* Secondary Image (shown on hover) */}
        {secondaryImage && !secondImageError && (
          <img
            src={secondaryImage}
            alt={`${product.name} - foto alternativa`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              showSecondImage ? 'opacity-100' : 'opacity-0'
            }`}
            onError={handleSecondImageError}
            loading="lazy"
            decoding="async"
          />
        )}

        {/* Badge */}
        {product.isNew && (
          <span className="absolute left-3 top-3 bg-[#0a1f3d] px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            Novidade
          </span>
        )}

        {/* Hover Overlay with Info */}
        <div
          className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 transition-all duration-400 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <div className="flex flex-wrap gap-1">
            {product.variants.sizes.slice(0, 4).map((size) => (
              <span
                key={size}
                className="flex h-7 min-w-[28px] items-center justify-center border border-white/80 bg-white/10 px-2 text-[10px] font-semibold text-white backdrop-blur-sm"
              >
                {size}
              </span>
            ))}
          </div>
          {product.variants.colors.length > 0 && (
            <p className="mt-2 text-[11px] text-white/80">
              {product.variants.colors.length} {product.variants.colors.length === 1 ? 'cor' : 'cores'}
            </p>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4 space-y-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-stone-400">
          {product.brand}
        </p>
        <h3 className="text-sm font-medium text-stone-900 transition-colors group-hover:text-[#0a1f3d]">
          {product.name}
        </h3>
        <p className="text-sm font-bold text-stone-900">
          {formatPrice(product.price)}
        </p>
        <p className="text-[11px] text-stone-500">
          ou 3x de {formatPrice(product.price / 3)}
        </p>
      </div>
    </Link>
  )
}

export default FeaturedProductsSection
