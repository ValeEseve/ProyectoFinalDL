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
    console.log("📄 PrintsPage - prints:", prints.length);
    console.log("📄 PrintsPage - artists:", artists.length);
    
    if (!prints.length || !artists.length) {
      console.log("⚠️ PrintsPage - Waiting for data...");
      return;
    }

    const enrichedPrints = prints.map(print => {
      const foundArtist = artists.find(a => a.id === print.artist_id);
      console.log(`Print ${print.id} (${print.title}) - Artist ID: ${print.artist_id}, Found:`, foundArtist?.name);
      
      return {
        ...print,
        artist: foundArtist
      }
    });

    console.log("✅ PrintsPage - printsWithArtist:", enrichedPrints.length);
    setPrintsWithArtist(enrichedPrints);
  }, [prints, artists]);

  const breakpointColumns = {
    default: 5,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <main className="mt-5">
      <h1 className='text-center my-4'>All Prints</h1>
      {printsWithArtist.length > 0 ? (
        <Masonry
          breakpointCols={breakpointColumns}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {printsWithArtist.map((print) => {
            console.log("Rendering CardPrint - ID:", print.id, "Title:", print.title);
            return (
              <CardPrint 
                key={print.id} 
                print={print} 
                artist={print.artist} 
              />
            );
          })}
        </Masonry>
      ) : (
        <p className='text-center'>Loading prints...</p>
      )}
    </main>
  )
}

export default PrintsPage