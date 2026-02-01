import { useContext, useEffect, useState } from 'react'
import { PrintContext } from '../context/PrintContext'
import CardPrint from '../components/CardPrint'
import { ArtistContext } from '../context/ArtistContext'
import Masonry from 'react-masonry-css'

const PrintsPage = () => {
  const { prints } = useContext(PrintContext)
  const { artists } = useContext(ArtistContext)
  const [printsWithArtist, setPrintsWithArtist] = useState([])

  useEffect(() => {
    if (!prints.length || !artists.length) return;
    
    setPrintsWithArtist(
      prints.map(print => {
        const foundArtist = artists.find(a => a.id === print.artist_id);
        return {
          ...print,
          artist: foundArtist
        }
      })
    );
  }, [prints, artists]);

  const breakpointColumns = {
    default: 5,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <main>
      <h1 className='text-center my-4'>All Prints</h1>
      {printsWithArtist.length > 0 ? (
        <Masonry
          breakpointCols={breakpointColumns}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {printsWithArtist.map((print) => (
            <CardPrint 
              key={print.id} 
              print={print} 
              artist={print.artist} 
            />
          ))}
        </Masonry>
      ) : (
        <p className='text-center'>No prints available yet.</p>
      )}
    </main>
  )
}

export default PrintsPage