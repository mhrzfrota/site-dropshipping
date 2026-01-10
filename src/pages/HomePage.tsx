import React from 'react'
import BrandsSection from '../components/BrandsSection'
import BenefitsStripSection from '../components/BenefitsStripSection'
import HeroSection from '../components/HeroSection'
import HighlightsSection from '../components/HighlightsSection'
import NewArrivalsSection from '../components/NewArrivalsSection'
import StoreInfoSection from '../components/StoreInfoSection'
import TrustSection from '../components/TrustSection'

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <HighlightsSection />
      <BrandsSection />
      <BenefitsStripSection />
      <NewArrivalsSection />
      <StoreInfoSection />
    </>
  )
}

export default HomePage
