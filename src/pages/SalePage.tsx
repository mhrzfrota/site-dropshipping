import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatPrice, getAllProducts, normalizeSlug, type Product } from '../data/products'

type FilterSection = {
  title: string
  key: string
  options: { label: string; value: string }[]
}

const SalePage: React.FC = () => {
  const allProducts = useMemo(() => getAllProducts(), [])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [expandedFilters, setExpandedFilters] = useState<string[]>(['categoria', 'marcas'])

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 350)
    return () => window.clearTimeout(timer)
  }, [])

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>()
    allProducts.forEach((p) => cats.add(p.category))
    return Array.from(cats).map((cat) => ({
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
      value: cat,
    }))
  }, [allProducts])

  // Get unique brands
  const brands = useMemo(() => {
    const brandSet = new Set<string>()
    allProducts.forEach((p) => brandSet.add(p.brand))
    return Array.from(brandSet)
      .sort()
      .map((brand) => ({
        label: brand,
        value: normalizeSlug(brand),
      }))
  }, [allProducts])

  const filters: FilterSection[] = [
    { title: 'Categoria', key: 'categoria', options: categories },
    { title: 'Marcas', key: 'marcas', options: brands },
  ]

  // Filter products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false
      }
      if (selectedBrands.length > 0 && !selectedBrands.includes(normalizeSlug(product.brand))) {
        return false
      }
      return true
    })
  }, [allProducts, selectedCategories, selectedBrands])

  const toggleFilter = (key: string) => {
    setExpandedFilters((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }

  const toggleCategory = (value: string) => {
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  const toggleBrand = (value: string) => {
    setSelectedBrands((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  const getDiscountedPrice = (price: number) => price * 0.85
  const getInstallmentPrice = (price: number) => price / 2

  return (
    <section className="min-h-screen bg-white pt-20">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-stone-500">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-ink font-medium">SALE</span>
        </nav>

        {/* Title */}
        <h1 className="mb-10 text-center font-display text-4xl font-black text-ink">SALE</h1>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <h2 className="mb-6 text-lg font-bold text-ink">Filtros</h2>

            {filters.map((filter) => (
              <div key={filter.key} className="border-b border-stone-200 py-4">
                <button
                  type="button"
                  onClick={() => toggleFilter(filter.key)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <span className="text-sm font-semibold text-ink">{filter.title}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`h-5 w-5 text-stone-400 transition-transform ${
                      expandedFilters.includes(filter.key) ? 'rotate-180' : ''
                    }`}
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {expandedFilters.includes(filter.key) && (
                  <div className="mt-3 space-y-2">
                    {filter.options.map((option) => {
                      const isSelected =
                        filter.key === 'categoria'
                          ? selectedCategories.includes(option.value)
                          : selectedBrands.includes(option.value)

                      return (
                        <label
                          key={option.value}
                          className="flex cursor-pointer items-center gap-3 text-sm text-stone-600 hover:text-ink"
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() =>
                              filter.key === 'categoria'
                                ? toggleCategory(option.value)
                                : toggleBrand(option.value)
                            }
                            className="h-4 w-4 rounded border-stone-300 text-ink focus:ring-ink"
                          />
                          <span className={isSelected ? 'font-medium text-ink' : ''}>
                            {option.label}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[3/4] rounded-lg bg-stone-200" />
                    <div className="mt-3 h-4 w-3/4 rounded bg-stone-200" />
                    <div className="mt-2 h-4 w-1/2 rounded bg-stone-200" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                  <SaleProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {!isLoading && filteredProducts.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-lg text-stone-500">Nenhum produto encontrado com os filtros selecionados.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategories([])
                    setSelectedBrands([])
                  }}
                  className="mt-4 text-sm font-semibold text-brand-deep hover:underline"
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// Sale Product Card Component
const SaleProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const originalPrice = product.price
  const discountedPrice = originalPrice * 0.85
  const installmentPrice = discountedPrice / 2
  const discountPercent = 15

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget
    if (target.dataset.fallbackApplied) return
    target.dataset.fallbackApplied = 'true'
    target.src = '/images/blusa-1.jpg'
  }

  return (
    <Link to={`/produto/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
        {/* Sale Badge */}
        <span className="absolute left-3 top-3 z-10 rounded bg-red-600 px-2 py-1 text-xs font-bold uppercase text-white">
          SALE
        </span>

        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-[center_20%] transition duration-300 group-hover:scale-105"
          onError={handleImageError}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-medium text-ink line-clamp-2">{product.name}</h3>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-stone-400 line-through">{formatPrice(originalPrice)}</span>
          <span className="text-sm font-bold text-ink">{formatPrice(discountedPrice)}</span>
          <span className="text-[10px] text-white bg-green-600 px-1.5 py-0.5 rounded font-semibold">
            -{discountPercent}%
          </span>
        </div>

        <p className="text-xs text-stone-500">
          ou em 2x de <span className="font-semibold text-ink">{formatPrice(installmentPrice)}</span> sem juros
        </p>

        {/* Sizes */}
        {product.variants.sizes.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {product.variants.sizes.map((size) => (
              <span
                key={size}
                className="flex h-6 w-6 items-center justify-center border border-stone-200 text-[10px] font-medium text-stone-600"
              >
                {size}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}

export default SalePage
