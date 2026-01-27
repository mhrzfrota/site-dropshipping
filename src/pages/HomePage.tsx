import React from 'react'
import BenefitsStripSection from '../components/BenefitsStripSection'
import HeroSection from '../components/HeroSection'
import HighlightsSection from '../components/HighlightsSection'
import NewArrivalsSection from '../components/NewArrivalsSection'
import RhythmSection from '../components/RhythmSection'

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <HighlightsSection />
      <NewArrivalsSection />
      <RhythmSection />
      <BenefitsStripSection />
    </>
  )
}

export default HomePage
