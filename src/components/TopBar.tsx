import React, { useEffect, useMemo, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

type NavSubItem = {
  label: string
  href: string
}

type NavLinkItem = {
  label: string
  href: string
  accent?: boolean
  items?: NavSubItem[]
}

const navLinks: NavLinkItem[] = [
  {
    label: 'Vitrine',
    href: '/',
    items: [
      { label: 'Coleções', href: '/produtos' },
      { label: 'Revista', href: '/produtos' },
    ],
  },
  {
    label: 'Lançamentos',
    href: '/produtos',
    items: [
      { label: 'Alto Verão', href: '/categoria/biquinis' },
      { label: 'Edição cápsula', href: '/categoria/roupas' },
      { label: 'Novos tecidos', href: '/categoria/maios' },
    ],
  },
  {
    label: 'Biquínis',
    href: '/categoria/biquinis',
    items: [
      { label: 'Cortininha', href: '/categoria/biquinis' },
      { label: 'Meia-taça', href: '/categoria/biquinis' },
      { label: 'Hot pants', href: '/categoria/biquinis' },
      { label: 'Top faixa', href: '/categoria/biquinis' },
    ],
  },
  {
    label: 'Maiôs',
    href: '/categoria/maios',
    items: [
      { label: 'Clássicos', href: '/categoria/maios' },
      { label: 'Recortes', href: '/categoria/maios' },
      { label: 'Tomara que caia', href: '/categoria/maios' },
    ],
  },
  {
    label: 'Roupas',
    href: '/categoria/roupas',
    items: [
      { label: 'Vestidos', href: '/categoria/roupas' },
      { label: 'Bodies', href: '/categoria/roupas' },
      { label: 'Saídas de praia', href: '/categoria/roupas' },
    ],
  },
  {
    label: 'Acessórios',
    href: '/categoria/acessorios',
    items: [
      { label: 'Bolsas', href: '/categoria/acessorios' },
      { label: 'Chapéus', href: '/categoria/acessorios' },
      { label: 'Óculos', href: '/categoria/acessorios' },
    ],
  },
  {
    label: 'Sale',
    href: '/produtos',
    accent: true,
    items: [
      { label: 'Últimas peças', href: '/produtos' },
      { label: 'Compre 2 leve 3', href: '/produtos' },
    ],
  },
]

const TopBar: React.FC = () => {
  const [activeLink, setActiveLink] = useState<string | null>(null)
  const [logoError, setLogoError] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { totalItems, toggleCart } = useCart()

  const activeItem = useMemo(() => navLinks.find((item) => item.label === activeLink), [activeLink])

  const baseTextColor = 'text-stone-700'
  const iconTone = 'text-stone-700 hover:text-brand-deep'
  const mobileMenuId = 'mobile-menu'

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

  return (
    <header
      className="group fixed inset-x-0 top-0 z-50 border-b border-stone-200 bg-white text-stone-700 shadow-md"
      onMouseLeave={() => {
        setActiveLink(null)
      }}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-2 py-1.5 md:gap-6 md:px-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/images/logo.svg"
            alt="Logo do site"
            className={`h-11 w-auto transition-opacity duration-300 ${logoError ? 'opacity-0' : 'opacity-100'}`}
            onError={() => setLogoError(true)}
          />
          {logoError && (
            <span className={`font-display text-4xl font-black tracking-tight ${baseTextColor}`}>
              Mar&Mov
            </span>
          )}
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-4 md:flex">
          {navLinks.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              end={item.href === '/'}
              onMouseEnter={() => setActiveLink(item.label)}
              onFocus={() => setActiveLink(item.label)}
              onClick={() => setActiveLink(null)}
              className={({ isActive }) =>
                `relative pb-2 text-[12px] leading-[1.2] font-semibold tracking-[0.01em] transition-colors duration-200 ${
                  item.accent
                    ? 'text-brand-ocean hover:text-brand-deep'
                    : `${baseTextColor} hover:text-brand-deep ${isActive ? 'text-brand-deep' : ''}`
                }`
              }
            >
              {item.label}
              <span
                className={`absolute left-0 right-0 -bottom-1 h-[2px] origin-left transform bg-current transition-transform duration-300 ${
                  activeLink === item.label ? 'scale-x-100' : 'scale-x-0 hover:scale-x-100'
                }`}
                aria-hidden="true"
              />
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            aria-label="Lista de desejos"
            className={`flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-stone-100 ${iconTone}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M19 6.5c0-1.933-1.567-3.5-3.5-3.5-1.336 0-2.5.74-3.062 1.812C11.876 3.74 10.712 3 9.375 3 7.443 3 5.875 4.567 5.875 6.5c0 5.25 6.063 9.75 6.063 9.75S19 11.75 19 6.5Z" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Perfil"
            className={`flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-stone-100 ${iconTone}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <circle cx="12" cy="8.25" r="3.25" />
              <path d="M5.75 19.5a6.25 6.25 0 1 1 12.5 0" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Carrinho"
            onClick={toggleCart}
            className={`relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-stone-100 ${iconTone}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M6.75 9.25h10.5l-.9 9.3a1.45 1.45 0 0 1-1.42 1.3H9.07a1.45 1.45 0 0 1-1.42-1.3Z" />
              <path d="M9.25 9.25V7.4a2.75 2.75 0 0 1 5.5 0v1.85" />
              <path d="M9.5 11.5h5" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand-deep px-1 text-[10px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Menu"
            aria-controls={mobileMenuId}
            aria-expanded={isMobileMenuOpen}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 text-sm font-semibold uppercase text-stone-700 transition hover:bg-stone-100 md:hidden"
          >
            {isMobileMenuOpen ? 'Fechar' : 'Menu'}
          </button>
        </div>
      </div>

      {activeItem && activeItem.items && (
        <div className="border-t border-stone-200 bg-white/98 text-stone-700 shadow-[0_16px_32px_rgba(0,0,0,0.12)] backdrop-blur">
          <div className="mx-auto flex max-w-6xl flex-wrap gap-10 px-6 py-6">
            <div className="min-w-[12rem] space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-stone-500">{activeItem.label}</p>
              <div className="space-y-2">
                {activeItem.items.map((subItem) => (
                  <Link
                    key={subItem.label}
                    to={subItem.href}
                    className="block text-base font-semibold text-stone-700 transition hover:text-brand-deep"
                    onClick={() => setActiveLink(null)}
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-stone-500">
                Destaques em <span className="font-semibold text-stone-800">{activeItem.label}</span>
              </p>
              <Link
                to={activeItem.href}
                className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-brand-deep hover:text-brand-deep"
                onClick={() => setActiveLink(null)}
              >
                Ver todos em {activeItem.label}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {isMobileMenuOpen && (
        <div className="md:hidden" id={mobileMenuId}>
          <div className="border-t border-stone-200 bg-white shadow-xl">
            <div className="space-y-1 px-6 py-4">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`block rounded-lg px-3 py-3 text-sm font-semibold transition ${
                    item.accent
                      ? 'text-brand-ocean hover:bg-brand-ocean/10'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-3 flex items-center gap-3 rounded-xl bg-stone-50 px-3 py-3">
                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-stone-500">Atalhos</span>
                <div className="flex flex-1 items-center justify-end gap-3 text-stone-700">
                  <span>Buscar</span>
                  <span>Favoritos</span>
                  <span>Perfil</span>
                  <span>Carrinho</span>
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
