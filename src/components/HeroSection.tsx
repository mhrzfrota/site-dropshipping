import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type Slide = {
  image: string
  fallback: string
  subtitle: string
  title: string[]
  cta: { label: string; href: string }
}

const slides: Slide[] = [
  {
    image: '/images/biquini-2.jpg',
    fallback: '/images/biquinis.jpg',
    subtitle: 'Nova Coleção',
    title: ['Moda Praia', 'Verão 2025'],
    cta: { label: 'Ver coleção', href: '/categoria/biquinis' },
  },
  {
    image: '/images/academia-1.jpg',
    fallback: '/images/academia-3.jpg',
    subtitle: 'Fitness',
    title: ['Performance', '& Estilo'],
    cta: { label: 'Explorar', href: '/categoria/roupas' },
  },
  {
    image: '/images/short-masc-4.jpg',
    fallback: '/images/short-masc.jpg',
    subtitle: 'Masculino',
    title: ['Beach', '& Lifestyle'],
    cta: { label: 'Conferir', href: '/produtos' },
  },
]

const SLIDE_DURATION = 5000

const HeroSection: React.FC = () => {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrent(index)
    setTimeout(() => setIsTransitioning(false), 700)
  }, [isTransitioning])

  const nextSlide = useCallback(() => {
    goToSlide((current + 1) % slides.length)
  }, [current, goToSlide])

  useEffect(() => {
    const timer = setInterval(nextSlide, SLIDE_DURATION)
    return () => clearInterval(timer)
  }, [nextSlide])

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>, fallback: string) => {
    const target = event.currentTarget
    if (target.dataset.fallbackApplied) return
    target.dataset.fallbackApplied = 'true'
    target.src = fallback
  }

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

      {/* Overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-r from-black/60 via-black/30 to-transparent" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-30 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="max-w-xl space-y-6 text-white">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  index === current
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4 absolute pointer-events-none'
                }`}
              >
                {index === current && (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                      {slide.subtitle}
                    </p>
                    <h1 className="mt-4 font-display text-5xl font-black leading-[1.1] sm:text-6xl lg:text-7xl">
                      {slide.title.map((line, i) => (
                        <span key={i} className="block">{line}</span>
                      ))}
                    </h1>
                    <div className="mt-8 flex flex-wrap gap-4">
                      <Link
                        to={slide.cta.href}
                        className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-white px-8 text-sm font-semibold uppercase tracking-[0.15em] text-stone-900 transition hover:bg-white/90"
                      >
                        {slide.cta.label}
                      </Link>
                      <Link
                        to="/produtos"
                        className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/60 px-8 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-white hover:text-stone-900"
                      >
                        Ver tudo
                      </Link>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Ir para slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === current
                ? 'w-8 bg-white'
                : 'w-2 bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Arrow Navigation */}
      <button
        onClick={() => goToSlide((current - 1 + slides.length) % slides.length)}
        aria-label="Slide anterior"
        className="absolute left-4 top-1/2 z-30 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 sm:left-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={() => goToSlide((current + 1) % slides.length)}
        aria-label="Próximo slide"
        className="absolute right-4 top-1/2 z-30 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 sm:right-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </section>
  )
}

export default HeroSection
