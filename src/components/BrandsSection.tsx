import React from 'react'

const brands = ['Mar&Mov', 'Brisa', 'Onda', 'Atlântica', 'Solar', 'Costa', 'Vento', 'Marina']

const BrandsSection: React.FC = () => {
  return (
    <section id="marcas" className="bg-brand-sand py-14 scroll-mt-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Marcas</p>
          <h2 className="mt-3 font-display text-3xl font-black text-stone-800">Marcas em destaque</h2>
          <p className="mt-2 text-sm text-stone-500">Seleção de marcas parceiras e exclusivas da Mar&Mov.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {brands.map((brand) => (
            <div
              key={brand}
              className="flex items-center justify-center rounded-full border border-white/70 bg-white/70 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-stone-600"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BrandsSection
