import { useContext, useEffect, useState } from 'react'
import { PrintContext } from '../context/PrintContext'
import { UserContext } from '../context/UserContext'
import CardPrint from '../components/CardPrint'
import { ArtistContext } from '../context/ArtistContext'

const PrintsPage = () => {
  const { prints } = useContext(PrintContext)
  const { artists } = useContext(ArtistContext)
  const [printsWithArtist, setPrintsWithArtist] = useState([])

  useEffect(() => {
    if (!prints.length || !artists.length) return;
    setPrintsWithArtist(
      prints.map(print => {
        const foundUser = artists.find(u => String(u.id) === String(print.userId));
        return {
          ...print,
          artist: foundUser
        }
      })
    );
  }, [prints, artists]);
  return (
    <main>
      <section className='d-flex justify-content-center flex-wrap gap-5'>
        {printsWithArtist.map((print) => (
          <CardPrint key={print.id} print={print} artist={print.artist} />
        ))}
      </section>
    </main>
  )
}

export default PrintsPage
