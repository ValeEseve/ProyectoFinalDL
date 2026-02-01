import { useContext, useEffect, useState } from 'react'
import { getFeatured } from "../utils/featured"
import { PrintContext } from '../context/PrintContext'
import CardPrint from './CardPrint'
import { ArtistContext } from '../context/ArtistContext'

const FeaturedPrints = () => {
    const { prints, setPrints } = useContext(PrintContext)
    const { artists } = useContext(ArtistContext)
    const [printsWithArtist, setPrintsWithArtist] = useState([])

    useEffect(() => {
        if (!prints.length || !artists.length) return;

        const featured = getFeatured(prints, 4).map(print => ({
            ...print,
            artist: artists.find(a => a.id === print.artist_id)
        }))

        setPrintsWithArtist(featured)
    }, [prints, artists])


    return (
        <div>
            <br />
            <h2 className='text-center mb-3'>Featured Prints</h2>
            <section className='container-fluid d-flex justify-content-center gap-3'>
                {printsWithArtist.map((print) => (
                    <CardPrint
                        key={print.id}
                        print={print}
                        artist={print.artist}
                    />
                ))}

            </section>
        </div>
    )
}

export default FeaturedPrints
