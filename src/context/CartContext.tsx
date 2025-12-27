import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import type { Product } from '../data/products'

export type CartItem = {
  id: string
  productId: string
  slug: string
  name: string
  brand: string
  image: string
  price: number
  qty: number
  size?: string
  color?: string
}

type CartState = {
  items: CartItem[]
  isOpen: boolean
}

type AddItemPayload = {
  product: Product
  size?: string
  color?: string
  qty?: number
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: AddItemPayload }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QTY'; payload: { id: string; qty: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'TOGGLE_CART' }

type CartContextValue = {
  items: CartItem[]
  isOpen: boolean
  subtotal: number
  totalItems: number
  addItem: (product: Product, size?: string, color?: string) => void
  removeItem: (itemId: string) => void
  updateQty: (itemId: string, qty: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

const CART_STORAGE_KEY = 'marmov-cart'

const buildItemId = (product: Product, size?: string, color?: string) => {
  const normalizedSize = size?.trim() || 'unico'
  const normalizedColor = color?.trim() || 'unico'
  return `${product.slug}|${normalizedSize}|${normalizedColor}`
}

const readStoredItems = (): CartItem[] => {
  if (typeof window === 'undefined') return []
  const raw = window.localStorage.getItem(CART_STORAGE_KEY)
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((item) => item && typeof item.id === 'string')
  } catch {
    return []
  }
}

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, size, color, qty } = action.payload
      const itemId = buildItemId(product, size, color)
      const existing = state.items.find((item) => item.id === itemId)
      const nextQty = qty ?? 1

      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, qty: item.qty + nextQty } : item,
          ),
        }
      }

      const newItem: CartItem = {
        id: itemId,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        image: product.image,
        price: product.price,
        qty: nextQty,
        size: size || undefined,
        color: color || undefined,
      }

      return {
        ...state,
        items: [...state.items, newItem],
      }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((item) => item.id !== action.payload.id) }
    case 'UPDATE_QTY': {
      if (action.payload.qty <= 0) {
        return { ...state, items: state.items.filter((item) => item.id !== action.payload.id) }
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, qty: action.payload.qty } : item,
        ),
      }
    }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    case 'OPEN_CART':
      return { ...state, isOpen: true }
    case 'CLOSE_CART':
      return { ...state, isOpen: false }
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }
    default:
      return state
  }
}

const initialState: CartState = {
  items: [],
  isOpen: false,
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, (base) => ({
    ...base,
    items: readStoredItems(),
  }))

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items))
  }, [state.items])

  const subtotal = useMemo(
    () => state.items.reduce((acc, item) => acc + item.price * item.qty, 0),
    [state.items],
  )
  const totalItems = useMemo(
    () => state.items.reduce((acc, item) => acc + item.qty, 0),
    [state.items],
  )

  const value: CartContextValue = {
    items: state.items,
    isOpen: state.isOpen,
    subtotal,
    totalItems,
    addItem: (product, size, color) => dispatch({ type: 'ADD_ITEM', payload: { product, size, color } }),
    removeItem: (itemId) => dispatch({ type: 'REMOVE_ITEM', payload: { id: itemId } }),
    updateQty: (itemId, qty) => dispatch({ type: 'UPDATE_QTY', payload: { id: itemId, qty } }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    openCart: () => dispatch({ type: 'OPEN_CART' }),
    closeCart: () => dispatch({ type: 'CLOSE_CART' }),
    toggleCart: () => dispatch({ type: 'TOGGLE_CART' }),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
