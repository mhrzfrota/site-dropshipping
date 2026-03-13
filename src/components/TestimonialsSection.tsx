import React, { useEffect, useRef, useState } from 'react'

type Testimonial = {
  name: string
  location: string
  rating: number
  text: string
  product: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Camila R.',
    location: 'Recife, PE',
    rating: 5,
    text: 'Recebi meu biquíni em 4 dias e ficou INCRÍVEL. O acabamento é muito superior ao que esperava pelo preço. O atendimento pelo WhatsApp foi super rápido, me ajudaram a escolher o tamanho certo.',
    product: 'Biquíni Sol Areia',
    avatar: 'CR',
  },
  {
    name: 'Fernanda O.',
    location: 'Fortaleza, CE',
    rating: 5,
    text: 'Comprei o maiô para uma viagem e recebi antes do prazo. A qualidade é excelente, o tecido não desbota e a modelagem valoriza muito. Já indiquei para três amigas!',
    product: 'Maiô Costas Cruzadas',
    avatar: 'FO',
  },
  {
    name: 'Lúcia M.',
    location: 'Salvador, BA',
    rating: 5,
    text: 'Me surpreendi com a facilidade de comprar. Montei meu carrinho, mandei para o WhatsApp e em minutos já tinha confirmação. O vestido chegou embalado com muito cuidado.',
    product: 'Vestido Areia de Linho',
    avatar: 'LM',
  },
  {
    name: 'Tatiane B.',
    location: 'Natal, RN',
    rating: 5,
    text: 'Primeira vez comprando online roupa de praia e escolhi muito bem. A saída de praia é linda, exatamente igual às fotos. Vou comprar mais peças com certeza.',
    product: 'Saída Pareô Duna',
    avatar: 'TB',
  },
  {
    name: 'Ana Paula S.',
    location: 'Maceió, AL',
    rating: 5,
    text: 'A bolsa é linda e resistente. Chegou com um bilhetinho personalizado da loja, um detalhe que fez toda a diferença. Atendimento nota 10.',
    product: 'Bolsa Palha Areia',
    avatar: 'AS',
  },
  {
    name: 'Renata C.',
    location: 'João Pessoa, PB',
    rating: 4,
    text: 'Fiquei na dúvida entre dois tamanhos e a equipe me ajudou a escolher pelo histórico de medidas. Acertaram na indicação! Biquíni ficou perfeito.',
    product: 'Biquíni Brisa Viva',
    avatar: 'RC',
  },
]

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg
    viewBox="0 0 20 20"
    className="h-4 w-4"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth={filled ? 0 : 1.5}
    aria-hidden="true"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
  </svg>
)

const TestimonialCard: React.FC<{ t: Testimonial }> = ({ t }) => (
  <article className="flex w-[320px] shrink-0 flex-col justify-between rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:w-[360px]">
    <div>
      <div className="flex items-center gap-1 text-amber-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} filled={i < t.rating} />
        ))}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-stone-700">"{t.text}"</p>
    </div>
    <div className="mt-5 flex items-center gap-3 border-t border-stone-100 pt-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#477e8a] text-sm font-bold text-white">
        {t.avatar}
      </span>
      <div>
        <p className="text-sm font-semibold text-ink">{t.name}</p>
        <p className="text-xs text-stone-500">{t.location} · {t.product}</p>
      </div>
    </div>
  </article>
)

const TestimonialsSection: React.FC = () => {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const positionRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  const SPEED = 0.5

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const animate = () => {
      if (!isPaused) {
        positionRef.current += SPEED
        const halfWidth = track.scrollWidth / 2
        if (positionRef.current >= halfWidth) {
          positionRef.current = 0
        }
        track.style.transform = `translateX(-${positionRef.current}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [isPaused])

  const doubled = [...testimonials, ...testimonials]

  const totalRatings = testimonials.length
  const avgRating = (testimonials.reduce((s, t) => s + t.rating, 0) / totalRatings).toFixed(1)

  return (
    <section className="overflow-hidden bg-brand-sand py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-10 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.12em] text-stone-500 uppercase">Avaliações</p>
            <h2 className="mt-2 font-display text-3xl font-black text-ink">
              Quem já comprou, aprovou
            </h2>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-5 py-3 shadow-sm">
            <div>
              <p className="text-2xl font-black text-ink leading-none">{avgRating}</p>
              <div className="mt-1 flex items-center gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} filled={i < Math.round(Number(avgRating))} />
                ))}
              </div>
            </div>
            <div className="border-l border-stone-200 pl-3">
              <p className="text-sm font-semibold text-ink">{totalRatings} avaliações</p>
              <p className="text-xs text-stone-500">clientes verificados</p>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite carousel — full bleed */}
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        {/* Left fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-brand-sand to-transparent" />
        {/* Right fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-brand-sand to-transparent" />

        <div
          ref={trackRef}
          className="flex gap-5 pb-4 pt-2 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
