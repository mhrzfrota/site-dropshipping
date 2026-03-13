import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type Slide = {
  image: string
  fallback: string
  eyebrow: string
  title: string[]
  sub: string
  cta: { label: string; href: string }
  ctaSecondary: { label: string; href: string }
}

const slides: Slide[] = [
  {
    image: '/images/home1.png',
    fallback: '/images/home-hero.png',
    eyebrow: 'Nova Coleção · Verão 2025',
    title: ['Moda Praia', 'que te leva'],
    sub: 'Biquínis, maiôs e saídas de praia com qualidade de boutique.',
    cta: { label: 'Ver coleção', href: '/categoria/biquinis' },
    ctaSecondary: { label: 'Explorar tudo', href: '/produtos' },
  },
  {
    image: '/images/home2.png',
    fallback: '/images/home-hero.png',
    eyebrow: 'Fitness & Lifestyle',
    title: ['Performance', '& Estilo'],
    sub: 'Peças que acompanham seu ritmo do treino à praia.',
    cta: { label: 'Ver fitness', href: '/categoria/roupas' },
    ctaSecondary: { label: 'Todas as peças', href: '/produtos' },
  },
  {
    image: '/images/home3.png',
    fallback: '/images/home-hero.png',
    eyebrow: 'Beach & Lifestyle',
    title: ['Seu verão,', 'seu estilo'],
    sub: 'Acessórios e looks para quem vive o verão o ano todo.',
    cta: { label: 'Ver acessórios', href: '/categoria/acessorios' },
    ctaSecondary: { label: 'Ver sale', href: '/sale' },
  },
]

const SLIDE_DURATION = 6000

const HeroSection: React.FC = () => {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return
      setIsTransitioning(true)
      setCurrent(index)
      setTimeout(() => setIsTransitioning(false), 700)
    },
    [isTransitioning],
  )

  const nextSlide = useCallback(() => {
    goToSlide((current + 1) % slides.length)
  }, [current, goToSlide])

  useEffect(() => {
    const timer = setInterval(nextSlide, SLIDE_DURATION)
    return () => clearInterval(timer)
  }, [nextSlide])

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement>,
    fallback: string,
  ) => {
    const target = event.currentTarget
    if (target.dataset.fallbackApplied) return
    target.dataset.fallbackApplied = 'true'
    target.src = fallback
  }

  const padded = String(current + 1).padStart(2, '0')

  return (
    <section className="relative isolate h-screen overflow-hidden bg-stone-900">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title.join(' ')}
            className="h-full w-full object-cover"
            onError={(e) => handleImageError(e, slide.fallback)}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        </div>
      ))}

      {/* Bottom-to-top gradient */}
      <div
        className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
        aria-hidden="true"
      />
      {/* Left-to-right gradient */}
      <div
        className="absolute inset-0 z-20 bg-gradient-to-r from-black/50 via-black/10 to-transparent"
        aria-hidden="true"
      />

      {/* Content — bottom-left */}
      <div className="absolute inset-0 z-30 flex flex-col justify-end">
        <div className="mx-auto w-full max-w-7xl px-6 pb-20 sm:pb-28">
          {/* Slide content */}
          <div className="relative max-w-xl">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  index === current
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'
                }`}
              >
                {index === current && (
                  <>
                    {/* Eyebrow */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="block h-px w-8 bg-white/40" aria-hidden="true" />
                      <p className="text-[11px] tracking-[0.3em] text-white/55 uppercase font-medium">
                        {slide.eyebrow}
                      </p>
                    </div>

                    {/* Heading */}
                    <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.0]">
                      {slide.title.map((line, i) => (
                        <span key={i} className="block">
                          {line}
                        </span>
                      ))}
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-4 text-base text-white/70 max-w-md leading-relaxed">
                      {slide.sub}
                    </p>

                    {/* CTAs */}
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link
                        to={slide.cta.href}
                        className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-white px-8 text-sm font-semibold uppercase tracking-[0.12em] text-stone-900 transition hover:bg-white/90"
                      >
                        {slide.cta.label}
                      </Link>
                      <Link
                        to={slide.ctaSecondary.href}
                        className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/30 px-8 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:border-white/60 hover:bg-white/10"
                      >
                        {slide.ctaSecondary.label}
                      </Link>
                    </div>

                    {/* Dot indicators + counter — inline with content */}
                    <div className="mt-10 flex items-center gap-4">
                      <div className="flex gap-2">
                        {slides.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => goToSlide(i)}
                            aria-label={`Ir para slide ${i + 1}`}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              i === current
                                ? 'w-8 bg-white'
                                : 'w-1.5 bg-white/35 hover:bg-white/60'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] tracking-[0.2em] text-white/40 font-medium tabular-nums">
                        {padded} / 03
                      </span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vertical arrows — right side */}
      <div className="absolute right-4 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-2 sm:right-6">
        <button
          onClick={() =>
            goToSlide((current - 1 + slides.length) % slides.length)
          }
          aria-label="Slide anterior"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4"
          >
            <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={() => goToSlide((current + 1) % slides.length)}
          aria-label="Próximo slide"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4"
          >
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Scroll hint — bottom-right, sm+ only */}
      <div className="absolute bottom-8 right-6 z-30 hidden sm:flex flex-col items-center gap-2">
        <div className="flex flex-col items-center gap-1.5 rounded-full border border-white/20 px-3 py-3">
          <span className="text-[9px] tracking-[0.25em] text-white/40 uppercase font-medium rotate-0">
            scroll
          </span>
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
