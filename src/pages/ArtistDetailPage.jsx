import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { PrintContext } from '../context/PrintContext'

const ArtistDetail = () => {
  const id = useParams()
  const {users} = useContext(UserContext)
  const {prints} = useContext(PrintContext)

  const artist = users.find((u) => u.id === id)
  const artistPrints = prints.find((p) => p.userId === id)

  return (
    <main>
      
    </main>
  )
}

export default ArtistDetail
