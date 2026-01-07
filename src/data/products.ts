export type ProductCategory = 'biquinis' | 'maios' | 'roupas' | 'acessorios'

export type ProductVariant = {
  sizes: string[]
  colors: string[]
}

export type ProductSortKey = 'destaques' | 'recentes' | 'preco-asc' | 'preco-desc'

export const productSortOptions: { value: ProductSortKey; label: string }[] = [
  { value: 'destaques', label: 'Destaques' },
  { value: 'recentes', label: 'Mais recentes' },
  { value: 'preco-asc', label: 'Menor preço' },
  { value: 'preco-desc', label: 'Maior preço' },
]

export type Product = {
  id: string
  slug: string
  name: string
  brand: string
  category: ProductCategory
  price: number
  image: string
  images?: string[]
  available: boolean
  variants: ProductVariant
}

export const categoryMeta: Record<ProductCategory, { label: string; image: string }> = {
  biquinis: {
    label: 'Biquínis',
    image: '/images/biquinis.jpg',
  },
  maios: {
    label: 'Maiôs',
    image: '/images/maio-1.jpg',
  },
  roupas: {
    label: 'Roupas',
    image: '/images/academia-3.jpg',
  },
  acessorios: {
    label: 'Acessórios',
    image: '/images/meias-acessorios.jpg',
  },
}

const products: Product[] = [
  {
    id: 'prod-01',
    slug: 'biquini-sol-areia',
    name: 'Biquíni Sol Areia',
    brand: 'Lupo',
    category: 'biquinis',
    price: 289.9,
    image: '/images/biquini-2.jpg',
    images: ['/images/biquini-2.jpg', '/images/home-hero.png', '/images/biquinis.jpg'],
    available: true,
    variants: {
      sizes: ['P', 'M', 'G'],
      colors: ['Areia', 'Azul', 'Preto'],
    },
  },
  {
    id: 'prod-02',
    slug: 'biquini-brisa-viva',
    name: 'Biquíni Brisa Viva',
    brand: 'Cocci',
    category: 'biquinis',
    price: 319.9,
    image: '/images/biquinis.jpg',
    images: ['/images/biquinis.jpg', '/images/academia-1.jpg', '/images/biquini-2.jpg'],
    available: true,
    variants: {
      sizes: ['P', 'M', 'G'],
      colors: ['Coral', 'Verde', 'Off-white'],
    },
  },
  {
    id: 'prod-03',
    slug: 'maio-lagoa-preto',
    name: 'Maiô Lagoa Preto',
    brand: 'Atlântica',
    category: 'maios',
    price: 399.9,
    image: '/images/maio-1.jpg',
    images: ['/images/maio-1.jpg', '/images/home-hero.png', '/images/academia-4.jpg'],
    available: true,
    variants: {
      sizes: ['P', 'M', 'G'],
      colors: ['Preto', 'Grafite'],
    },
  },
  {
    id: 'prod-04',
    slug: 'maio-costas-cruzadas',
    name: 'Maiô Costas Cruzadas',
    brand: 'Onda',
    category: 'maios',
    price: 419.9,
    image: '/images/academia-4.jpg',
    images: ['/images/academia-4.jpg', '/images/academia-3.jpg', '/images/maio-1.jpg'],
    available: true,
    variants: {
      sizes: ['P', 'M', 'G'],
      colors: ['Azul', 'Vinho'],
    },
  },
  {
    id: 'prod-05',
    slug: 'vestido-areia-linho',
    name: 'Vestido Areia de Linho',
    brand: 'Marina',
    category: 'roupas',
    price: 529.0,
    image: '/images/blusa-1.jpg',
    images: ['/images/blusa-1.jpg', '/images/academia-3.jpg', '/images/short-masc-4.jpg'],
    available: true,
    variants: {
      sizes: ['P', 'M', 'G', 'GG'],
      colors: ['Areia', 'Branco'],
    },
  },
  {
    id: 'prod-06',
    slug: 'saida-pareo-duna',
    name: 'Saída Pareô Duna',
    brand: 'Mar&Mov',
    category: 'roupas',
    price: 249.9,
    image: '/images/short-masc.jpg',
    images: ['/images/short-masc.jpg', '/images/home-hero.png', '/images/short-masc-3.jpg'],
    available: true,
    variants: {
      sizes: ['P', 'M', 'G', 'GG'],
      colors: ['Off-white', 'Azul claro'],
    },
  },
  {
    id: 'prod-07',
    slug: 'kimono-brisa-off',
    name: 'Kimono Brisa Off',
    brand: 'Lenny',
    category: 'roupas',
    price: 359.9,
    image: '/images/short-masc-2.jpg',
    images: ['/images/short-masc-2.jpg', '/images/academia-3.jpg', '/images/blusa-1.jpg'],
    available: true,
    variants: {
      sizes: ['P', 'M', 'G', 'GG'],
      colors: ['Off-white', 'Bege'],
    },
  },
  {
    id: 'prod-08',
    slug: 'bolsa-palha-areia',
    name: 'Bolsa Palha Areia',
    brand: 'Arezzo',
    category: 'acessorios',
    price: 189.9,
    image: '/images/bolsa-1.jpg',
    images: ['/images/bolsa-1.jpg', '/images/meias-acessorios.jpg', '/images/bolsa-2.jpg'],
    available: true,
    variants: {
      sizes: [],
      colors: ['Areia', 'Caramelo'],
    },
  },
  {
    id: 'prod-09',
    slug: 'chapeu-palha-costa',
    name: 'Chapéu de Palha Costa',
    brand: 'Cocci',
    category: 'acessorios',
    price: 149.9,
    image: '/images/bolsa-2.jpg',
    images: ['/images/bolsa-2.jpg', '/images/meias-acessorios.jpg', '/images/meias.jpg'],
    available: true,
    variants: {
      sizes: [],
      colors: [],
    },
  },
  {
    id: 'prod-10',
    slug: 'oculos-luna-preto',
    name: 'Óculos Luna Preto',
    brand: 'Zahara',
    category: 'acessorios',
    price: 219.9,
    image: '/images/meias-3.jpg',
    images: ['/images/meias-3.jpg', '/images/meias.jpg', '/images/bolsa-1.jpg'],
    available: true,
    variants: {
      sizes: [],
      colors: ['Preto', 'Tartaruga'],
    },
  },
]

const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export const formatPrice = (price: number) => priceFormatter.format(price)

export const normalizeSlug = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const getAllProducts = () => [...products]

export const getProductBySlug = (slug: string) =>
  products.find((product) => normalizeSlug(product.slug) === normalizeSlug(slug))

export const getProductsByCategory = (slug: string) =>
  products.filter((product) => normalizeSlug(product.category) === normalizeSlug(slug))

export const getProductsByBrand = (slug: string) =>
  products.filter((product) => normalizeSlug(product.brand) === normalizeSlug(slug))

const getProductIndex = (product: Product) => Number(product.id.split('-')[1]) || 0

export const sortProducts = (items: Product[], sortBy: ProductSortKey) => {
  const sorted = [...items]

  switch (sortBy) {
    case 'recentes':
      return sorted.sort((a, b) => getProductIndex(b) - getProductIndex(a))
    case 'preco-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'preco-desc':
      return sorted.sort((a, b) => b.price - a.price)
    default:
      return sorted
  }
}
