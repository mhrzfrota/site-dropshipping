import React, { useMemo, useState } from 'react'
import { getAllProducts, type Product } from '../data/products'
import { ProductCard } from './FeaturedProductsSection'

type TabKey = 'feminino' | 'masculino'

const NewArrivalsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('feminino')

  const productTabs = useMemo<Record<TabKey, Product[]>>(() => {
    const allProducts = getAllProducts()

    return {
      feminino: allProducts.filter((product) => ['biquinis', 'maios'].includes(product.category)),
      masculino: allProducts.filter((product) => ['roupas', 'acessorios'].includes(product.category)),
    }
  }, [])

  const items = productTabs[activeTab]

  return (
    <section id="vitrine" className="bg-white pt-8 pb-16 scroll-mt-28">
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-stone-900 sm:text-[1.8rem]">
            Novidades
          </h2>
        </div>

        <div className="mt-5 flex items-center justify-center gap-4 sm:gap-6">
          {(['feminino', 'masculino'] as TabKey[]).map((tab) => {
            const isActive = activeTab === tab
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative w-32 px-2 pb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] transition ${
                  isActive ? 'text-[#0a1f3d]' : 'text-stone-400'
                }`}
                aria-pressed={isActive}
              >
                {tab === 'feminino' ? 'Feminino' : 'Masculino'}
                <span
                  aria-hidden="true"
                  className={`absolute left-1/2 -bottom-[2px] h-[3px] w-full -translate-x-1/2 ${
                    isActive ? 'bg-[#0a1f3d]' : 'bg-stone-200'
                  }`}
                />
              </button>
            )
          })}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {items.map((product) => (
            <ProductCard key={`${activeTab}-${product.id}`} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewArrivalsSection
