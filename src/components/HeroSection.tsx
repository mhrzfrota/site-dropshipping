import React from 'react'

const HeroSection: React.FC = () => {
  // Troque a imagem de fundo do hero pelo banner oficial da loja física/estúdio
  const heroImage =
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80'

  return (
    <section className="relative isolate min-h-[80vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-hero-overlay" aria-hidden="true" />

      <div className="relative z-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start px-4 py-16 md:py-24 lg:py-28">
          <div className="rounded-full bg-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-sm">
            Coleção Verão 2025
          </div>

          <h1 className="mt-6 max-w-3xl font-display text-4xl font-black leading-tight text-white drop-shadow md:text-5xl lg:text-6xl">
            Sua moda em movimento, do mar à cidade
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-white/90">
            A Mar&Mov traz as novidades da loja física para o online: peças confortáveis, autênticas, modernas e
            elegantes que acompanham seu ritmo, da praia ao dia a dia.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="/colecao/verao-2025" // Substitua pelo link real da coleção
              className="btn-primary"
            >
              Ver Coleção Verão 2025
            </a>
            <a href="/produtos" className="btn-secondary border-white/60">
              Comprar agora
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <span className="chip bg-white/80 text-brand-deep shadow-sm">Até 10x sem juros</span>
            <span className="chip bg-white/80 text-brand-deep shadow-sm">Troca fácil em até 30 dias</span>
            <span className="chip bg-white/80 text-brand-deep shadow-sm">Marcas como Cocci, Lupo e mais</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
