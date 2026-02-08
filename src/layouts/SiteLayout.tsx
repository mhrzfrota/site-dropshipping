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
        href="https://wa.me/5581981894816"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-4 right-4 z-[80] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_18px_rgba(37,211,102,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_22px_rgba(37,211,102,0.55)] sm:bottom-6 sm:right-6"
      >
        <svg
          viewBox="0 0 448 512"
          className="h-8 w-8"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32C101.4 32 1.9 131.5 1.9 254c0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.5 224.1-222c0-59.3-25.2-115-67.1-157zM223.9 438.2h-.1c-33.4 0-65.7-8.9-93.6-25.6l-6.7-4l-69.8 18.3l18.6-67.9l-4.3-7c-18.5-29.7-28.2-63.9-28.2-99c0-102.7 83.6-186.3 186.4-186.3c49.8 0 96.6 19.4 131.9 54.7c35.3 35.3 54.6 82.2 54.6 132c0 102.7-83.9 184.8-186.6 184.8zm101.7-138.7c-5.6-2.8-33.1-16.3-38.3-18.1c-5.1-1.9-8.8-2.8-12.5 2.8c-3.7 5.6-14.3 18.1-17.6 21.8c-3.2 3.7-6.5 4.2-12.1 1.4c-33.3-16.7-55.3-29.8-77.4-67.7c-5.9-10.1 5.9-9.4 16.7-31.3c1.9-3.7.9-6.9-.5-9.7c-1.4-2.8-12.5-30.1-17.1-41.3c-4.5-10.8-9.1-9.3-12.5-9.5c-3.2-.2-6.9-.2-10.6-.2c-3.7 0-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3c0 27.3 19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8c35.1 15.2 48.8 16.5 66.3 13.9c10.7-1.6 33.1-13.5 37.8-26.5c4.6-13 4.6-24.1 3.2-26.5c-1.3-2.4-5-3.7-10.5-6.4z" />
        </svg>
      </a>
      <Footer />
    </div>
  )
}

export default SiteLayout
