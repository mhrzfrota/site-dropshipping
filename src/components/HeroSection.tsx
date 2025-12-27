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
      <div className="relative z-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start px-4 py-16 md:py-24 lg:py-28">
          <h1 className="mt-2 max-w-3xl font-display text-4xl font-black leading-tight text-[#0a2345] drop-shadow md:text-5xl lg:text-6xl">
            Sua moda em movimento, do mar à cidade
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-white/90">
            A Mar&Mov traz as novidades da loja física para o online: peças confortáveis, autênticas, modernas e
            elegantes que acompanham seu ritmo, da praia ao dia a dia.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/produtos" className="btn-primary">
              Ver Coleção Verão 2025
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
