import React from 'react'
import { Link } from 'react-router-dom'

const institutionalLinks = [
  { label: 'Institucional', href: '/produtos' },
  { label: 'Ajuda', href: '/produtos' },
  { label: 'Termos de uso', href: '/produtos' },
  { label: 'Politica de Troca e Devolucao', href: '/produtos' },
  { label: 'Politica de Envio', href: '/produtos' },
]

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#477e8a] text-white">
      <div className="mx-auto max-w-7xl px-4 pb-6 pt-8">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr_1fr_0.8fr]">
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <a
                href="https://wa.me/5581981894816"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp Mar e Mov"
                className="flex h-9 w-9 items-center justify-center text-white transition hover:opacity-80"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-[31px] w-[31px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 4.5a7.5 7.5 0 0 0-6.5 11.2L4 20l4.5-1.4A7.5 7.5 0 1 0 12 4.5Z" />
                  <path d="M9.2 9.5c.2-.3.4-.3.6-.3h.5c.2 0 .3.1.4.3l.5 1.1c.1.2.1.4 0 .6l-.4.5c-.1.1-.1.3 0 .5.3.5.9 1.1 1.4 1.4.2.1.4.1.5 0l.5-.4c.2-.1.4-.1.6 0l1.1.5c.2.1.3.3.3.5 0 .4-.2.9-.5 1.2-.3.3-.7.4-1.2.3-1.1-.2-2.4-1.1-3.3-2-.9-.9-1.8-2.2-2-3.3-.1-.5 0-.9.3-1.2Z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram Mar e Mov"
                className="flex h-9 w-9 items-center justify-center text-white transition hover:opacity-80"
              >
                <svg viewBox="0 0 24 24" className="h-[31px] w-[31px]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="4.5" y="4.5" width="15" height="15" rx="4" />
                  <circle cx="12" cy="12" r="3.5" />
                  <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook Mar e Mov"
                className="flex h-9 w-9 items-center justify-center text-white transition hover:opacity-80"
              >
                <svg viewBox="0 0 24 24" className="h-[31px] w-[31px]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M14 8h2V5h-2a4 4 0 0 0-4 4v2H8v3h2v5h3v-5h2.2l.8-3H13V9a1 1 0 0 1 1-1Z" />
                </svg>
              </a>
            </div>

            <div className="space-y-4">
              <p className="text-[15px] font-bold uppercase tracking-[0.05em]">Receba as novidades</p>
              <form className="space-y-2.5">
                <label className="sr-only" htmlFor="footer-email">
                  Digite seu e-mail
                </label>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Digite seu e-mail aqui"
                  className="h-8 w-full border border-white/45 bg-white/95 px-3 text-xs text-slate-800 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-white/70"
                />
                <button
                  type="submit"
                  className="h-8 w-full border border-white/75 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  Enviar
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[15px] font-bold uppercase tracking-[0.05em]">Onde estamos</p>
            <div className="overflow-hidden border border-white/30">
              <iframe
                title="Mapa Mar e Mov"
                src="https://www.google.com/maps?q=Rua%20Costa%20e%20Silva%20116%20C%20Loteamento%20Primavera%20Paudalho%20PE&output=embed"
                className="h-36 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="text-xs leading-relaxed text-white/90">
              10, rua Costa e Silva, 116 C - Loteamento Primavera, Paudalho - PE, 55825-000
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-[15px] font-bold uppercase tracking-[0.05em]">Fale conosco</p>
            <a
              href="tel:+5581981894816"
              className="flex min-h-[32px] items-center gap-2 border border-white/30 bg-[#0000001f] px-3 text-xs font-semibold transition hover:bg-[#0000002c]"
            >
              <span className="text-white/90">WhatsApp</span>
              <span>(81) 98189-4816</span>
            </a>
            <a
              href="mailto:contato@maremov.com.br"
              className="flex min-h-[32px] items-center gap-2 border border-white/30 bg-[#0000001f] px-3 text-xs font-semibold transition hover:bg-[#0000002c]"
            >
              <span className="text-white/90">Email</span>
              <span>contato@maremov.com.br</span>
            </a>
            <p className="text-xs text-white/90">Horário de atendimento: Segunda a Quinta das 07:30h às 18h | Sexta das 07:30 às 17h</p>
          </div>

          <div className="space-y-4 pt-1">
            {institutionalLinks.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="block text-xs font-medium text-white/90 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-white/25 pt-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-xs text-white/85">(c) Mar&Mov - CNPJ 08.794.548/0001-62 | Vnda - Tecnologia em Ecommerce</p>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="inline-flex h-7 items-center rounded border border-white/30 bg-[#0000002b] px-2.5 text-[10px] font-bold tracking-[0.06em] text-white">
                SITE SEGURO SSL
              </span>
              <span className="inline-flex h-6 items-center rounded border border-white/30 bg-white px-1.5">
                <img
                  src="/images/payment-icons/visa.svg"
                  alt="Visa"
                  className="h-4 w-auto"
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="inline-flex h-6 items-center rounded border border-white/30 bg-white px-1.5">
                <img
                  src="/images/payment-icons/mastercard.svg"
                  alt="Mastercard"
                  className="h-4 w-auto"
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="inline-flex h-6 items-center rounded border border-white/30 bg-white px-1.5">
                <img
                  src="/images/payment-icons/hipercard.svg"
                  alt="Hipercard"
                  className="h-4 w-auto"
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="inline-flex h-6 items-center rounded border border-white/30 bg-white px-1.5">
                <img
                  src="/images/payment-icons/elo.svg"
                  alt="Elo"
                  className="h-4 w-auto"
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="inline-flex h-6 items-center rounded border border-white/30 bg-white px-1.5">
                <img
                  src="/images/payment-icons/pix.svg"
                  alt="Pix"
                  className="h-4 w-auto"
                  loading="lazy"
                  decoding="async"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

