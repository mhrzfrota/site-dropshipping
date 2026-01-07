import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { categoryMeta, formatPrice, getProductBySlug, normalizeSlug, type ProductCategory } from '../data/products'

const fallbackImage = '/images/blusa-1.jpg'

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams()
  const product = slug ? getProductBySlug(slug) : undefined
  const categoryInfo = product ? categoryMeta[product.category] : undefined
  const { addItem, openCart } = useCart()
  const { showToast } = useToast()

  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedImage, setSelectedImage] = useState(fallbackImage)

  const galleryImages = useMemo(() => {
    if (!product) return [fallbackImage]
    const rawImages = product.images?.length ? product.images : [product.image]
    const uniqueImages = Array.from(new Set(rawImages.filter(Boolean)))
    return uniqueImages.length ? uniqueImages : [fallbackImage]
  }, [product])

  useEffect(() => {
    if (!product) return
    setSelectedSize('')
    setSelectedColor('')
    setSelectedImage(galleryImages[0] ?? product.image)
  }, [product, galleryImages])

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget
    if (target.dataset.fallbackApplied) return
    target.dataset.fallbackApplied = 'true'
    target.src = fallbackImage
  }

  const handleSelectImage = (image: string) => {
    setSelectedImage(image)
  }

  if (!product) {
    return (
      <section className="bg-brand-sand py-12">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-xs font-semibold tracking-[0.12em] text-stone-600">Produto</p>
          <h1 className="mt-3 font-display text-3xl font-black text-stone-800">Produto não encontrado</h1>
          <p className="mt-2 text-sm text-stone-600">Confira outras opções na vitrine completa.</p>
          <Link
            to="/produtos"
            className="btn-primary mt-6 inline-flex items-center gap-2"
          >
            Ver todos os produtos
          </Link>
        </div>
      </section>
    )
  }

  const hasSizes = product.variants.sizes.length > 0
  const hasColors = product.variants.colors.length > 0
  const hasVariants = hasSizes || hasColors
  const missingSize = hasSizes && !selectedSize
  const missingColor = hasColors && !selectedColor
  const canAddToCart = !(missingSize || missingColor)
  const isBikini = product.category === 'biquinis'
  const statusLabel = product.available ? 'Disponível' : 'Esgotado'
  const categoryLabelMap: Record<ProductCategory, string> = {
    biquinis: 'Biquíni conjunto',
    maios: 'Maiô',
    roupas: 'Roupa casual',
    acessorios: 'Acessório',
  }
  const materialMap: Record<ProductCategory, string> = {
    biquinis: 'Poliamida com elastano para toque macio.',
    maios: 'Poliamida com elastano de toque confortável.',
    roupas: 'Malha leve com elastano.',
    acessorios: 'Materiais mistos com acabamento premium.',
  }
  const fitMap: Record<ProductCategory, string> = {
    biquinis: 'Modelagem confortável com ajuste suave.',
    maios: 'Modelagem confortável que acompanha o movimento.',
    roupas: 'Caimento leve e confortável para o dia a dia.',
    acessorios: 'Acabamento confortável para uso prolongado.',
  }
  const shortDescription = (() => {
    switch (product.category) {
      case 'biquinis':
        return `${product.name} é um conjunto pensado para praia e piscina, com visual elegante e toque confortável. Ideal para dias de sol e momentos de lazer à beira-mar.`
      case 'maios':
        return `${product.name} combina cobertura elegante com estilo beach-to-casual. Perfeito para praia e também para usar como body em produções casuais.`
      case 'roupas':
        return `${product.name} é uma peça leve para pós-praia, treinos leves e looks casuais do dia a dia. Caimento fluido que acompanha o movimento.`
      case 'acessorios':
        return `${product.name} finaliza o look com personalidade em dias de praia e momentos casuais. Um detalhe prático que eleva qualquer produção.`
      default:
        return `${product.name} traz estilo e conforto para compor produções versáteis em diferentes ocasiões.`
    }
  })()

  const warningMessage = () => {
    if (!hasVariants || canAddToCart) return null
    if (missingSize && missingColor) return 'Selecione o tamanho e a cor para continuar.'
    if (missingSize) return 'Selecione o tamanho para continuar.'
    if (missingColor) return 'Selecione a cor para continuar.'
    return null
  }

  const warningText = hasVariants && !canAddToCart ? warningMessage() : null

  const handleAddToCart = () => {
    if (!canAddToCart) return
    addItem(product, selectedSize || undefined, selectedColor || undefined)
    showToast('Produto adicionado ao carrinho.', {
      action: {
        label: 'Ver carrinho',
        onClick: openCart,
      },
    })
  }

  return (
    <section className="bg-brand-sand pb-16 pt-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold tracking-[0.12em] text-stone-600">
          <Link to="/" className="transition hover:text-stone-700">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link to="/produtos" className="transition hover:text-stone-700">
            Produtos
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-stone-700">{product.name}</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-4">
            <div className="group overflow-hidden rounded-3xl bg-white shadow-lg">
              <img
                src={selectedImage}
                alt={product.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                onError={handleImageError}
                loading="eager"
                decoding="async"
              />
            </div>
            {galleryImages.length > 1 && (
              <div className="flex flex-wrap gap-3">
                {galleryImages.map((image) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => handleSelectImage(image)}
                    onMouseEnter={() => handleSelectImage(image)}
                    onFocus={() => handleSelectImage(image)}
                    className={`h-20 w-20 overflow-hidden rounded-2xl border bg-white shadow-sm transition ${
                      selectedImage === image
                        ? 'border-brand-deep ring-2 ring-brand-aqua/40'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                    aria-label="Selecionar imagem do produto"
                  >
                    <img
                      src={image}
                      alt="Miniatura do produto"
                      className="h-full w-full object-cover"
                      onError={handleImageError}
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-[0.12em]">
                <span className={`badge ${product.available ? 'badge-success' : 'badge-danger'}`}>
                  {statusLabel}
                </span>
                {isBikini && <span className="badge badge-soft">Conjunto</span>}
              </div>
              <h1 className="font-display text-3xl font-black text-stone-800 sm:text-4xl">{product.name}</h1>
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  to={`/marca/${normalizeSlug(product.brand)}`}
                  className="badge badge-neutral transition hover:text-brand-deep"
                >
                  {product.brand}
                </Link>
                {categoryInfo ? (
                  <Link
                    to={`/categoria/${product.category}`}
                    className="badge badge-neutral transition hover:text-brand-deep"
                  >
                    {categoryInfo.label}
                  </Link>
                ) : (
                  <span className="badge badge-neutral">Categoria especial</span>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white/90 px-5 py-4">
              <p className="text-3xl font-extrabold text-stone-900">{formatPrice(product.price)}</p>
              <p className="text-sm text-stone-600">Pagamento em até 6x sem juros.</p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white/90 px-5 py-5">
              <p className="text-xs font-semibold tracking-[0.12em] text-stone-600">Descrição</p>
              <p className="mt-3 text-base text-stone-700">{shortDescription}</p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white/90 px-5 py-5">
              <p className="text-xs font-semibold tracking-[0.12em] text-stone-600">Detalhes do produto</p>
              <ul className="mt-4 space-y-2 text-sm text-stone-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-brand-aqua/70" aria-hidden="true" />
                  <span>
                    <span className="font-semibold text-stone-800">Material:</span> {materialMap[product.category]}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-brand-aqua/70" aria-hidden="true" />
                  <span>
                    <span className="font-semibold text-stone-800">Conforto e modelagem:</span>{' '}
                    {fitMap[product.category]}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-brand-aqua/70" aria-hidden="true" />
                  <span>
                    <span className="font-semibold text-stone-800">Categoria:</span>{' '}
                    {categoryLabelMap[product.category]}
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white/90 px-5 py-5">
              <p className="text-xs font-semibold tracking-[0.12em] text-stone-600">Guia de tamanho</p>
              <div className="mt-4 overflow-hidden rounded-2xl border border-stone-200">
                <table className="w-full text-center text-xs text-stone-700 sm:text-sm">
                  <thead className="bg-stone-50 text-stone-600">
                    <tr>
                      <th className="px-3 py-3 font-semibold">P</th>
                      <th className="px-3 py-3 font-semibold">M</th>
                      <th className="px-3 py-3 font-semibold">G</th>
                      <th className="px-3 py-3 font-semibold">GG</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="px-3 py-3">Regular</td>
                      <td className="px-3 py-3">Regular</td>
                      <td className="px-3 py-3">Regular</td>
                      <td className="px-3 py-3">Regular</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-stone-600">Modelagem padrão.</p>
            </div>

            {hasVariants && (
              <div className="rounded-2xl border border-stone-200 bg-white/90 px-5 py-5">
                <h2 className="text-sm font-semibold tracking-[0.12em] text-stone-600">Escolha suas opções</h2>
                <div className="mt-4 space-y-5">
                  {hasSizes && (
                    <div>
                      <p className="text-sm font-semibold text-stone-700">Tamanho</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {product.variants.sizes.map((size) => {
                          const isSelected = selectedSize === size
                          return (
                            <button
                              key={size}
                              type="button"
                              onClick={() => setSelectedSize(size)}
                              aria-pressed={isSelected}
                              className={`min-w-[56px] rounded-full border px-4 py-2 text-sm font-semibold transition ${
                                isSelected
                                  ? 'border-brand-deep bg-brand-deep text-white shadow-soft'
                                  : 'border-stone-200 bg-white text-stone-700 hover:border-brand-deep'
                              } ${warningText && missingSize ? 'border-rose-300' : ''} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua/40`}
                            >
                              {size}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                  {hasColors && (
                    <div>
                      <p className="text-sm font-semibold text-stone-700">Cor</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {product.variants.colors.map((color) => {
                          const isSelected = selectedColor === color
                          return (
                            <button
                              key={color}
                              type="button"
                              onClick={() => setSelectedColor(color)}
                              aria-pressed={isSelected}
                              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                                isSelected
                                  ? 'border-brand-deep bg-brand-deep text-white shadow-soft'
                                  : 'border-stone-200 bg-white text-stone-700 hover:border-brand-deep'
                              } ${warningText && missingColor ? 'border-rose-300' : ''} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua/40`}
                            >
                              {color}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
                {warningText && (
                  <p className="mt-3 text-xs font-semibold text-rose-600" aria-live="polite">
                    {warningText}
                  </p>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!canAddToCart}
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
              >
                Adicionar ao carrinho
              </button>
              <Link
                to="/produtos"
                className="btn-secondary"
              >
                Continuar navegando
              </Link>
            </div>

            <div className="grid gap-3 rounded-2xl border border-stone-200 bg-white/70 px-5 py-4 text-sm text-stone-600 sm:grid-cols-3">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-aqua/20 text-brand-deep">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path
                      d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <p className="font-semibold text-stone-700">Envio para todo Brasil</p>
                  <p>Receba em casa ou retire na loja.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-aqua/20 text-brand-deep">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path
                      d="M4 12a7 7 0 0 1 12-4l2-2v6h-6l2-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <p className="font-semibold text-stone-700">Troca garantida</p>
                  <p>Até 7 dias para trocar ou devolver.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-aqua/20 text-brand-deep">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path
                      d="M4 5h16v11a2 2 0 0 1-2 2H8l-4 4V7a2 2 0 0 1 2-2Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <p className="font-semibold text-stone-700">Atendimento via WhatsApp</p>
                  <p>Fale com nossa equipe quando quiser.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetailPage
