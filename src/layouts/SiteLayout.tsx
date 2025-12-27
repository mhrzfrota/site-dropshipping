import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import TopBar from '../components/TopBar'

const SiteLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-brand-sand">
      <TopBar />
      <main className="flex-1 pt-20 md:pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default SiteLayout
