import React from 'react'

const TrustSection: React.FC = () => {
  return (
    <section id="confianca" className="bg-white py-16 scroll-mt-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold tracking-[0.12em] text-stone-600">Confiança</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-stone-800">
            Por que comprar na Mar&Mov
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            Loja física com atendimento humano e curadoria real.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card-surface p-5 sm:p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-aqua/20 text-brand-deep">
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path
                  d="M3 10.5 12 4l9 6.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h3 className="mt-4 text-base font-semibold text-stone-800">Loja física</h3>
            <p className="mt-2 text-sm text-stone-600">Retire seu pedido e conheça a loja presencialmente.</p>
          </div>

          <div className="card-surface p-5 sm:p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-aqua/20 text-brand-deep">
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path
                  d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h3 className="mt-4 text-base font-semibold text-stone-800">Envio para todo o Brasil</h3>
            <p className="mt-2 text-sm text-stone-600">Entregamos com cuidado e preparo especial.</p>
          </div>

          <div className="card-surface p-5 sm:p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-aqua/20 text-brand-deep">
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path
                  d="M4 12a7 7 0 0 1 12-4l2-2v6h-6l2-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h3 className="mt-4 text-base font-semibold text-stone-800">Troca garantida</h3>
            <p className="mt-2 text-sm text-stone-600">Facilidade para trocas e devoluções.</p>
          </div>

          <div className="card-surface p-5 sm:p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-aqua/20 text-brand-deep">
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path
                  d="M4 5h16v11a2 2 0 0 1-2 2H8l-4 4V7a2 2 0 0 1 2-2Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h3 className="mt-4 text-base font-semibold text-stone-800">Atendimento humano</h3>
            <p className="mt-2 text-sm text-stone-600">Fale direto com nossa equipe no WhatsApp.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustSection
