import React from 'react'
import { Link } from 'react-router-dom'

const HeroSection: React.FC = () => {
  const heroImage = '/images/home-hero.png'
  const fallbackImage = '/images/biquinis.jpg'

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget
    if (target.dataset.fallbackApplied) return
    target.dataset.fallbackApplied = 'true'
    target.src = fallbackImage
  }

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-stone-900">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Editorial Mar&Mov"
          className="h-full w-full object-cover"
          onError={handleImageError}
          loading="eager"
          decoding="async"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" aria-hidden="true" />

      <div className="relative z-10">
        <div className="mx-auto flex min-h-full max-w-6xl flex-col justify-center px-4 pb-16 pt-48 md:pt-52 box-border">
          <div className="max-w-xl space-y-5 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/80">Mar&Mov</p>
            <h1 className="font-display text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              <span className="block">Beach Wear</span>
              <span className="block">e Fitness</span>
            </h1>
            <p className="text-base text-white/90 sm:text-lg">
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/produtos"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/80 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-stone-900"
              >
                Comprar agora
              </Link>
              <a
                href="#vitrine"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/50 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 transition hover:bg-white hover:text-stone-900"
              >
                Ver coleção
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
