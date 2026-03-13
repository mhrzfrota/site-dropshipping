import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { formatPrice, getProductBySlug } from '../data/products'

const fallbackImage = '/images/blusa-1.jpg'

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams()
  const product = slug ? getProductBySlug(slug) : undefined
  const { addItem, openCart } = useCart()
  const { showToast } = useToast()

  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const galleryImages = useMemo(() => {
    if (!product) return [fallbackImage]
    const rawImages = product.images?.length ? product.images : [product.image]
    const uniqueImages = Array.from(new Set(rawImages.filter(Boolean)))
    return uniqueImages.length ? uniqueImages : [fallbackImage]
  }, [product])

  useEffect(() => {
    if (!product) return
    setSelectedSize('')
    setSelectedColor('')
    setCurrentImageIndex(0)
  }, [product])

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget
    if (target.dataset.fallbackApplied) return
    target.dataset.fallbackApplied = 'true'
    target.src = fallbackImage
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  if (!product) {
    return (
      <section className="min-h-screen bg-white pt-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="font-display text-3xl font-black text-ink">Produto não encontrado</h1>
          <p className="mt-2 text-sm text-stone-600">Confira outras opções na vitrine completa.</p>
          <Link to="/produtos" className="mt-6 inline-flex items-center gap-2 rounded bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600">
            Ver todos os produtos
          </Link>
        </div>
      </section>
    )
  }

  const hasSizes = product.variants.sizes.length > 0
  const hasColors = product.variants.colors.length > 0

  // Calculate prices (simulating sale)
  const originalPrice = product.price
  const discountedPrice = originalPrice * 0.85
  const installmentPrice = discountedPrice / 2

  const handleAddToCart = () => {
    if (hasSizes && !selectedSize) {
      showToast('Selecione um tamanho para continuar.')
      return
    }
    if (hasColors && !selectedColor) {
      showToast('Selecione uma cor para continuar.')
      return
    }
    addItem(product, selectedSize || undefined, selectedColor || undefined)
    showToast('Produto adicionado ao carrinho.', {
      action: {
        label: 'Ver carrinho',
        onClick: openCart,
      },
    })
  }

  return (
    <section className="min-h-screen bg-white pt-20">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-stone-500">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/sale" className="hover:text-ink">SALE</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          {/* Left: Image Gallery */}
          <div className="relative">
            {/* Sale Badge */}
            <span className="absolute left-4 top-4 z-10 rounded bg-red-600 px-3 py-1 text-xs font-bold uppercase text-white">
              SALE
            </span>

            {/* Main Image */}
            <div className="relative aspect-square bg-stone-50">
              <img
                src={galleryImages[currentImageIndex]}
                alt={product.name}
                className="h-full w-full object-contain"
                onError={handleImageError}
                loading="eager"
                decoding="async"
              />

              {/* Navigation Arrows */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center text-stone-400 transition hover:text-ink"
                    aria-label="Imagem anterior"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
                      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center text-stone-400 transition hover:text-ink"
                    aria-label="Próxima imagem"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
                      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            {/* SKU */}
            <p className="text-xs text-stone-400 uppercase tracking-wider">
              {product.id.toUpperCase()}
            </p>

            {/* Product Name */}
            <h1 className="font-display text-2xl font-bold text-ink leading-tight lg:text-3xl">
              {product.name}
            </h1>

            {/* Prices */}
            <div className="space-y-1">
              <p className="text-sm text-stone-400 line-through">{formatPrice(originalPrice)}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-ink">{formatPrice(discountedPrice)}</span>
                <span className="text-sm text-stone-500">à vista</span>
              </div>
              <p className="flex items-center gap-2 text-sm text-stone-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <path d="M2 10h20" />
                </svg>
                ou em 2x de <span className="font-semibold text-ink">{formatPrice(installmentPrice)}</span> sem juros
              </p>
            </div>

            {/* Size Selection */}
            {hasSizes && (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-ink">Tamanho</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.sizes.map((size) => {
                    const isSelected = selectedSize === size
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`flex h-10 w-10 items-center justify-center border text-sm font-medium transition ${
                          isSelected
                            ? 'border-ink bg-ink text-white'
                            : 'border-stone-300 bg-white text-ink hover:border-ink'
                        }`}
                      >
                        {size}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {hasColors && (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-ink">
                  Cor{selectedColor ? `: ${selectedColor}` : ''}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.colors.map((color) => {
                    const isSelected = selectedColor === color
                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
                          isSelected
                            ? 'border-ink bg-ink text-white'
                            : 'border-stone-300 bg-white text-ink hover:border-ink'
                        }`}
                      >
                        {color}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Stock Warning */}
            <div className="inline-flex items-center gap-2 rounded bg-ink px-3 py-2 text-xs font-semibold text-white">
              <span>Últimas {Math.floor(Math.random() * 5) + 2} unidades disponíveis</span>
            </div>

            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full rounded bg-orange-500 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-orange-600"
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetailPage
