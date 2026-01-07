import React from 'react'

const StoreInfoSection: React.FC = () => {
  return (
    <section id="loja-fisica" className="bg-brand-sand py-16 scroll-mt-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
          <div className="card-surface p-6 sm:p-8">
            <p className="text-xs font-semibold tracking-[0.12em] text-stone-600">Loja física</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-stone-800">
              Retire na loja com facilidade
            </h2>
            <p className="mt-3 text-sm text-stone-600">
              Compre online e retire com atendimento humano e rápido.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-stone-50 p-4">
                <p className="text-xs font-semibold tracking-[0.12em] text-stone-500">Endereço</p>
                <p className="mt-2 text-sm font-semibold text-stone-700">BR 408, ao lado da Nattos</p>
              </div>
              <div className="rounded-2xl bg-stone-50 p-4">
                <p className="text-xs font-semibold tracking-[0.12em] text-stone-500">Horários</p>
                <p className="mt-2 text-sm font-semibold text-stone-700">Seg a Qui: 07:30 às 18:00</p>
                <p className="text-sm font-semibold text-stone-700">Sex: até 17:00</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-brand-aqua/30 bg-white/80 p-6 shadow-lg">
            <p className="text-xs font-semibold tracking-[0.12em] text-stone-600">Retire na loja</p>
            <h3 className="mt-3 text-xl font-semibold text-stone-800">
              Sem custo de frete e com atendimento real.
            </h3>
            <p className="mt-3 text-sm text-stone-600">
              Nossa equipe separa seu pedido para retirada rápida.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-stone-600">
              <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-brand-aqua/20 text-brand-deep">
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path
                    d="M6 12l4 4 8-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Atendimento humano via WhatsApp quando precisar.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StoreInfoSection
