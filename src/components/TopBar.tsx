import React, { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { getAllProducts, normalizeSlug } from '../data/products'

type NavSubItem = {
  label: string
  href: string
}

type NavSection = {
  title: string
  items: NavSubItem[]
}

type NavFeature = {
  title: string
  description: string
  href: string
  image: string
}

type NavItem = {
  label: string
  href: string
  accent?: boolean
  sections: NavSection[]
  feature?: NavFeature
  isPrimary?: boolean
}

const splitIntoColumns = <T,>(items: T[], columnCount: number) => {
  const columns: T[][] = Array.from({ length: columnCount }, () => [])
  items.forEach((item, index) => {
    columns[index % columnCount].push(item)
  })
  return columns
}

const TopBar: React.FC = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [activeLink, setActiveLink] = useState<string | null>(null)
  const [logoError, setLogoError] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mobileOpenItem, setMobileOpenItem] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const { totalItems, toggleCart } = useCart()
  const { showToast } = useToast()

  const brands = useMemo(() => {
    const list = Array.from(
      getAllProducts().reduce((map, product) => {
        const slug = normalizeSlug(product.brand)
        if (!map.has(slug)) {
          map.set(slug, product.brand)
        }
        return map
      }, new Map<string, string>()),
    ).map(([slug, label]) => ({ slug, label }))
    return list
  }, [])

  const brandColumns = useMemo(() => splitIntoColumns(brands, 2), [brands])

  const navItems = useMemo<NavItem[]>(
    () => [
      {
        label: 'Novidades',
        href: '/produtos',
        isPrimary: true,
        sections: [
          {
            title: 'Lançamentos',
            items: [
              { label: 'Novos tecidos', href: '/produtos' },
              { label: 'Novas cores', href: '/produtos' },
              { label: 'Chegou hoje', href: '/produtos' },
            ],
          },
          {
            title: 'Curadoria',
            items: [
              { label: 'Mais desejados', href: '/produtos' },
              { label: 'Bestsellers', href: '/produtos' },
              { label: 'Trend report', href: '/produtos' },
            ],
          },
        ],
        feature: {
          title: 'Novidades Mar&Mov',
          description: 'Peças recém-chegadas da loja física direto para você.',
          href: '/produtos',
          image: '/images/academia-1.jpg',
        },
      },
      {
        label: 'Feminino',
        href: '/categoria/biquinis',
        isPrimary: true,
        sections: [
          {
            title: 'Moda Praia',
            items: [
              { label: 'Biquínis', href: '/categoria/biquinis' },
              { label: 'Maiôs', href: '/categoria/maios' },
              { label: 'Saídas de praia', href: '/categoria/roupas' },
            ],
          },
          {
            title: 'Fitness',
            items: [
              { label: 'Tops e conjuntos', href: '/categoria/roupas' },
              { label: 'Leggings', href: '/categoria/roupas' },
              { label: 'Camisetas', href: '/categoria/roupas' },
            ],
          },
          {
            title: 'Acessórios',
            items: [
              { label: 'Bolsas', href: '/categoria/acessorios' },
              { label: 'Óculos', href: '/categoria/acessorios' },
              { label: 'Chapéus', href: '/categoria/acessorios' },
            ],
          },
        ],
        feature: {
          title: 'Coleção Sol & Movimento',
          description: 'Biquínis e maiôs com modelagem moderna para praia e piscina.',
          href: '/categoria/biquinis',
          image: '/images/biquini-2.jpg',
        },
      },
      {
        label: 'Masculino',
        href: '/produtos',
        isPrimary: true,
        sections: [
          {
            title: 'Beachwear',
            items: [
              { label: 'Shorts', href: '/produtos' },
              { label: 'Camisetas UV', href: '/produtos' },
              { label: 'Regatas', href: '/produtos' },
            ],
          },
          {
            title: 'Treino',
            items: [
              { label: 'Shorts esportivos', href: '/produtos' },
              { label: 'Camisetas dry-fit', href: '/produtos' },
              { label: 'Acessórios', href: '/categoria/acessorios' },
            ],
          },
        ],
        feature: {
          title: 'Performance no ritmo certo',
          description: 'Shorts e peças leves para treinos e dias de praia.',
          href: '/produtos',
          image: '/images/short-masc-4.jpg',
        },
      },
      {
        label: 'Acessórios',
        href: '/categoria/acessorios',
        isPrimary: true,
        sections: [
          {
            title: 'Essenciais',
            items: [
              { label: 'Bolsas', href: '/categoria/acessorios' },
              { label: 'Óculos', href: '/categoria/acessorios' },
              { label: 'Chapéus', href: '/categoria/acessorios' },
            ],
          },
          {
            title: 'Para o dia a dia',
            items: [
              { label: 'Meias', href: '/categoria/acessorios' },
              { label: 'Necessaires', href: '/categoria/acessorios' },
              { label: 'Itens de viagem', href: '/categoria/acessorios' },
            ],
          },
        ],
      },
      {
        label: 'Kids',
        href: '/produtos',
        isPrimary: true,
        sections: [],
      },
      {
        label: 'Calçados',
        href: '/produtos',
        isPrimary: true,
        sections: [],
      },
      {
        label: 'Sale',
        href: '/produtos',
        accent: true,
        isPrimary: true,
        sections: [
          {
            title: 'Promoções',
            items: [
              { label: 'Últimas peças', href: '/produtos' },
              { label: 'Compre 2 leve 3', href: '/produtos' },
              { label: 'Outlet fitness', href: '/produtos' },
            ],
          },
          {
            title: 'Imperdíveis',
            items: [
              { label: 'Até 40% off', href: '/produtos' },
              { label: 'Descontos progressivos', href: '/produtos' },
              { label: 'Brindes especiais', href: '/produtos' },
            ],
          },
        ],
        feature: {
          title: 'Semana Sale Mar&Mov',
          description: 'Garanta suas peças favoritas com condições especiais.',
          href: '/produtos',
          image: '/images/bolsa-2.jpg',
        },
      },
      {
        label: 'Marcas',
        href: '/produtos',
        sections: brandColumns.map((column, index) => ({
          title: index === 0 ? 'Marcas em destaque' : 'Outras marcas',
          items: column.map((brand) => ({
            label: brand.label,
            href: `/marca/${brand.slug}`,
          })),
        })),
        feature: {
          title: 'Curadoria de marcas',
          description: 'Seleção de marcas que unem performance, conforto e estilo.',
          href: '/produtos',
          image: '/images/home-hero.png',
        },
      },
    ],
    [brandColumns],
  )

  const primaryNavItems = useMemo(() => navItems.filter((item) => item.isPrimary), [navItems])
  const activeItem = useMemo(() => navItems.find((item) => item.label === activeLink), [activeLink, navItems])
  const showMegaMenu = activeItem ? activeItem.sections.length > 0 : false

  const handleSoon = (label: string) => {
    showToast(`${label} em breve.`)
  }

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = searchTerm.trim()
    if (!trimmed) {
      showToast('Digite o que você procura.')
      return
    }
    showToast(`Busca por "${trimmed}" em breve.`)
    setSearchTerm('')
  }

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveLink(null)
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  const navItemBase =
    'rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-200'
  const navItemHome = 'text-white/90 hover:bg-white/15 hover:text-white'
  const navItemDefault = 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
  const navItemActive = isHome ? 'bg-white/15 text-white' : 'bg-stone-100 text-stone-900'
  const iconButtonClass = `relative flex h-8 w-8 items-center justify-center rounded-full transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua/40 ${
    isHome ? 'text-white/90 hover:bg-white/15 hover:text-white' : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
  }`
  const cartBadgeClass = isHome ? 'bg-white text-stone-900' : 'bg-brand-deep text-white'
  const megaMenuWrapperClass = isHome
    ? 'border-t border-white/10 bg-transparent text-white shadow-none'
    : 'border-t border-stone-200 bg-white/98 text-stone-700 shadow-[0_16px_32px_rgba(0,0,0,0.12)] backdrop-blur'
  const megaMenuTitleClass = isHome ? 'text-white/60' : 'text-stone-500'
  const megaMenuLinkClass = isHome ? 'text-white/80 hover:text-white' : 'text-stone-700 hover:text-brand-deep'
  const megaMenuFeatureClass = isHome ? 'border-white/20 bg-black/60' : 'border-stone-200 bg-stone-900'

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-[#0a1f3d] text-white">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-2 px-4 py-1">
          <form
            onSubmit={handleSearchSubmit}
            className="flex w-full max-w-[200px] items-center gap-2 rounded-full bg-white/12 px-3 py-0.5 text-[10px] shadow-inner transition focus-within:bg-white/20"
          >
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Digite sua busca"
              aria-label="Digite sua busca"
              className="w-full bg-transparent text-white placeholder:text-white/60 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Buscar"
              className="text-white/80 transition hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M11 19a8 8 0 1 1 5.292-14.01A8 8 0 0 1 11 19Zm7.5 1.5-4.2-4.2" />
              </svg>
            </button>
          </form>

        </div>
      </div>

      <div
        className={`border-b ${
          isHome ? 'border-white/10 bg-transparent text-white' : 'border-stone-200 bg-white/95 text-stone-800 shadow-sm'
        }`}
        onMouseLeave={() => setActiveLink(null)}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-2">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/images/logo.svg"
              alt="Logo Mar&Mov"
              className={`h-9 w-auto transition-opacity duration-300 ${
                logoError ? 'opacity-0' : isHome ? 'brightness-0 invert' : 'opacity-100'
              }`}
              onError={() => setLogoError(true)}
              loading="eager"
              decoding="async"
            />
            {logoError && (
              <span
                className={`font-display text-2xl font-black tracking-tight ${isHome ? 'text-white' : 'text-stone-900'}`}
              >
                Mar&Mov
              </span>
            )}
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-2 lg:flex">
            {primaryNavItems.map((item) => {
              const hasMenu = item.sections.length > 0
              const accentClasses = item.accent
                ? isHome
                  ? navItemHome
                  : 'text-rose-600 hover:bg-stone-100 hover:text-rose-700'
                : isHome
                  ? navItemHome
                  : navItemDefault

              return (
                <NavLink
                  key={item.label}
                  to={item.href}
                  end={item.href === '/'}
                  onMouseEnter={() => {
                    if (hasMenu) setActiveLink(item.label)
                  }}
                  onFocus={() => {
                    if (hasMenu) setActiveLink(item.label)
                  }}
                  onClick={() => setActiveLink(null)}
                  className={({ isActive }) =>
                    `${navItemBase} ${accentClasses} ${isActive ? navItemActive : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-4 lg:flex">
              <span className={`h-5 w-px ${isHome ? 'bg-white/30' : 'bg-stone-200'}`} aria-hidden="true" />
              <Link
                to="/produtos"
                className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${
                  isHome ? 'text-white/80 hover:text-white' : 'text-stone-600 hover:text-stone-800'
                }`}
              >
                Marcas
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Favoritos"
                onClick={() => handleSoon('Favoritos')}
                className={iconButtonClass}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M19 6.5c0-1.933-1.567-3.5-3.5-3.5-1.336 0-2.5.74-3.062 1.812C11.876 3.74 10.712 3 9.375 3 7.443 3 5.875 4.567 5.875 6.5c0 5.25 6.063 9.75 6.063 9.75S19 11.75 19 6.5Z" />
                </svg>
              </button>
              <button type="button" aria-label="Perfil" onClick={() => handleSoon('Perfil')} className={iconButtonClass}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="8.25" r="3.25" />
                  <path d="M5.75 19.5a6.25 6.25 0 1 1 12.5 0" />
                </svg>
              </button>
              <button type="button" aria-label="Carrinho" onClick={toggleCart} className={iconButtonClass}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M6.75 9.25h10.5l-.9 9.3a1.45 1.45 0 0 1-1.42 1.3H9.07a1.45 1.45 0 0 1-1.42-1.3Z" />
                  <path d="M9.25 9.25V7.4a2.75 2.75 0 0 1 5.5 0v1.85" />
                </svg>
                {totalItems > 0 && (
                  <span
                    className={`absolute -right-1 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full px-1 text-[10px] font-bold ${cartBadgeClass}`}
                  >
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen((prev) => !prev)
                setMobileOpenItem(null)
              }}
              aria-label="Menu"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              className={`relative flex h-9 w-9 items-center justify-center rounded-full border ${
                isHome ? 'border-white/40 text-white hover:bg-white/10' : 'border-stone-300 text-stone-700 hover:bg-stone-100'
              } transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua/40 lg:hidden`}
            >
              <span className="sr-only">Abrir menu</span>
              <span
                className={`absolute h-[2px] w-5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'translate-y-0 rotate-45' : '-translate-y-2'
                }`}
              />
              <span
                className={`absolute h-[2px] w-5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute h-[2px] w-5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'translate-y-0 -rotate-45' : 'translate-y-2'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {showMegaMenu && activeItem && (
        <div className={megaMenuWrapperClass}>
          <div className="mx-auto grid max-w-6xl gap-8 px-6 py-8 lg:grid-cols-[2fr_1fr]">
            <div
              className={`grid gap-6 ${
                activeItem.sections.length > 2 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'
              }`}
            >
              {activeItem.sections.map((section) => (
                <div key={section.title} className="space-y-3">
                  <p className={`text-xs font-semibold tracking-[0.12em] ${megaMenuTitleClass}`}>{section.title}</p>
                  <div className="space-y-2">
                    {section.items.map((subItem) => (
                      <Link
                        key={subItem.label}
                        to={subItem.href}
                        className={`block text-sm font-semibold transition ${megaMenuLinkClass}`}
                        onClick={() => setActiveLink(null)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {activeItem.feature && (
              <Link
                to={activeItem.feature.href}
                className={`group relative overflow-hidden rounded-3xl border ${megaMenuFeatureClass}`}
                onClick={() => setActiveLink(null)}
              >
                <img
                  src={activeItem.feature.image}
                  alt={activeItem.feature.title}
                  className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 space-y-2 px-5 py-5 text-white">
                  <p className="text-sm font-semibold">{activeItem.feature.title}</p>
                  <p className="text-xs text-white/80">{activeItem.feature.description}</p>
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                    Ver tudo
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </Link>
            )}
          </div>
        </div>
      )}

      {isMobileMenuOpen && (
        <div className="lg:hidden" id="mobile-menu">
          <div className="border-t border-stone-200 bg-white shadow-xl">
            <div className="space-y-4 px-6 py-5">
              {navItems.map((item) => {
                if (item.sections.length === 0) {
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="flex items-center justify-between rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm font-semibold text-stone-800"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className={item.accent ? 'text-rose-600' : ''}>{item.label}</span>
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  )
                }

                const isOpen = mobileOpenItem === item.label
                return (
                  <div key={item.label} className="rounded-2xl border border-stone-200 bg-white">
                    <button
                      type="button"
                      onClick={() => setMobileOpenItem(isOpen ? null : item.label)}
                      className="flex w-full items-center justify-between px-4 py-4 text-left text-sm font-semibold text-stone-800"
                      aria-expanded={isOpen}
                    >
                      <span className={item.accent ? 'text-rose-600' : ''}>{item.label}</span>
                      <span className="text-lg">{isOpen ? '-' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="space-y-4 px-4 pb-4">
                        {item.sections.map((section) => (
                          <div key={section.title} className="space-y-2">
                            <p className="text-xs font-semibold tracking-[0.12em] text-stone-500">
                              {section.title}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {section.items.map((subItem) => (
                                <Link
                                  key={subItem.label}
                                  to={subItem.href}
                                  className="badge badge-neutral transition hover:text-brand-deep"
                                  onClick={() => {
                                    setIsMobileMenuOpen(false)
                                    setMobileOpenItem(null)
                                  }}
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}

              <div className="rounded-xl bg-stone-50 px-3 py-3">
                <p className="text-xs font-semibold tracking-[0.08em] text-stone-600">Atalhos rápidos</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button type="button" onClick={() => handleSoon('Busca')} className="btn-secondary px-3 text-xs">
                    Buscar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSoon('Favoritos')}
                    className="btn-secondary px-3 text-xs"
                  >
                    Favoritos
                  </button>
                  <button type="button" onClick={() => handleSoon('Perfil')} className="btn-secondary px-3 text-xs">
                    Perfil
                  </button>
                  <button type="button" onClick={toggleCart} className="btn-secondary px-3 text-xs">
                    Carrinho
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default TopBar
