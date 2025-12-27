import React from 'react'

export type ProductHighlight = {
  id: string
  brand: string
  title: string
  description: string
  price: string
  image: string
  link?: string
}

type ProductCardProps = {
  item: ProductHighlight
}

const fallbackImage = '/images/cat-roupas.jpg'

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget
    if (target.dataset.fallbackApplied) return
    target.dataset.fallbackApplied = 'true'
    target.src = fallbackImage
  }

  return (
    <div className="group card-hover h-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-brand-aqua/15">
      <div className="relative aspect-[4/5] overflow-hidden">
        {/* Troque o placeholder abaixo pela foto real do produto/coleção */}
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
          onError={handleImageError}
        />
        <span className="chip absolute left-3 top-3 bg-white/90 text-brand-deep shadow-sm">{item.brand}</span>
      </div>

      <div className="flex h-full flex-col gap-2 p-4">
        <h3 className="font-display text-lg font-bold text-ink">{item.title}</h3>
        <p className="text-sm leading-relaxed text-ink/70">{item.description}</p>
        <p className="text-lg font-extrabold text-brand-deep">{item.price}</p>
        <a
          href={item.link ?? `/produto/${item.id}`}
          className="mt-auto inline-flex w-full justify-center rounded-xl bg-brand-deep px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-ocean"
        >
          Comprar
        </a>
      </div>
    </div>
  )
}

export default ProductCard
