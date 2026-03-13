import React from 'react'

const benefits = [
  {
    title: 'Produtos Originais',
    text: 'Garantimos qualidade e autenticidade em cada item!',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path
          d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 12l2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Envios Nacionais',
    text: 'Via Correios, transportadora ou retirada.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Compra Segura',
    text: 'Utilizamos as melhores tecnologias de proteção.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <rect
          x="3"
          y="11"
          width="18"
          height="11"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M7 11V7a5 5 0 0 1 10 0v4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="16" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Suporte WhatsApp',
    text: 'Nosso atendimento está disponível das 14 às 18hrs.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

type BenefitItemProps = {
  title: string
  text: string
  icon: React.ReactNode
  separator?: boolean
}

const BenefitItem: React.FC<BenefitItemProps> = ({ title, text, icon, separator }) => (
  <>
    <div className="flex items-center gap-3 px-10 whitespace-nowrap">
      <span className="text-white flex-shrink-0">{icon}</span>
      <div className="flex flex-col">
        <span className="text-white font-semibold text-xs uppercase tracking-[0.15em]">
          {title}
        </span>
        <span className="text-white/60 text-xs">{text}</span>
      </div>
    </div>
    {separator && (
      <span className="w-px h-4 bg-white/20 flex-shrink-0" aria-hidden="true" />
    )}
  </>
)

const BenefitsStripSection: React.FC = () => {
  return (
    <section className="bg-[#0a1f3d] py-4 overflow-hidden border-t-2 border-[#477e8a]">
      <div className="flex">
        {/* Visible set */}
        <div className="flex animate-marquee shrink-0">
          {benefits.map((benefit, i) => (
            <BenefitItem
              key={benefit.title}
              {...benefit}
              separator={i < benefits.length - 1}
            />
          ))}
          {/* trailing separator before loop */}
          <span className="w-px h-4 bg-white/20 flex-shrink-0 self-center" aria-hidden="true" />
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex animate-marquee shrink-0" aria-hidden="true">
          {benefits.map((benefit, i) => (
            <BenefitItem
              key={`${benefit.title}-dup`}
              {...benefit}
              separator={i < benefits.length - 1}
            />
          ))}
          <span className="w-px h-4 bg-white/20 flex-shrink-0 self-center" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}

export default BenefitsStripSection
