import React, { useState } from 'react'

const navLinks = [
  { label: 'Novidades', href: '#novidades' }, // Troque href para rota real (ex: /novidades)
  { label: 'Moda Praia', href: '#praia' },
  { label: 'Moda Íntima', href: '#intima' },
  { label: 'Marcas', href: '#marcas' },
  { label: 'Promoções', href: '#promocoes' },
]

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-brand-aqua/15 bg-white/90 backdrop-blur-lg shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex flex-col leading-tight">
            <span className="font-display text-2xl font-extrabold tracking-tight text-brand-deep">Mar&Mov</span>
            <span className="text-xs uppercase tracking-[0.18em] text-ink/60">Sua moda em movimento</span>
          </div>
        </div>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-semibold text-ink/80 transition hover:text-brand-deep"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            aria-label="Buscar produtos"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-aqua/30 text-ink/70 transition hover:border-brand-deep hover:text-brand-deep"
          >
            🔍
          </button>
          <button
            aria-label="Conta do usuário"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-aqua/30 text-ink/70 transition hover:border-brand-deep hover:text-brand-deep"
          >
            👤
          </button>
          <button
            aria-label="Carrinho"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-brand-aqua/30 text-ink/70 transition hover:border-brand-deep hover:text-brand-deep"
          >
            🛒
            {/* Troque o valor abaixo pelo contador real do carrinho quando conectar ao backend */}
            <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand-deep px-1 text-[10px] font-bold text-white">
              2
            </span>
          </button>
        </div>

        <button
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Abrir menu"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-aqua/40 text-ink/80 transition hover:border-brand-deep hover:text-brand-deep lg:hidden"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <div className="lg:hidden">
          <div className="border-t border-brand-aqua/20 bg-white shadow-md">
            <div className="space-y-3 px-4 py-4">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block rounded-xl border border-brand-aqua/20 px-4 py-3 text-sm font-semibold text-ink/80 transition hover:border-brand-deep hover:text-brand-deep"
                >
                  {item.label}
                </a>
              ))}
              <div className="flex items-center gap-3 pt-2">
                <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-brand-aqua/30 px-4 py-3 font-semibold text-ink/80 transition hover:border-brand-deep hover:text-brand-deep">
                  🔍 <span>Buscar</span>
                </button>
                <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-brand-aqua/30 px-4 py-3 font-semibold text-ink/80 transition hover:border-brand-deep hover:text-brand-deep">
                  👤 <span>Conta</span>
                </button>
                <button className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-brand-aqua/30 text-ink/80 transition hover:border-brand-deep hover:text-brand-deep">
                  🛒
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
