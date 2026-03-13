import React from 'react'
import BenefitsStripSection from '../components/BenefitsStripSection'
import FeaturedProductsSection from '../components/FeaturedProductsSection'
import HeroSection from '../components/HeroSection'
import HighlightsSection from '../components/HighlightsSection'
import NewArrivalsSection from '../components/NewArrivalsSection'
import RhythmSection from '../components/RhythmSection'
import TestimonialsSection from '../components/TestimonialsSection'

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <BenefitsStripSection />
      <FeaturedProductsSection />
      <HighlightsSection />
      <TestimonialsSection />
      <NewArrivalsSection />
      <RhythmSection />
    </>
  )
}

export default HomePage
