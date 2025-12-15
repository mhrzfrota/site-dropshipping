import React, { useEffect, useMemo, useState } from 'react'

type NavLink = {
  label: string
  href: string
  accent?: boolean
  items?: string[]
}

const navLinks: NavLink[] = [
  { label: 'Vitrine', href: '#vitrine', items: ['Coleções', 'Revista'] },
  { label: 'Lançamentos', href: '#novidades', items: ['Alto Verão', 'Edição cápsula', 'Novos tecidos'] },
  { label: 'Biquínis', href: '#novidades', items: ['Cortininha', 'Meia-taça', 'Hot pants', 'Top faixa'] },
  { label: 'Maiôs', href: '#novidades', items: ['Clássicos', 'Recortes', 'Tomara que caia'] },
  { label: 'Roupas', href: '#novidades', items: ['Vestidos', 'Bodies', 'Saídas de praia'] },
  { label: 'Acessórios', href: '#novidades', items: ['Bolsas', 'Chapéus', 'Óculos'] },
  { label: 'Sale', href: '#novidades', accent: true, items: ['Últimas peças', 'Compre 2 leve 3'] },
]

const TopBar: React.FC = () => {
  const [activeLink, setActiveLink] = useState<string | null>(null)
  const [logoError, setLogoError] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const activeItem = useMemo(() => navLinks.find((item) => item.label === activeLink), [activeLink])

  const baseTextColor = 'text-stone-700'
  const iconTone = 'text-stone-700 hover:text-brand-deep'

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
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-1.5">
        <div className="flex items-center gap-3">
          <img
            src="/images/logo.svg"
            alt="Logo do site"
            className={`h-20 w-auto transition-opacity duration-300 ${logoError ? 'opacity-0' : 'opacity-100'}`}
            onError={() => setLogoError(true)}
          />
          {logoError && (
            <span className={`font-display text-4xl font-black tracking-tight ${baseTextColor}`}>
              Marca &amp; Mov
            </span>
          )}
        </div>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setActiveLink((prev) => (prev === item.label ? null : item.label))}
              className={`relative pb-2 text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors duration-200 ${
                item.accent ? 'text-brand-ocean hover:text-brand-deep' : `${baseTextColor} hover:text-brand-deep`
              }`}
            >
              {item.label}
              <span
                className={`absolute left-0 right-0 -bottom-1 h-[2px] origin-left transform bg-current transition-transform duration-300 ${
                  activeLink === item.label ? 'scale-x-100' : 'scale-x-0 hover:scale-x-100'
                }`}
                aria-hidden="true"
              />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Buscar"
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
              <circle cx="11" cy="11" r="6" />
              <path d="m15.5 15.5 3 3" />
            </svg>
          </button>
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
            className={`flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-stone-100 ${iconTone}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M7.2 8.5h9.6l-.9 10a1.5 1.5 0 0 1-1.49 1.35H9.59A1.5 1.5 0 0 1 8.1 18.5Z" />
              <path d="M9 8V6.5a3 3 0 1 1 6 0V8" />
              <path d="M10 12h4" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Menu"
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
                  <a
                    key={subItem}
                    href={activeItem.href}
                    className="block text-base font-semibold text-stone-700 transition hover:text-brand-deep"
                  >
                    {subItem}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-stone-500">
                Destaques em <span className="font-semibold text-stone-800">{activeItem.label}</span>
              </p>
              <a
                href={activeItem.href}
                className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-brand-deep hover:text-brand-deep"
              >
                Ver todos em {activeItem.label}
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="border-t border-stone-200 bg-white shadow-xl">
            <div className="space-y-1 px-6 py-4">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`block rounded-lg px-3 py-3 text-sm font-semibold transition ${
                    item.accent
                      ? 'text-brand-ocean hover:bg-brand-ocean/10'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
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
