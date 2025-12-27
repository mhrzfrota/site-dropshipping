import React from 'react'
import BrandsSection from '../components/BrandsSection'
import HeroSection from '../components/HeroSection'
import HighlightsSection from '../components/HighlightsSection'
import NewArrivalsSection from '../components/NewArrivalsSection'

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <HighlightsSection />
      <NewArrivalsSection />
      <BrandsSection />
    </>
  )
}

export default HomePage
