import React from 'react'
import { Link } from 'react-router-dom'

const HeroSection: React.FC = () => {
  // Salve o banner oficial em public/images/home-hero.png; o fallback mantém a home enquanto o arquivo não é enviado.
  const heroImage = '/images/home-hero.png'
  const fallbackHero =
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80'

  return (
    <section id="vitrine" className="relative isolate min-h-[80vh] overflow-hidden scroll-mt-28">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage}), url(${fallbackHero})` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-brand-deep/85 via-brand-deep/55 to-transparent"
        aria-hidden="true"
      />
      <div className="relative z-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start px-4 py-16 md:py-24 lg:py-28">
          <div className="max-w-xl rounded-3xl bg-white/10 p-6 backdrop-blur-sm shadow-soft sm:p-8">
            <p className="text-xs font-semibold tracking-[0.2em] text-white/80">Mar&Mov</p>
            <h1 className="mt-4 font-display text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
              Moda praia e fitness para o seu ritmo.
            </h1>

            <p className="mt-4 text-base text-white/90 md:text-lg">
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
      </div>
    </section>
  )
}

export default HeroSection
