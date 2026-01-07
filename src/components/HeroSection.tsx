import React from 'react'
import { Link } from 'react-router-dom'

const HeroSection: React.FC = () => {
  const heroImage = '/images/home-hero.png'
  const heroAccentOne = '/images/biquini-2.jpg'
  const heroAccentTwo = '/images/academia-4.jpg'
  const heroAccentThree = '/images/bolsa-1.jpg'
  const fallbackImage = '/images/biquinis.jpg'

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget
    if (target.dataset.fallbackApplied) return
    target.dataset.fallbackApplied = 'true'
    target.src = fallbackImage
  }

  return (
    <section id="vitrine" className="relative isolate overflow-hidden bg-brand-sand scroll-mt-28">
      <div
        className="absolute inset-0 bg-gradient-to-br from-white via-brand-sand to-brand-sandDark/80"
        aria-hidden="true"
      />
      <div
        className="absolute -right-32 top-10 h-64 w-64 rounded-full bg-brand-aqua/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative z-10">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-28">
          <div>
            <div className="max-w-xl rounded-3xl bg-white/80 p-6 shadow-xl backdrop-blur-sm sm:p-8">
              <p className="text-xs font-semibold tracking-[0.12em] text-brand-deep">Mar&Mov</p>
              <h1 className="mt-4 font-display text-4xl font-black leading-tight text-stone-900 md:text-5xl lg:text-6xl">
                Moda praia e fitness para o seu ritmo.
              </h1>

              <p className="mt-4 text-base text-stone-700 md:text-lg">
                Peças premium direto da loja física. Compre online e receba em todo o Brasil.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link to="/produtos" className="btn-primary">
                  Comprar agora
                </Link>
                <Link to="/produtos" className="btn-secondary">
                  Ver coleção
                </Link>
              </div>
            </div>
          </div>

          <div className="relative grid gap-4 sm:grid-cols-2 lg:min-h-[440px] lg:grid-cols-1">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5 sm:col-span-2 lg:absolute lg:left-0 lg:top-0 lg:h-[420px] lg:w-[320px]">
              <img
                src={heroImage}
                alt="Editorial Mar&Mov"
                className="h-full w-full object-cover"
                onError={handleImageError}
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5 lg:absolute lg:right-0 lg:top-10 lg:h-[300px] lg:w-[230px]">
              <img
                src={heroAccentOne}
                alt="Coleção beach wear"
                className="h-full w-full object-cover"
                onError={handleImageError}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5 lg:absolute lg:bottom-0 lg:left-28 lg:h-[220px] lg:w-[200px]">
              <img
                src={heroAccentTwo}
                alt="Coleção fitness"
                className="h-full w-full object-cover"
                onError={handleImageError}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5 sm:col-span-2 lg:absolute lg:bottom-8 lg:right-2 lg:h-[200px] lg:w-[200px]">
              <img
                src={heroAccentThree}
                alt="Detalhes de acessórios"
                className="h-full w-full object-cover"
                onError={handleImageError}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
