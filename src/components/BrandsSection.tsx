import React from 'react'

const BrandsSection: React.FC = () => {
  const brandLogos = [
    { src: '/images/lupo.png', alt: 'Lupo' },
    { src: '/images/cocci.png', alt: 'Cocci' },
    { src: '/images/onda.png', alt: 'Onda' },
  ]

  return (
    <section id="marcas" className="bg-white py-12 scroll-mt-28">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4">
        <p className="text-center text-sm font-medium text-stone-600">Marcas disponíveis</p>
        <div className="mt-8 w-full">
          <div className="mx-auto grid max-w-5xl grid-cols-2 items-center justify-items-center gap-x-8 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {brandLogos.map((brand) => (
              <img
                key={brand.src}
                src={brand.src}
                alt={brand.alt}
                className="h-9 w-auto object-contain transition-transform duration-300 hover:scale-105 sm:h-10 md:h-12"
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BrandsSection
