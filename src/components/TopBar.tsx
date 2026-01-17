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
  const [lockedLink, setLockedLink] = useState<string | null>(null)
  const [logoError, setLogoError] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mobileOpenItem, setMobileOpenItem] = useState<string | null>(null)
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
        label: 'Kids',
        href: '/produtos',
        isPrimary: true,
        sections: [],
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
  const currentActiveLink = lockedLink ?? activeLink
  const activeItem = useMemo(() => navItems.find((item) => item.label === currentActiveLink), [currentActiveLink, navItems])
  const showMegaMenu = activeItem ? activeItem.sections.length > 0 : false
  const isMenuOpen = Boolean(showMegaMenu && activeItem)

  const handleSoon = (label: string) => {
    showToast(`${label} em breve.`)
  }

  const handleMenuMouseLeave = () => {
    setActiveLink(null)
    setLockedLink(null)
  }

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveLink(null)
        setLockedLink(null)
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  const navItemBase =
    "relative rounded-full px-4 py-2 text-[14px] font-semibold uppercase tracking-[0.2em] transition-colors duration-200 after:absolute after:bottom-0 after:left-1/2 after:block after:h-[2px] after:w-0 after:content-[''] after:transition-[width,left] after:duration-300 after:ease-out hover:after:left-0 hover:after:w-full focus-visible:after:left-0 focus-visible:after:w-full"
  const navItemHome = isMenuOpen
    ? 'text-[#0a1f3d]/90 hover:text-[#0a1f3d] after:bg-[#0a1f3d]/70'
    : 'text-white/80 hover:text-white after:bg-white/70'
  const navItemDefault = isMenuOpen
    ? 'text-[#0a1f3d]/80 hover:text-[#0a1f3d] after:bg-[#0a1f3d]/60'
    : 'text-stone-700 hover:text-stone-900 after:bg-stone-400'
  const navItemActive = isMenuOpen
    ? 'text-[#0a1f3d] after:left-0 after:w-full'
    : isHome
      ? 'text-white after:left-0 after:w-full'
      : 'text-stone-900 after:left-0 after:w-full'
  const iconButtonClass = `relative flex h-10 w-10 items-center justify-center rounded-full transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua/40 ${
    isMenuOpen
      ? 'text-[#0a1f3d] hover:bg-[#0a1f3d]/10 hover:text-[#0a1f3d]'
      : isHome
        ? 'text-white/90 hover:bg-white/15 hover:text-white'
        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
  }`
  const cartBadgeClass = isHome && !isMenuOpen ? 'bg-white text-stone-900' : 'bg-brand-deep text-white'
  const megaMenuWrapperClass =
    'absolute left-0 right-0 top-full border-t border-stone-200 bg-white text-[#0a1f3d] shadow-[0_16px_32px_rgba(0,0,0,0.12)]'
  const megaMenuTitleClass = 'text-[#0a1f3d]/60'
  const megaMenuLinkClass = 'rounded-lg px-2 py-1 text-[#0a1f3d]/90 hover:bg-[#0a1f3d]/5 hover:text-[#0a1f3d]'
  const headerClassName = isHome ? 'absolute inset-x-0 top-0 z-50' : 'relative z-50'
  const mainBarClass = isMenuOpen
    ? 'border-stone-200 bg-white text-[#0a1f3d] shadow-sm'
    : isHome
      ? 'border-white/10 bg-transparent text-white'
      : 'border-stone-200 bg-white/95 text-stone-800 shadow-sm'
  const logoTextClass = isMenuOpen ? 'text-[#0a1f3d]' : isHome ? 'text-white' : 'text-stone-900'
  const separatorClass = isMenuOpen ? 'bg-[#0a1f3d]/15' : isHome ? 'bg-white/30' : 'bg-stone-200'

  return (
    <header className={headerClassName}>
      <div onMouseLeave={handleMenuMouseLeave}>
        <div className={`border-b ${mainBarClass}`}>
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-5 px-5 py-2.5">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/images/logo.svg"
                alt="Logo Mar&Mov"
                className={`h-[3.25rem] w-auto transition-opacity duration-300 ${
                  logoError ? 'opacity-0' : isHome && !isMenuOpen ? 'brightness-0 invert' : 'opacity-100'
                }`}
                onError={() => setLogoError(true)}
                loading="eager"
                decoding="async"
              />
              {logoError && (
                <span className={`font-display text-2xl font-black tracking-tight ${logoTextClass}`}>
                  Mar&Mov
                </span>
              )}
            </Link>

            <nav className="hidden flex-1 items-center justify-center gap-3 lg:flex">
              {primaryNavItems.map((item) => {
                const hasMenu = item.sections.length > 0
                const accentClasses = item.accent
                  ? isMenuOpen
                    ? 'text-[#0a1f3d] hover:text-[#0a1f3d] after:bg-[#0a1f3d]/70'
                    : isHome
                      ? 'text-rose-200 hover:text-rose-100 after:bg-rose-200'
                      : 'text-rose-600 hover:text-rose-700 after:bg-rose-400'
                  : isHome
                    ? navItemHome
                    : navItemDefault

                return (
                  <NavLink
                    key={item.label}
                    to={item.href}
                    end={item.href === '/'}
                    onMouseEnter={() => {
                      if (hasMenu && !lockedLink) setActiveLink(item.label)
                    }}
                    onFocus={() => {
                      if (hasMenu && !lockedLink) setActiveLink(item.label)
                    }}
                    onClick={(event) => {
                      if (hasMenu) {
                        event.preventDefault()
                        if (lockedLink === item.label) {
                          setLockedLink(null)
                          setActiveLink(null)
                          return
                        }
                        setLockedLink(item.label)
                        setActiveLink(item.label)
                        return
                      }
                      setLockedLink(null)
                      setActiveLink(null)
                    }}
                    className={({ isActive }) =>
                      `${navItemBase} ${accentClasses} ${isActive ? navItemActive : ''}`
                    }
                  >
                    {item.label}
                  </NavLink>
                )
              })}
            </nav>

            <div className="flex items-center gap-4">
              <div className="hidden items-center gap-4 lg:flex">
                <span className={`h-6 w-px ${separatorClass}`} aria-hidden="true" />
              </div>

              <div className="flex items-center gap-[0.6rem]">
                <button
                  type="button"
                  aria-label="Favoritos"
                  onClick={() => handleSoon('Favoritos')}
                  className={iconButtonClass}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
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
                    className="h-6 w-6"
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
                    className="h-7 w-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9.5h12l-1 10.5a1.5 1.5 0 0 1-1.5 1.3H8.5a1.5 1.5 0 0 1-1.5-1.3L6 9.5Z" />
                    <path d="M9 9c0-3.5 6-3.5 6 0" />
                    <circle cx="9" cy="9" r="0.75" fill="currentColor" stroke="none" />
                    <circle cx="15" cy="9" r="0.75" fill="currentColor" stroke="none" />
                  </svg>
                  {totalItems > 0 && (
                    <span
                      className={`absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1 text-[11px] font-bold ${cartBadgeClass}`}
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
                className={`relative flex h-12 w-12 items-center justify-center rounded-full border ${
                  isHome
                    ? isMenuOpen
                      ? 'border-stone-300 text-[#0a1f3d] hover:bg-[#0a1f3d]/10'
                      : 'border-white/40 text-white hover:bg-white/10'
                    : 'border-stone-300 text-stone-700 hover:bg-stone-100'
                } transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua/40 lg:hidden`}
              >
                <span className="sr-only">Abrir menu</span>
                <span
                  className={`absolute h-[2px] w-6 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'translate-y-0 rotate-45' : '-translate-y-2.5'
                  }`}
                />
                <span
                  className={`absolute h-[2px] w-6 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute h-[2px] w-6 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'translate-y-0 -rotate-45' : 'translate-y-2.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {showMegaMenu && activeItem && (
          <div className={megaMenuWrapperClass} onMouseLeave={handleMenuMouseLeave}>
            <div className="mx-auto grid max-w-3xl gap-4 px-4 py-3">
              <div
                className={`grid gap-3 ${
                  activeItem.sections.length > 2 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'
                }`}
              >
                {activeItem.sections.map((section) => (
                  <div key={section.title} className="space-y-2">
                    <p className={`text-xs font-semibold tracking-[0.12em] ${megaMenuTitleClass}`}>{section.title}</p>
                    <div className="space-y-1.5">
                      {section.items.map((subItem) => (
                        <Link
                          key={subItem.label}
                          to={subItem.href}
                          className={`block text-[13px] font-semibold transition ${megaMenuLinkClass}`}
                          onClick={() => {
                            setActiveLink(null)
                            setLockedLink(null)
                          }}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

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
