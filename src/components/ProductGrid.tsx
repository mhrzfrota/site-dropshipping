import React from 'react'
import ProductCard, { ProductHighlight } from './ProductCard'
import { Product } from '../data/products'

type ProductGridProps = {
  items: Product[]
}

const mapToHighlight = (product: Product): ProductHighlight => ({
  slug: product.slug,
  brand: product.brand,
  title: product.title,
  description: product.description,
  price: product.price,
  image: product.image,
})

const ProductGrid: React.FC<ProductGridProps> = ({ items }) => {
  if (!items.length) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-200 bg-white/70 px-6 py-10 text-center text-sm text-stone-500">
        Nenhum produto encontrado.
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((product) => (
        <ProductCard key={product.id} item={mapToHighlight(product)} />
      ))}
    </div>
  )
}

export default ProductGrid
