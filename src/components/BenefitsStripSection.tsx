import React from 'react'

const benefits = [
  {
    text: 'Retire seu pedido e conheça a loja presencialmente.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden="true">
        <path
          d="M7 9h10l-1 10H8L7 9Zm2 0V7a3 3 0 0 1 6 0v2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    text: 'Entregamos com cuidado e preparo especial.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden="true">
        <path
          d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    text: 'Facilidade para trocas e devoluções.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden="true">
        <rect
          x="3"
          y="6"
          width="18"
          height="12"
          rx="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M3 10h18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    text: 'Fale direto com nossa equipe no WhatsApp.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden="true">
        <path
          d="M4 12a8 8 0 0 1 16 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <rect
          x="3"
          y="12"
          width="4"
          height="6"
          rx="1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="17"
          y="12"
          width="4"
          height="6"
          rx="1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M9 19a3 3 0 0 0 6 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    text: 'Sem custo de frete e com atendimento real.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden="true">
        <path
          d="M4 7l8-4 8 4-8 4-8-4Zm0 0v10l8 4 8-4V7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

const BenefitsStripSection: React.FC = () => {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 text-center sm:grid-cols-2 lg:grid-cols-5">
          {benefits.map((benefit) => (
            <div key={benefit.text} className="flex flex-col items-center gap-4 text-stone-700">
              <span className="text-stone-400">{benefit.icon}</span>
              <p className="max-w-[220px] text-[13px] font-medium leading-6 underline decoration-stone-300 underline-offset-4">
                {benefit.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BenefitsStripSection
