import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { PrintContext } from '../context/PrintContext'
import CardPrint from '../components/CardPrint'
import "../styles/ArtistDetailPage.css"
import { ArtistContext } from '../context/ArtistContext'

const ArtistDetailPage = () => {
  const { slug } = useParams()
  const { selectedArtist, fetchArtistBySlug, loading } = useContext(ArtistContext)
  const { prints } = useContext(PrintContext)

  useEffect(() => {
    if (slug) {
      fetchArtistBySlug(slug)
    }
  }, [slug])

  const artistPrints = selectedArtist 
    ? prints.filter((p) => p.artist_id === selectedArtist.id)
    : []

  if (loading || !selectedArtist) {
    return <p>Loading artist...</p>;
  }

  console.log("Descripcion artista: ", selectedArtist.description)

  return (
        <main>
      <div className='container-fluid d-flex gap-4 justify-content-center mt-5'>
        <section className='d-flex flex-column gap-5 user-details'>
          <img 
            className='rounded-circle' 
            src={selectedArtist.profile_img_url} 
            alt={selectedArtist.name} 
          />
          <h2>{selectedArtist.name}</h2>
        </section>
        <section className='user-prints'>
          <p>{selectedArtist.bio}</p>
          <h4 className='text-center mb-3'>Prints by the artist</h4>
          <div className='d-flex flex-wrap gap-1 justify-content-center'>
            {artistPrints.length > 0 ? (
              artistPrints.map((print) => (
                <CardPrint key={print.id} print={print} artist={selectedArtist} />
              ))
            ) : (
              <p>No prints available yet.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

export default ArtistDetailPage
