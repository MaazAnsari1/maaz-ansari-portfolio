import React from 'react';
import "./LandingPage.css";
import HeroSection from '../../Components/HeroSection/HeroSection';
import ServicesSection from '../../Components/ServicesSection/ServicesSection';
import SkillSection from '../../Components/SkillSection/SkillSection';

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <SkillSection />
    </>
  )
}

export default LandingPage;