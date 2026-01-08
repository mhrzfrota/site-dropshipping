import React from 'react'
import { Outlet } from 'react-router-dom'
import CartDrawer from '../components/CartDrawer'
import Footer from '../components/Footer'
import TopBar from '../components/TopBar'

const SiteLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-brand-sand">
      <TopBar />
      <main className="flex-1 pt-20 md:pt-24">
        <Outlet />
      </main>
      <CartDrawer />
      <a
        href="https://wa.me/5511934942311"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-6 right-6 z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
      >
        <svg viewBox="0 0 32 32" className="h-6 w-6" fill="currentColor" aria-hidden="true">
          <path d="M19.11 17.91c-0.27-0.13-1.6-0.79-1.85-0.88-0.25-0.09-0.43-0.13-0.61 0.13s-0.7 0.88-0.86 1.06c-0.16 0.18-0.31 0.2-0.58 0.07s-1.13-0.42-2.16-1.33c-0.8-0.71-1.34-1.58-1.5-1.85c-0.16-0.27-0.02-0.42 0.12-0.55c0.12-0.12 0.27-0.31 0.4-0.46c0.13-0.16 0.18-0.27 0.27-0.44s0.04-0.33-0.02-0.46c-0.07-0.13-0.61-1.47-0.83-2.02c-0.22-0.53-0.44-0.46-0.61-0.47h-0.52c-0.18 0-0.46 0.07-0.7 0.33c-0.24 0.27-0.92 0.9-0.92 2.19s0.94 2.54 1.07 2.72c0.13 0.18 1.85 2.83 4.49 3.97c0.63 0.27 1.12 0.44 1.5 0.56c0.63 0.2 1.2 0.17 1.65 0.1c0.5-0.08 1.6-0.65 1.83-1.28c0.23-0.63 0.23-1.17 0.16-1.28c-0.07-0.11-0.25-0.18-0.52-0.31z" />
          <path d="M26.67 5.33A13.2 13.2 0 0 0 16 2.67C8.18 2.67 1.83 9.02 1.83 16.84c0 2.5 0.65 4.95 1.9 7.11l-1.4 5.72l5.87-1.54a13.97 13.97 0 0 0 7.79 2.35h0.01c7.82 0 14.17-6.35 14.17-14.17c0-3.78-1.48-7.33-4.17-10.98zM16 27.33h-0.01c-2.23 0-4.41-0.6-6.33-1.73l-0.45-0.27l-3.48 0.91l0.93-3.39l-0.29-0.49a11.12 11.12 0 0 1-1.7-5.52c0-6.13 4.99-11.12 11.12-11.12c2.97 0 5.77 1.16 7.87 3.26c2.1 2.1 3.25 4.9 3.25 7.86c0 6.13-4.99 11.12-11.12 11.12z" />
        </svg>
      </a>
      <Footer />
    </div>
  )
}

export default SiteLayout
