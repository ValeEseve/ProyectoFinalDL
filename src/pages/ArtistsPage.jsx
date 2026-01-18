import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import CardArtist from '../components/CardArtist'

const ArtistsPage = () => {
  const {users} = useContext(UserContext)

  return (
    <main>
      <section className='d-flex justify-content-center flex-wrap gap-5'>
      {users.map((artist)=>(
        <CardArtist key={artist.id} artist={artist} />
      ))}
      </section>
    </main>
  )
}

export default ArtistsPage
