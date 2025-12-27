import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'Novidades', href: '/produtos' },
  { label: 'Moda Praia', href: '/categoria/biquinis' },
  { label: 'Moda Íntima', href: '/categoria/maios' },
  { label: 'Marcas', href: '/marca/mar-mov' },
  { label: 'Promoções', href: '/produtos' },
]

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-brand-aqua/15 bg-white/90 backdrop-blur-lg shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex flex-col leading-tight">
            <span className="font-display text-2xl font-extrabold tracking-tight text-brand-deep">Mar&Mov</span>
            <span className="text-xs uppercase tracking-[0.18em] text-ink/60">Sua moda em movimento</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-sm font-semibold text-ink/80 transition hover:text-brand-deep"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            aria-label="Buscar produtos"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-aqua/30 text-ink/70 transition hover:border-brand-deep hover:text-brand-deep"
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
              <path d="M20 20l-3.5-3.5" />
            </svg>
          </button>
          <button
            aria-label="Conta do usuário"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-aqua/30 text-ink/70 transition hover:border-brand-deep hover:text-brand-deep"
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
            aria-label="Carrinho"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-brand-aqua/30 text-ink/70 transition hover:border-brand-deep hover:text-brand-deep"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M6.75 9.25h10.5l-.9 9.3a1.45 1.45 0 0 1-1.42 1.3H9.07a1.45 1.45 0 0 1-1.42-1.3Z" />
              <path d="M9.25 9.25V7.4a2.75 2.75 0 0 1 5.5 0v1.85" />
              <path d="M9.5 11.5h5" />
            </svg>
            <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand-deep px-1 text-[10px] font-bold text-white">
              2
            </span>
          </button>
        </div>

        <button
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Abrir menu"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-aqua/40 text-sm font-semibold uppercase text-ink/80 transition hover:border-brand-deep hover:text-brand-deep lg:hidden"
        >
          {open ? 'Fechar' : 'Menu'}
        </button>
      </div>

      {open && (
        <div className="lg:hidden">
          <div className="border-t border-brand-aqua/20 bg-white shadow-md">
            <div className="space-y-3 px-4 py-4">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="block rounded-xl border border-brand-aqua/20 px-4 py-3 text-sm font-semibold text-ink/80 transition hover:border-brand-deep hover:text-brand-deep"
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center gap-3 pt-2">
                <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-brand-aqua/30 px-4 py-3 font-semibold text-ink/80 transition hover:border-brand-deep hover:text-brand-deep">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <circle cx="11" cy="11" r="6" />
                    <path d="M20 20l-3.5-3.5" />
                  </svg>
                  <span>Buscar</span>
                </button>
                <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-brand-aqua/30 px-4 py-3 font-semibold text-ink/80 transition hover:border-brand-deep hover:text-brand-deep">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <circle cx="12" cy="8.25" r="3.25" />
                    <path d="M5.75 19.5a6.25 6.25 0 1 1 12.5 0" />
                  </svg>
                  <span>Conta</span>
                </button>
                <button className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-brand-aqua/30 text-ink/80 transition hover:border-brand-deep hover:text-brand-deep">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <path d="M6.75 9.25h10.5l-.9 9.3a1.45 1.45 0 0 1-1.42 1.3H9.07a1.45 1.45 0 0 1-1.42-1.3Z" />
                    <path d="M9.25 9.25V7.4a2.75 2.75 0 0 1 5.5 0v1.85" />
                    <path d="M9.5 11.5h5" />
                  </svg>
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand-deep px-1 text-[10px] font-bold text-white">
                    2
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
