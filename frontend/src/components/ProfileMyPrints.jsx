import { useContext, useEffect, useState } from 'react'
import { PrintContext } from '../context/PrintContext'
import { UserContext } from '../context/UserContext'
import { Link } from 'react-router-dom'
import CardPrint from './CardPrint'
import Masonry from 'react-masonry-css'

const ProfileMyPrints = () => {
  const { prints } = useContext(PrintContext)
  const { user } = useContext(UserContext)
  const [myPrints, setMyPrints] = useState([])
  const [loading, setLoading] = useState(true)
  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchMyPrints = async () => {
      if (!user) return

      setLoading(true)
      try {
        // Obtener el artist_id del usuario actual
        const artistResponse = await fetch(`${apiUrl}/artists`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        
        if (!artistResponse.ok) {
          throw new Error('Failed to fetch artist info')
        }

        const artists = await artistResponse.json()
        const currentArtist = artists.find(a => a.username === user.username)

        if (!currentArtist) {
          console.log("Usuario no tiene perfil de artista")
          setMyPrints([])
          return
        }

        // Filtrar prints del artista actual
        const userPrints = prints.filter(p => p.artist_id === currentArtist.id)
        setMyPrints(userPrints.map(print => ({
          ...print,
          artist: currentArtist
        })))

      } catch (error) {
        console.error('Error fetching my prints:', error)
        setMyPrints([])
      } finally {
        setLoading(false)
      }
    }

    fetchMyPrints()
  }, [user, prints])

  const breakpointColumns = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  }

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading your prints...</p>
        </div>
      </div>
    )
  }

  if (!user?.is_artist) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h3>You're not an artist yet</h3>
          <p className="text-muted">Become an artist to start posting your prints!</p>
          <Link to="/profile/settings" className="btn btn-primary mt-3">
            Become an Artist
          </Link>
        </div>
      </div>
    )
  }

  if (myPrints.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h3>You haven't posted any prints yet</h3>
          <p className="text-muted">Start sharing your art with the world!</p>
          <Link to="/profile/new-post" className="btn btn-primary mt-3">
            <i className="bi bi-plus-circle me-2"></i>
            Create New Print
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Prints ({myPrints.length})</h2>
        <Link to="/profile/new-post" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          New Print
        </Link>
      </div>

      <Masonry
        breakpointCols={breakpointColumns}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {myPrints.map((print) => (
          <CardPrint 
            key={print.id} 
            print={print}
            artist={print.artist}
          />
        ))}
      </Masonry>
    </div>
  )
}

export default ProfileMyPrints