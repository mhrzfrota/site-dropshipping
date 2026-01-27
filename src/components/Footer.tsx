import React from 'react'
import { Link } from 'react-router-dom'

const helpLinks = [
  { label: 'Acompanhe seu pedido', href: '/produtos' },
  { label: 'Solicite sua devolução', href: '/produtos' },
  { label: 'Política de trocas e devoluções', href: '/produtos' },
  { label: 'Retire na loja', href: '/produtos' },
  { label: 'Compre pelo WhatsApp', href: '/produtos' },
  { label: 'Central de ajuda', href: '/produtos' },
]

const aboutLinks = [
  { label: 'Quem somos', href: '/produtos' },
  { label: 'Política e segurança', href: '/produtos' },
  { label: 'Encontre sua loja', href: '/produtos' },
  { label: 'Trabalhe conosco', href: '/produtos' },
  { label: 'Franquias', href: '/produtos' },
  { label: 'Investidores', href: '/produtos' },
  { label: 'Mapa do site', href: '/produtos' },
]

const storeLinks = ['Mar&Mov Recife', 'Mar&Mov Verão']

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-[#0a1f3d]">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.85fr_0.85fr_0.85fr]">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-stone-500">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M4 6h16v12H4z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-400">Fique por dentro</p>
                <p className="text-lg font-semibold text-stone-900">Novidades Mar&Mov</p>
              </div>
            </div>
            <p className="text-sm text-stone-500">
              Cadastre-se e acompanhe todas as nossas novidades e ofertas.
            </p>
            <form className="flex items-center gap-4 border-b border-stone-200 pb-2">
              <input
                type="email"
                placeholder="Insira seu e-mail"
                className="flex-1 bg-transparent text-sm text-[#0a1f3d] placeholder:text-stone-400 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Enviar e-mail"
                className="text-xl text-stone-500 transition hover:text-[#0a1f3d]"
              >
                &rarr;
              </button>
            </form>
            <p className="text-xs text-stone-500">
              A Mar&Mov utiliza os dados preenchidos para enviar novidades e promoções exclusivas. Para saber mais,
              consulte nossa{' '}
              <Link to="/produtos" className="underline">
                Política de Segurança e Privacidade
              </Link>
              .
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold text-stone-900">Ajuda</p>
            <div className="space-y-2 text-sm text-stone-600">
              {helpLinks.map((link) => (
                <Link key={link.label} to={link.href} className="block transition hover:text-[#0a1f3d]">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold text-stone-900">Sobre a Mar&Mov</p>
            <div className="space-y-2 text-sm text-stone-600">
              {aboutLinks.map((link) => (
                <Link key={link.label} to={link.href} className="block transition hover:text-[#0a1f3d]">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-stone-900">Encontre uma loja</p>
              <div className="space-y-2 text-sm text-stone-600">
                {storeLinks.map((label) => (
                  <span key={label} className="block font-semibold text-[#0a1f3d]">
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-stone-900">Formas de pagamento</p>
              <div className="flex flex-wrap items-center gap-3">
                <span aria-label="Visa" className="flex h-7 items-center justify-center rounded border border-stone-200 px-2">
                  <svg viewBox="0 0 48 20" className="h-4 w-auto" aria-hidden="true">
                    <text x="2" y="15" fontSize="14" fontFamily="Arial" fontWeight="700" fill="#1a2b8b">
                      VISA
                    </text>
                  </svg>
                </span>
                <span aria-label="Mastercard" className="flex h-7 items-center justify-center rounded border border-stone-200 px-2">
                  <svg viewBox="0 0 36 20" className="h-4 w-auto" aria-hidden="true">
                    <circle cx="14" cy="10" r="7" fill="#ea001b" />
                    <circle cx="22" cy="10" r="7" fill="#f79e1b" fillOpacity="0.9" />
                  </svg>
                </span>
                <span aria-label="Diners Club" className="flex h-7 items-center justify-center rounded border border-stone-200 px-2">
                  <svg viewBox="0 0 42 20" className="h-4 w-auto" aria-hidden="true">
                    <circle cx="10" cy="10" r="7" fill="none" stroke="#1b6aa5" strokeWidth="2" />
                    <text x="18" y="14" fontSize="9" fontFamily="Arial" fontWeight="700" fill="#1b6aa5">
                      DINERS
                    </text>
                  </svg>
                </span>
                <span aria-label="American Express" className="flex h-7 items-center justify-center rounded border border-stone-200 px-2">
                  <svg viewBox="0 0 52 20" className="h-4 w-auto" aria-hidden="true">
                    <text x="2" y="14" fontSize="10" fontFamily="Arial" fontWeight="700" fill="#2e77bb">
                      AMEX
                    </text>
                  </svg>
                </span>
                <span aria-label="Elo" className="flex h-7 items-center justify-center rounded border border-stone-200 px-2">
                  <svg viewBox="0 0 36 20" className="h-4 w-auto" aria-hidden="true">
                    <text x="2" y="14" fontSize="12" fontFamily="Arial" fontWeight="700" fill="#111">
                      elo
                    </text>
                  </svg>
                </span>
                <span aria-label="Pix" className="flex h-7 items-center justify-center rounded border border-stone-200 px-2">
                  <svg viewBox="0 0 36 20" className="h-4 w-auto" aria-hidden="true">
                    <path d="M10 10l8-8 8 8-8 8-8-8Z" fill="none" stroke="#2bb673" strokeWidth="1.8" />
                    <text x="20" y="14" fontSize="8" fontFamily="Arial" fontWeight="700" fill="#2bb673">
                      pix
                    </text>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-stone-500 sm:flex-row">
          <span>© 2026 Mar&Mov - Todos os direitos reservados.</span>
          <span>CNPJ 59.418.806/0032-43 | Rua Cipriano Barata, 456, Ipiranga, São Paulo - SP</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
