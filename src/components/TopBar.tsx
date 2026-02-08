import React, { useEffect, useMemo, useRef, useState } from 'react'
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

type NavItem = {
  label: string
  href: string
  accent?: boolean
  hasDropdown?: boolean
  sections: NavSection[]
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
  const headerRef = useRef<HTMLElement | null>(null)
  const [activeLink, setActiveLink] = useState<string | null>(null)
  const [lockedLink, setLockedLink] = useState<string | null>(null)
  const [logoError, setLogoError] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mobileOpenItem, setMobileOpenItem] = useState<string | null>(null)
  const [isTopBarSolid, setIsTopBarSolid] = useState(location.pathname !== '/')
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
        label: 'SALE',
        href: '/sale',
        accent: true,
        sections: [],
      },
      {
        label: 'MARCAS',
        href: '/produtos',
        hasDropdown: true,
        sections: brandColumns.map((column, index) => ({
          title: index === 0 ? 'Marcas em destaque' : 'Outras marcas',
          items: column.map((brand) => ({
            label: brand.label,
            href: `/marca/${brand.slug}`,
          })),
        })),
      },
      {
        label: 'NOVIDADES',
        href: '/produtos',
        sections: [],
      },
      {
        label: 'MAIS VENDIDOS',
        href: '/produtos',
        sections: [],
      },
    ],
    [brandColumns],
  )

  const currentActiveLink = lockedLink ?? activeLink
  const activeItem = useMemo(() => navItems.find((item) => item.label === currentActiveLink), [currentActiveLink, navItems])
  const showMegaMenu = activeItem ? activeItem.sections.length > 0 : false

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

  useEffect(() => {
    if (location.pathname !== '/') {
      setIsTopBarSolid(true)
      return
    }

    const updateTopBarState = () => {
      const firstSection = document.querySelector('main section') as HTMLElement | null
      if (!firstSection) {
        setIsTopBarSolid(false)
        return
      }

      const headerHeight = headerRef.current?.offsetHeight ?? 0
      const firstSectionBottom = firstSection.offsetTop + firstSection.offsetHeight
      setIsTopBarSolid(window.scrollY + headerHeight >= firstSectionBottom)
    }

    updateTopBarState()
    window.addEventListener('scroll', updateTopBarState, { passive: true })
    window.addEventListener('resize', updateTopBarState)

    return () => {
      window.removeEventListener('scroll', updateTopBarState)
      window.removeEventListener('resize', updateTopBarState)
    }
  }, [location.pathname])

  const navItemBase = 'text-[14px] font-semibold tracking-[0.08em] text-white transition-colors duration-300'
  const navItemDefault = 'text-white/90 hover:text-white'
  const navItemAccent =
    'rounded-full border border-white/75 px-5 py-2 text-[14px] text-white transition-colors duration-300 hover:bg-white/20 hover:text-white'
  const iconButtonClass = 'relative flex items-center justify-center text-inherit opacity-90 transition duration-300 hover:opacity-100'

  return (
    <header
      ref={headerRef}
      className={`group/topbar fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isTopBarSolid
          ? 'bg-[#477e8a] text-white'
          : 'bg-transparent text-white hover:bg-[#477e8a] hover:text-white'
      }`}
    >
      <div onMouseLeave={handleMenuMouseLeave}>
        <div className="relative flex w-full items-center justify-between px-[22px] py-[13.5px] sm:px-[24px] sm:py-[17px]">
          {/* Left: Navigation */}
          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => {
              const hasMenu = item.sections.length > 0

              if (item.accent) {
                return (
                  <NavLink
                    key={item.label}
                    to={item.href}
                    className={navItemAccent}
                  >
                    {item.label}
                  </NavLink>
                )
              }

              return (
                <div key={item.label} className="relative flex items-center">
                  <NavLink
                    to={item.href}
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
                    className={`${navItemBase} ${navItemDefault} flex items-center gap-1`}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`h-4 w-4 transition-transform ${currentActiveLink === item.label ? 'rotate-180' : ''}`}
                      >
                        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                      </svg>
                    )}
                  </NavLink>
                </div>
              )
            })}
          </nav>

          {/* Center: Logo */}
          <Link to="/" className="flex items-center gap-2 lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
            <img
              src="/images/logo.svg"
              alt="Logo Mar&Mov"
              className={`h-[27px] w-auto brightness-0 invert transition duration-300 sm:h-[31px] ${
                logoError ? 'hidden' : ''
              }`}
              onError={() => setLogoError(true)}
              loading="eager"
              decoding="async"
            />
            {logoError && (
              <span className="font-display text-2xl font-black tracking-tight text-inherit">
                Mar&Mov
              </span>
            )}
          </Link>

          {/* Right: Icons */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Search */}
            <button
              type="button"
              aria-label="Buscar"
              onClick={() => handleSoon('Busca')}
              className={`${iconButtonClass} hidden sm:flex`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-[22px] w-[22px]"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.35-4.35" strokeLinecap="round" />
              </svg>
            </button>

            {/* User */}
            <button
              type="button"
              aria-label="Conta"
              onClick={() => handleSoon('Perfil')}
              className={`${iconButtonClass} hidden sm:flex`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-[22px] w-[22px]"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" strokeLinecap="round" />
              </svg>
            </button>

            {/* Cart */}
            <button
              type="button"
              aria-label="Carrinho"
              onClick={toggleCart}
              className={`${iconButtonClass} relative`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-[22px] w-[22px]"
              >
                <path d="M6 6h15l-1.5 9h-12z" strokeLinejoin="round" />
                <path d="M6 6 5.25 3H3" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="9" cy="20" r="1" fill="currentColor" />
                <circle cx="18" cy="20" r="1" fill="currentColor" />
              </svg>
              {totalItems > 0 && (
                <span
                  className={`absolute -right-2 -top-2 flex h-4 min-w-[1rem] items-center justify-center rounded-full px-1 text-[10px] font-semibold transition-colors duration-300 ${
                    isTopBarSolid
                      ? 'bg-white text-[#477e8a]'
                      : 'bg-[#477e8a] text-white group-hover/topbar:bg-white group-hover/topbar:text-[#477e8a]'
                  }`}
                >
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen((prev) => !prev)
                setMobileOpenItem(null)
              }}
              aria-label="Menu"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              className="relative flex h-9 w-9 items-center justify-center text-inherit lg:hidden"
            >
              <span className="sr-only">Abrir menu</span>
              <span
                className={`absolute h-[1.5px] w-5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'translate-y-0 rotate-45' : '-translate-y-1.5'
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'translate-y-0 -rotate-45' : 'translate-y-1.5'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mega Menu */}
        {showMegaMenu && activeItem && (
          <div
            className={`absolute left-0 right-0 top-full shadow-lg transition-colors duration-300 ${
              isTopBarSolid
                ? 'border-t border-[#477e8a]/40 bg-[#477e8a]'
                : 'border-t border-[#477e8a]/30 bg-[#f3ede4] group-hover/topbar:bg-[#477e8a]'
            }`}
            onMouseLeave={handleMenuMouseLeave}
          >
            <div className="mx-auto grid max-w-3xl gap-4 px-4 py-6">
              <div
                className={`grid gap-6 ${
                  activeItem.sections.length > 2 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'
                }`}
              >
                {activeItem.sections.map((section) => (
                  <div key={section.title} className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-inherit opacity-70">{section.title}</p>
                    <div className="space-y-2">
                      {section.items.map((subItem) => (
                        <Link
                          key={subItem.label}
                          to={subItem.href}
                          className="block text-sm text-inherit opacity-85 transition hover:opacity-100"
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden" id="mobile-menu">
          <div
            className={`shadow-xl transition-colors duration-300 ${
              isTopBarSolid
                ? 'border-t border-[#477e8a]/40 bg-[#477e8a]'
                : 'border-t border-[#477e8a]/30 bg-[#f3ede4] group-hover/topbar:bg-[#477e8a]'
            }`}
          >
            <div className="space-y-4 px-6 py-5">
              {navItems.map((item) => {
                if (item.sections.length === 0) {
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      className={`flex items-center justify-between py-3 text-sm font-semibold ${
                        item.accent ? 'text-inherit' : 'text-inherit opacity-90'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>{item.label}</span>
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  )
                }

                const isOpen = mobileOpenItem === item.label
                return (
                  <div key={item.label} className="border-b border-[#477e8a]/20 pb-3">
                    <button
                      type="button"
                      onClick={() => setMobileOpenItem(isOpen ? null : item.label)}
                      className="flex w-full items-center justify-between py-3 text-left text-sm font-semibold text-inherit opacity-90"
                      aria-expanded={isOpen}
                    >
                      <span>{item.label}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      >
                        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="space-y-4 pb-2 pt-2">
                        {item.sections.map((section) => (
                          <div key={section.title} className="space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-inherit opacity-70">
                              {section.title}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {section.items.map((subItem) => (
                                <Link
                                  key={subItem.label}
                                  to={subItem.href}
                                  className="text-sm text-inherit opacity-85 transition hover:opacity-100"
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

              <div className="flex items-center gap-4 pt-2">
                <button type="button" onClick={() => handleSoon('Busca')} className="flex-1 rounded-full border border-current/35 py-3 text-sm font-semibold text-inherit opacity-90 transition hover:bg-white/20 hover:opacity-100">
                  Buscar
                </button>
                <button type="button" onClick={() => handleSoon('Perfil')} className="flex-1 rounded-full border border-current/35 py-3 text-sm font-semibold text-inherit opacity-90 transition hover:bg-white/20 hover:opacity-100">
                  Conta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default TopBar
