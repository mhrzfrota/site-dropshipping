import React from 'react'
import ProductCard, { type ProductHighlight } from './ProductCard'

// Quando conectar ao backend/API, troque este array mockado pelo retorno real de produtos/coleções
const highlightItems: ProductHighlight[] = [
  {
    id: 'cocci-biquini',
    brand: 'Cocci',
    title: 'Biquíni Essencial Cocci',
    description: 'Modelagem confortável com toque macio e acabamento que acompanha o movimento.',
    price: 'R$ 199,90',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
    link: '/produtos',
  },
  {
    id: 'lupo-body',
    brand: 'Lupo',
    title: 'Body Conforto Lupo',
    description: 'Tecnologia sem costura para leveza, respirabilidade e ajuste impecável.',
    price: 'R$ 249,90',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80',
    link: '/produtos',
  },
  {
    id: 'marandmov-saida',
    brand: 'Mar&Mov Essentials',
    title: 'Saída de Praia Mar&Mov',
    description: 'Fluidez inspirada no mar, com caimento elegante e toque de areia suave.',
    price: 'R$ 229,90',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    link: '/produtos',
  },
  {
    id: 'cocci-vestido',
    brand: 'Cocci',
    title: 'Vestido Fresh Cocci',
    description: 'Tecido leve com movimento natural e cores aquáticas para o verão.',
    price: 'R$ 279,90',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    link: '/produtos',
  },
  {
    id: 'lupo-top',
    brand: 'Lupo',
    title: 'Top Soft Move',
    description: 'Suporte gentil, respirável, pensado para acompanhar você o dia todo.',
    price: 'R$ 149,90',
    image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80',
    link: '/produtos',
  },
  {
    id: 'marandmov-loungewear',
    brand: 'Mar&Mov Essentials',
    title: 'Conjunto Loungewear',
    description: 'Conforto elegante para casa ou rua, com toque macio e linhas curvas.',
    price: 'R$ 259,90',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
    link: '/produtos',
  },
]

const HighlightsSection: React.FC = () => {
  return (
    <section id="novidades" className="bg-white scroll-mt-28">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="max-w-3xl space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-deep">Novidades da loja</p>
          <h2 className="font-display text-3xl font-black text-ink md:text-4xl">
            Peças selecionadas da Mar&Mov, direto da loja física para você comprar online.
          </h2>
          <p className="text-base text-ink/70">
            Mistura de marcas queridinhas e essenciais próprias, com foco em movimento, frescor e elegância acessível.
          </p>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {highlightItems.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3 rounded-2xl bg-brand-ocean/10 px-4 py-3 text-sm text-ink/80">
          <span className="font-semibold text-brand-deep">Marcas que você já ama</span>
          <span className="h-px flex-1 bg-brand-deep/30" aria-hidden="true"></span>
          <span>Cocci · Lupo · Mar&Mov · Outras</span>
        </div>
      </div>
    </section>
  )
}

export default HighlightsSection
