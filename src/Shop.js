import React from 'react'
import HeroSection from './components/HeroSection/HeroSection'
import NewArrivals from "./components/NewArrivals/NewArrivals"
import WomenCategories from './components/WomenCategories/WomenCategories'
import MenCategories from './components/MenCategories/MenCategories'
import KidsCategories from './components/KidsCategories/KidsCategories'
import FooterSection from './components/FooterSection/FooterSection';
import InstaSection from './components/InsiderBar';

const Shop = () => {
  return (
    <>
    <HeroSection/>
    <NewArrivals/>
    <WomenCategories/>
    <MenCategories/>
    <KidsCategories/>
    <InstaSection/>
    <FooterSection/>
    </>
  )
}

export default Shop