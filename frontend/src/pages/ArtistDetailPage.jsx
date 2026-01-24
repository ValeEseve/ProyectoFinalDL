import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { PrintContext } from '../context/PrintContext'
import CardPrint from '../components/CardPrint'
import "../styles/ArtistDetailPage.css"

const ArtistDetail = () => {
  const { id } = useParams()
  const { users } = useContext(UserContext)
  const { prints } = useContext(PrintContext)

  const artist = users.find((u) => u.id === String(id))
  console.log("Artist en card ", artist)
  const artistPrints = prints.filter((p) => p.userId === id)

  if (!users.length || !prints.length) {
    return <p>Loading artist...</p>;
  }

  console.log("Descripcion artista: ",artist.descr)

  return (
    <main>
      <div className='container-fluid d-flex gap-4 justify-content-center mt-5'>
        <section className='d-flex flex-column gap-5 user-details'>
          <img className='rounded-circle' src={artist.img} alt={artist.name} />
          <h2>{artist.name}</h2>
          <div className='d-flex gap-2'>
            <i className="fa-brands fa-square-instagram"></i> <p>{artist.instagram}</p>
          </div>
        </section>
        <section className='user-prints'>
          <p>{artist.descr}</p>
          <h4 className='text-center mb-3'>Prints by the artist</h4>
          <div className='d-flex flex-wrap gap-1 justify-content-center'>
            {artistPrints.map((print) => (
              <CardPrint key={print.id} print={print}  user={artist}/>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default ArtistDetail
