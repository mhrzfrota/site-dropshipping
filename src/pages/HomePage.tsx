import React from 'react'
import BrandsSection from '../components/BrandsSection'
import BenefitsStripSection from '../components/BenefitsStripSection'
import HeroSection from '../components/HeroSection'
import HighlightsSection from '../components/HighlightsSection'
import NewArrivalsSection from '../components/NewArrivalsSection'

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <HighlightsSection />
      <BrandsSection />
      <BenefitsStripSection />
      <NewArrivalsSection />
    </>
  )
}

export default HomePage
