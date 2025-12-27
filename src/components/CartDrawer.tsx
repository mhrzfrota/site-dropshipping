import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, removeItem, updateQty, subtotal, totalItems, clearCart } = useCart()
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [formError, setFormError] = useState('')

  useEffect(() => {
    if (!isOpen) {
      setIsCheckoutOpen(false)
      setCustomerName('')
      setPaymentMethod('')
      setFormError('')
    }
  }, [isOpen])

  useEffect(() => {
    if (items.length === 0) {
      setIsCheckoutOpen(false)
    }
  }, [items.length])

  const formatCurrency = (value: number) => formatPrice(value).replace(/\u00a0/g, ' ')

  const buildVariationLabel = (item: (typeof items)[number]) => {
    const parts = [item.size ? `Tamanho ${item.size}` : null, item.color ? `Cor ${item.color}` : null].filter(
      Boolean,
    )
    return parts.length ? parts.join(' / ') : 'Sem variação'
  }

  const buildWhatsappMessage = (name: string, payment: string) => {
    const lines = items.map((item) => {
      const variations = buildVariationLabel(item)
      const lineTotal = formatCurrency(item.price * item.qty)
      return `- ${item.name} (${item.brand}) | ${variations} | Qtd: ${item.qty} | ${lineTotal}`
    })

    const messageLines = [
      `Olá! Meu nome é ${name} 😊`,
      'Quero finalizar um pedido na Mar&Mov 💙',
      '',
      '🛍️ Itens:',
      ...lines,
      '',
      `💰 Total estimado: ${formatCurrency(subtotal)}`,
      `💳 Pagamento: ${payment}`,
      '',
      'Observação: Cupom MAR10 (primeira compra) — confirmar aplicação.',
      'Aguardo retorno para finalizar 😊',
    ]

    return messageLines.join('\n')
  }

  const handleOpenCheckout = () => {
    if (!items.length) return
    setIsCheckoutOpen(true)
    setFormError('')
  }

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false)
    setCustomerName('')
    setPaymentMethod('')
    setFormError('')
  }

  const handleCloseDrawer = () => {
    handleCloseCheckout()
    closeCart()
  }

  const handleCheckoutSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedName = customerName.trim()

    if (!trimmedName || !paymentMethod) {
      setFormError('Informe seu nome e a forma de pagamento.')
      return
    }

    const message = buildWhatsappMessage(trimmedName, paymentMethod)
    const whatsappUrl = `https://wa.me/5511934942311?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    handleCloseCheckout()
  }

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget
    if (target.dataset.fallbackApplied) return
    target.dataset.fallbackApplied = 'true'
    target.src = '/images/cat-roupas.jpg'
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label="Fechar carrinho"
        className="absolute inset-0 bg-black/40"
        onClick={handleCloseDrawer}
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Carrinho</p>
            <h2 className="text-xl font-bold text-stone-800">Seu carrinho</h2>
          </div>
          <button
            type="button"
            onClick={handleCloseDrawer}
            className="rounded-full border border-stone-200 px-3 py-2 text-xs font-semibold uppercase text-stone-500 transition hover:border-stone-400 hover:text-stone-700"
          >
            Fechar
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-stone-200 bg-stone-50 px-5 py-8 text-center">
              <p className="text-sm font-semibold text-stone-700">Seu carrinho está vazio.</p>
              <p className="mt-2 text-sm text-stone-500">Explore os produtos e adicione seus favoritos.</p>
              <Link
                to="/produtos"
                onClick={handleCloseDrawer}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-deep px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-ocean"
              >
                Ver produtos
              </Link>
            </div>
          ) : (
            items.map((item) => {
              const variations = [
                item.size ? `Tamanho ${item.size}` : null,
                item.color ? `Cor ${item.color}` : null,
              ]
                .filter(Boolean)
                .join(' • ')

              return (
                <div key={item.id} className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-xl object-cover"
                      onError={handleImageError}
                    />
                    <div className="flex flex-1 flex-col gap-2">
                      <div>
                        <p className="text-sm font-semibold text-stone-800">{item.name}</p>
                        <p className="text-xs text-stone-500">{item.brand}</p>
                        {variations && <p className="text-xs text-stone-500">{variations}</p>}
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 text-sm font-semibold text-stone-600 transition hover:border-stone-400"
                            aria-label="Diminuir quantidade"
                          >
                            -
                          </button>
                          <span className="text-sm font-semibold text-stone-700">{item.qty}</span>
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 text-sm font-semibold text-stone-600 transition hover:border-stone-400"
                            aria-label="Aumentar quantidade"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-xs font-semibold uppercase text-rose-500 transition hover:text-rose-700"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm font-semibold text-stone-700">
                    <span>{formatPrice(item.price)}</span>
                    <span>{formatPrice(item.price * item.qty)}</span>
                  </div>
                </div>
              )
            })
          )}
        </div>

        <div className="border-t border-stone-200 px-6 py-5">
          <div className="flex items-center justify-between text-sm text-stone-600">
            <span>Itens ({totalItems})</span>
            <button
              type="button"
              onClick={clearCart}
              className="text-xs font-semibold uppercase text-stone-500 transition hover:text-stone-700"
              disabled={items.length === 0}
            >
              Limpar carrinho
            </button>
          </div>
          <div className="mt-3 flex items-center justify-between text-lg font-bold text-stone-800">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <button
            type="button"
            onClick={handleOpenCheckout}
            className={`mt-4 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] transition ${
              items.length
                ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                : 'cursor-not-allowed bg-stone-200 text-stone-500'
            }`}
            aria-disabled={items.length === 0}
            disabled={items.length === 0}
          >
            Finalizar no WhatsApp
          </button>
        </div>
      </aside>
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4 py-8">
          <button
            type="button"
            aria-label="Fechar checkout"
            className="absolute inset-0 bg-black/50"
            onClick={handleCloseCheckout}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
            className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-stone-200 px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">WhatsApp</p>
                <h3 id="checkout-title" className="text-lg font-bold text-stone-800">
                  Finalizar pedido
                </h3>
              </div>
              <button
                type="button"
                onClick={handleCloseCheckout}
                className="rounded-full border border-stone-200 px-3 py-2 text-xs font-semibold uppercase text-stone-500 transition hover:border-stone-400 hover:text-stone-700"
              >
                Fechar
              </button>
            </div>
            <form onSubmit={handleCheckoutSubmit} className="space-y-4 px-6 py-5">
              <div>
                <label htmlFor="checkout-name" className="text-sm font-semibold text-stone-700">
                  Nome
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  value={customerName}
                  onChange={(event) => {
                    setCustomerName(event.target.value)
                    setFormError('')
                  }}
                  placeholder="Seu nome completo"
                  className="mt-2 w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm text-stone-800 shadow-sm focus:border-brand-ocean focus:outline-none focus:ring-2 focus:ring-brand-ocean/30"
                />
              </div>
              <div>
                <label htmlFor="checkout-payment" className="text-sm font-semibold text-stone-700">
                  Forma de pagamento
                </label>
                <select
                  id="checkout-payment"
                  value={paymentMethod}
                  onChange={(event) => {
                    setPaymentMethod(event.target.value)
                    setFormError('')
                  }}
                  className="mt-2 w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800 shadow-sm focus:border-brand-ocean focus:outline-none focus:ring-2 focus:ring-brand-ocean/30"
                >
                  <option value="">Selecione</option>
                  <option value="Pix">Pix</option>
                  <option value="Cartão">Cartão</option>
                  <option value="Dinheiro">Dinheiro</option>
                </select>
              </div>
              {formError && (
                <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600">
                  {formError}
                </p>
              )}
              <p className="text-xs text-stone-500">
                Você será redirecionado para o WhatsApp com a mensagem pronta.
              </p>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  type="button"
                  onClick={handleCloseCheckout}
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-stone-200 px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-stone-500 transition hover:border-stone-400 hover:text-stone-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-emerald-600"
                >
                  Enviar no WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartDrawer
