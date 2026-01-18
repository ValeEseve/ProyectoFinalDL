import React from 'react'
import Header from '../components/Header'
import FeaturedPrints from '../components/FeaturedPrints'
import FeaturedArtists from '../components/FeaturedArtists'

const HomePage = () => {
  return (
    <main>
      <Header/>
      <FeaturedPrints/>
      <FeaturedArtists/>
    </main>
  )
}

export default HomePage
