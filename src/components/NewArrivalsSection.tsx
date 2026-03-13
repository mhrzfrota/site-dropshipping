import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllProducts, type Product } from '../data/products'
import { ProductCard } from './FeaturedProductsSection'

type TabKey = 'praia' | 'roupas'

const NewArrivalsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('praia')

  const productTabs = useMemo<Record<TabKey, Product[]>>(() => {
    const allProducts = getAllProducts()

    return {
      praia: allProducts.filter((product) => ['biquinis', 'maios'].includes(product.category)),
      roupas: allProducts.filter((product) =>
        ['roupas', 'acessorios'].includes(product.category),
      ),
    }
  }, [])

  const items = productTabs[activeTab]

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'praia', label: 'Praia & Banho' },
    { key: 'roupas', label: 'Roupas & Acessórios' },
  ]

  return (
    <section id="vitrine" className="bg-white pt-14 pb-16 scroll-mt-28">
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        {/* Header */}
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#477e8a] mb-1">
            Novidades
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-stone-900">
            Chegou na loja
          </h2>
        </div>

        {/* Tabs — pill style */}
        <div className="flex items-center gap-2 mb-10">
          {tabs.map(({ key, label }) => {
            const isActive = activeTab === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                aria-pressed={isActive}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.15em] transition ${
                  isActive
                    ? 'bg-[#0a1f3d] text-white'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {items.map((product) => (
            <ProductCard key={`${activeTab}-${product.id}`} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/produtos"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#0a1f3d] px-10 text-xs font-semibold uppercase tracking-[0.2em] text-[#0a1f3d] transition hover:bg-[#0a1f3d] hover:text-white"
          >
            Ver vitrine completa
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NewArrivalsSection
