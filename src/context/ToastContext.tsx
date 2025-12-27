import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

type ToastAction = {
  label: string
  onClick: () => void
}

type ToastOptions = {
  action?: ToastAction
  durationMs?: number
}

type ToastState = {
  id: number
  message: string
  action?: ToastAction
  durationMs: number
}

type ToastContextValue = {
  showToast: (message: string, options?: ToastOptions) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

const DEFAULT_DURATION = 3200

const ToastViewport: React.FC<{
  toast: ToastState | null
  onClose: () => void
}> = ({ toast, onClose }) => {
  if (!toast) return null

  return (
    <div className="fixed bottom-6 right-4 z-[90] flex w-full max-w-sm items-center justify-end sm:right-6">
      <div
        role="status"
        aria-live="polite"
        className="flex w-full items-start gap-3 rounded-2xl border border-brand-aqua/40 bg-white px-4 py-3 shadow-xl"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-aqua/20 text-brand-deep">
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path
              d="M5 12l4 4 10-10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div className="flex flex-1 flex-col gap-2">
          <p className="text-sm font-semibold text-stone-800">{toast.message}</p>
          {toast.action && (
            <button
              type="button"
              onClick={() => {
                toast.action?.onClick()
                onClose()
              }}
              className="self-start text-xs font-semibold uppercase tracking-[0.12em] text-brand-deep transition hover:text-brand-ocean"
            >
              {toast.action.label}
            </button>
          )}
        </div>
        <button
          type="button"
          aria-label="Fechar aviso"
          onClick={onClose}
          className="rounded-full p-1 text-stone-400 transition hover:text-stone-600"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6l-12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<ToastState | null>(null)

  const showToast = useCallback((message: string, options?: ToastOptions) => {
    setToast({
      id: Date.now(),
      message,
      action: options?.action,
      durationMs: options?.durationMs ?? DEFAULT_DURATION,
    })
  }, [])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), toast.durationMs)
    return () => window.clearTimeout(timer)
  }, [toast])

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toast={toast} onClose={() => setToast(null)} />
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}
