import { useContext } from "react";
import { getFeatured } from "../utils/featured"
import CardArtist from "./CardArtist";
import { ArtistContext } from "../context/ArtistContext";

const FeaturedArtists = () => {
  const { artists } = useContext(ArtistContext)
  const featured = getFeatured(artists, 4);

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
