import React from 'react'
import Header from '../components/Header'
import FeaturedPrints from '../components/FeaturedPrints'
import FeaturedArtists from '../components/FeaturedArtists'

const HomePage = () => {
  return (
    <div>
      <h1>HOME PAGE</h1>
      <Header/>
      <FeaturedPrints/>
      <FeaturedArtists/>
    </div>
  )
}

export default HomePage
