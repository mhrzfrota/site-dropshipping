export type Category = {
  slug: string
  label: string
  image: string
}

export type Brand = {
  slug: string
  label: string
}

export type Product = {
  id: string
  slug: string
  title: string
  description: string
  price: string
  installment: string
  image: string
  category: string
  brand: string
  brandSlug: string
  isNew?: boolean
}

export const categories: Category[] = [
  {
    slug: 'biquinis',
    label: 'Biquínis',
    image: '/images/cat-biquinis.jpg',
  },
  {
    slug: 'maios',
    label: 'Maiôs',
    image: '/images/cat-maios.jpg',
  },
  {
    slug: 'roupas',
    label: 'Roupas',
    image: '/images/cat-roupas.jpg',
  },
  {
    slug: 'acessorios',
    label: 'Acessórios',
    image: '/images/cat-acessorios.jpg',
  },
]

export const brands: Brand[] = [
  { slug: 'mar-mov', label: 'Mar&Mov' },
  { slug: 'brisa', label: 'Brisa' },
  { slug: 'atlantica', label: 'Atlântica' },
  { slug: 'onda', label: 'Onda' },
  { slug: 'vento', label: 'Vento' },
  { slug: 'marina', label: 'Marina' },
]

export const products: Product[] = [
  {
    id: 'look-01',
    slug: 'biquini-faixa-perolas',
    title: 'Biquíni Sutiã Faixa Pérolas',
    description: 'Top faixa com brilho suave e acabamento artesanal.',
    price: 'R$ 499,00',
    installment: 'ou 2x de R$ 249,50',
    image: '/images/launch-1.jpg',
    category: 'biquinis',
    brand: 'Mar&Mov',
    brandSlug: 'mar-mov',
    isNew: true,
  },
  {
    id: 'look-02',
    slug: 'maio-alca-perolas',
    title: 'Maiô Alça Pérolas',
    description: 'Maiô elegante com alças delicadas e modelagem firme.',
    price: 'R$ 799,00',
    installment: 'ou 4x de R$ 199,75',
    image: '/images/launch-2.jpg',
    category: 'maios',
    brand: 'Atlântica',
    brandSlug: 'atlantica',
    isNew: true,
  },
  {
    id: 'look-03',
    slug: 'biquini-cortininha-alongado',
    title: 'Biquíni Sutiã Cortininha Alongado',
    description: 'Cortininha alongado para ajuste perfeito e leveza.',
    price: 'R$ 349,00',
    installment: 'ou 2x de R$ 174,50',
    image: '/images/launch-3.jpg',
    category: 'biquinis',
    brand: 'Brisa',
    brandSlug: 'brisa',
    isNew: true,
  },
  {
    id: 'look-04',
    slug: 'vestido-curto-leme-preto',
    title: 'Vestido Curto Leme Preto',
    description: 'Vestido leve para praia e cidade, com caimento fluido.',
    price: 'R$ 1.299,00',
    installment: 'ou 6x de R$ 216,50',
    image: '/images/launch-4.jpg',
    category: 'roupas',
    brand: 'Marina',
    brandSlug: 'marina',
    isNew: true,
  },
  {
    id: 'look-05',
    slug: 'maio-recorte-minimal',
    title: 'Maiô Recorte Minimal',
    description: 'Recortes minimalistas e tecido com toque macio.',
    price: 'R$ 729,00',
    installment: 'ou 3x de R$ 243,00',
    image: '/images/launch-5.jpg',
    category: 'maios',
    brand: 'Onda',
    brandSlug: 'onda',
    isNew: true,
  },
  {
    id: 'look-06',
    slug: 'saida-linho-brisa',
    title: 'Saída de Linho Brisa',
    description: 'Saída ampla em linho com detalhes de amarração.',
    price: 'R$ 459,00',
    installment: 'ou 3x de R$ 153,00',
    image: '/images/cat-roupas.jpg',
    category: 'roupas',
    brand: 'Vento',
    brandSlug: 'vento',
  },
  {
    id: 'look-07',
    slug: 'bolsa-palha-areia',
    title: 'Bolsa de Palha Areia',
    description: 'Acessório artesanal perfeito para a rotina de praia.',
    price: 'R$ 189,00',
    installment: 'ou 2x de R$ 94,50',
    image: '/images/cat-acessorios.jpg',
    category: 'acessorios',
    brand: 'Brisa',
    brandSlug: 'brisa',
  },
  {
    id: 'look-08',
    slug: 'biquini-tomara-que-caia',
    title: 'Biquíni Tomara que Caia',
    description: 'Modelagem clean com sustentação e conforto.',
    price: 'R$ 389,00',
    installment: 'ou 2x de R$ 194,50',
    image: '/images/cat-biquinis.jpg',
    category: 'biquinis',
    brand: 'Mar&Mov',
    brandSlug: 'mar-mov',
  },
]
