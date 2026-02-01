import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CardPrint from '../components/CardPrint'
import "../styles/ArtistDetailPage.css"
import { ArtistContext } from '../context/ArtistContext'
import Masonry from 'react-masonry-css'

const ArtistDetailPage = () => {
  const { slug } = useParams()
  const { fetchArtistBySlug, fetchPrintsBySlug, selectedArtist, artistPrints, loading } = useContext(ArtistContext)

  useEffect(() => {
    if (slug) {
      fetchArtistBySlug(slug)
      fetchPrintsBySlug(slug)
    }
  }, [slug])

  if (loading || !selectedArtist) {
    return <p>Loading artist...</p>;
  }
  console.log("Descripcion artista: ", selectedArtist.description)

   const breakpointColumns = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1}

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
            {artistPrints.length > 0 ? (
            <Masonry
              breakpointCols={breakpointColumns}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {artistPrints.map((print) => (
                <CardPrint key={print.id} print={print} artist={selectedArtist} />
              ))}
            </Masonry>
          ) : (
            <p>No prints available yet.</p>
          )}
        </section>
      </div>
    </main>
  )
}

export default ArtistDetailPage
