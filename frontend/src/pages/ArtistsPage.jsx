import React, { useContext } from 'react'
import CardArtist from '../components/CardArtist'
import { ArtistContext } from '../context/ArtistContext'

const ArtistsPage = () => {
  const {artists} = useContext(ArtistContext)

  return (
    <main>
      <section className='d-flex justify-content-center flex-wrap gap-5'>
      {artists.map((artist)=>(
        <CardArtist key={artist.id} artist={artist} />
      ))}
      </section>
    </main>
  )
}

export default ArtistsPage
