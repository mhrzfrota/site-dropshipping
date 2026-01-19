import React from 'react'
import { Outlet } from 'react-router-dom'
import CartDrawer from '../components/CartDrawer'
import Footer from '../components/Footer'
import TopBar from '../components/TopBar'

const SiteLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-brand-sand">
      <TopBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <CartDrawer />
      <a
        href="https://wa.me/5511934942311"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-6 right-6 z-[60] flex h-12 w-12 items-center justify-center rounded-lg bg-[#1f6f1f] text-white shadow-lg transition hover:scale-105"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 4.5a7.5 7.5 0 0 0-6.5 11.2L4 20l4.5-1.4A7.5 7.5 0 1 0 12 4.5Z" />
          <path d="M9.2 9.5c.2-.3.4-.3.6-.3h.5c.2 0 .3.1.4.3l.5 1.1c.1.2.1.4 0 .6l-.4.5c-.1.1-.1.3 0 .5.3.5.9 1.1 1.4 1.4.2.1.4.1.5 0l.5-.4c.2-.1.4-.1.6 0l1.1.5c.2.1.3.3.3.5 0 .4-.2.9-.5 1.2-.3.3-.7.4-1.2.3-1.1-.2-2.4-1.1-3.3-2-.9-.9-1.8-2.2-2-3.3-.1-.5 0-.9.3-1.2Z" />
        </svg>
      </a>
      <Footer />
    </div>
  )
}

export default SiteLayout
