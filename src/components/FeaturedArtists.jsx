import { useContext } from "react";
import { getFeatured } from "../utils/featured"
import CardArtist from "./CardArtist";
import { UserContext } from "../context/UserContext";

const FeaturedArtists = () => {
  const { users } = useContext(UserContext)
  const featured = getFeatured(users, 4);

  return (
    <div>
      <h2 className='text-center mt-5 mb-3'>Featured Artists</h2>
      <section className='container-fluid d-flex justify-content-around'>
        {featured.map((artist) => (
          <CardArtist key={artist.id} artist={artist} />
        ))}
        </section>
    </div>
  )
}

export default FeaturedArtists
