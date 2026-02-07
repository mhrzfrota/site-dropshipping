import React, { useState } from 'react'
import { Link } from 'react-router-dom'

type TabKey = 'feminino' | 'masculino'

type ProductCard = {
  id: string
  title: string
  price: string
  installment: string
  image: string
  href: string
  colors?: string
}

const fallbackImage = '/images/biquini-2.jpg'

const productTabs: Record<TabKey, ProductCard[]> = {
  feminino: [
    {
      id: 'fem-1',
      title: 'Blusa Cropped Frente Unica com Amarracao',
      price: 'R$ 249,00',
      installment: 'em 5x de R$ 49,80',
      image: '/images/blusa-1.jpg',
      href: '/produtos',
    },
    {
      id: 'fem-2',
      title: 'Blusa Feminina Fluida com Manga Kimono',
      price: 'R$ 199,00',
      installment: 'em 3x de R$ 66,33',
      image: '/images/academia-4.jpg',
      href: '/produtos',
    },
    {
      id: 'fem-3',
      title: 'Blusa Feminina Poas com Babados',
      price: 'R$ 399,00',
      installment: 'em 5x de R$ 79,80',
      image: '/images/academia-1.jpg',
      href: '/produtos',
      colors: '+Cores',
    },
    {
      id: 'fem-4',
      title: 'Saia Longa Feminina Sereia em Renda',
      price: 'R$ 299,00',
      installment: 'em 5x de R$ 59,80',
      image: '/images/bolsa-1.jpg',
      href: '/produtos',
    },
  ],
  masculino: [
    {
      id: 'masc-1',
      title: 'Camisa Masculina Texturizada Manga Curta',
      price: 'R$ 189,00',
      installment: 'em 3x de R$ 63,00',
      image: '/images/short-masc-2.jpg',
      href: '/produtos',
    },
    {
      id: 'masc-2',
      title: 'Bermuda Masculina Alfaiatada Summer',
      price: 'R$ 229,00',
      installment: 'em 4x de R$ 57,25',
      image: '/images/short-masc-4.jpg',
      href: '/produtos',
    },
    {
      id: 'masc-3',
      title: 'Camiseta Masculina Dry Fit',
      price: 'R$ 149,00',
      installment: 'em 2x de R$ 74,50',
      image: '/images/short-masc-3.jpg',
      href: '/produtos',
      colors: '+Cores',
    },
    {
      id: 'masc-4',
      title: 'Short Masculino Praia com Bolso',
      price: 'R$ 169,00',
      installment: 'em 3x de R$ 56,33',
      image: '/images/short-masc.jpg',
      href: '/produtos',
    },
  ],
}

const NewArrivalsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('feminino')
  const items = productTabs[activeTab]

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget
    if (target.dataset.fallbackApplied) return
    target.dataset.fallbackApplied = 'true'
    target.src = fallbackImage
  }

  return (
    <section id="vitrine" className="bg-white py-16 scroll-mt-28">
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.32em] text-stone-500">NOVIDADES</p>
        </div>

        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
          {(['feminino', 'masculino'] as TabKey[]).map((tab) => {
            const isActive = activeTab === tab
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative w-full max-w-[220px] px-2 pb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] transition sm:w-56 ${
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

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <Link key={item.id} to={item.href} className="group">
              <div className="relative overflow-hidden rounded-2xl bg-stone-100">
                <div className="aspect-[2/3]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                    onError={handleImageError}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <span
                  aria-hidden="true"
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#0a1f3d] shadow-sm transition group-hover:scale-105"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M12 20.5s-6.5-4.2-8.3-7.6C2.3 10.7 3 8 5.4 6.8c2.1-1.1 4.2-0.2 5.3 1.3c1.1-1.5 3.2-2.4 5.3-1.3c2.4 1.2 3.1 3.9 1.7 6.1C18.5 16.3 12 20.5 12 20.5Z" />
                  </svg>
                </span>
              </div>
              <div className="mt-3 space-y-1">
                <p className="text-sm font-medium text-[#0a1f3d]">{item.title}</p>
                <div className="flex items-center justify-between gap-2 text-sm">
                  <span className="font-semibold text-[#0a1f3d]">{item.price}</span>
                  {item.colors && (
                    <span className="text-xs font-semibold text-[#0a1f3d]/70">{item.colors}</span>
                  )}
                </div>
                <p className="text-xs text-[#0a1f3d]/70">{item.installment}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewArrivalsSection
