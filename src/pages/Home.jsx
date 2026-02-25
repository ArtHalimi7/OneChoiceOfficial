import React from 'react'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import FeaturedCollection from '../components/FeaturedCollection'
import TrendingMarquee from '../components/TrendingMarquee'
import EditorialBanner from '../components/EditorialBanner'

const Home = () => {
  return (
    <main>
      <Hero />
      <TrendingMarquee />
      <Categories />
      <FeaturedCollection />
      <EditorialBanner />
    </main>
  )
}

export default Home