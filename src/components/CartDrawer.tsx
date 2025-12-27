import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, removeItem, updateQty, subtotal, totalItems, clearCart } = useCart()

  const whatsappLink = useMemo(() => {
    const header = 'Olá! Quero finalizar meu pedido:'
    const lines = items.map((item) => {
      const variations = [
        item.size ? `Tamanho ${item.size}` : null,
        item.color ? `Cor ${item.color}` : null,
      ]
        .filter(Boolean)
        .join(' • ')
      const lineTotal = formatPrice(item.price * item.qty)
      return `- ${item.qty}x ${item.name}${variations ? ` (${variations})` : ''} — ${lineTotal}`
    })
    const footer = `Subtotal: ${formatPrice(subtotal)}`
    const message = [header, ...lines, footer].join('\n')
    return `https://wa.me/5599999999999?text=${encodeURIComponent(message)}`
  }, [items, subtotal])

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
        onClick={closeCart}
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Carrinho</p>
            <h2 className="text-xl font-bold text-stone-800">Seu carrinho</h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
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
                onClick={closeCart}
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
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className={`mt-4 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] transition ${
              items.length
                ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                : 'cursor-not-allowed bg-stone-200 text-stone-500'
            }`}
            aria-disabled={items.length === 0}
            onClick={(event) => {
              if (!items.length) event.preventDefault()
            }}
          >
            Finalizar no WhatsApp
          </a>
        </div>
      </aside>
    </div>
  )
}

export default CartDrawer
