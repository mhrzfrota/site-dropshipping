import React from 'react'
import HeroSection from './components/HeroSection'
import HighlightsSection from './components/HighlightsSection'
import NewArrivalsSection from './components/NewArrivalsSection'
import BrandsSection from './components/BrandsSection'
import TopBar from './components/TopBar'

const App: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-brand-sand">
      <TopBar />
      <main className="flex-1">
        <HeroSection />
        <HighlightsSection />
        <NewArrivalsSection />
        <BrandsSection />
      </main>
    </div>
  )
}

export default App
