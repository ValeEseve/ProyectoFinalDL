import { createContext, useEffect, useState } from "react";

export const ArtistContext = createContext({})

const ArtistProvider = ({ children }) => {
    const [artists, setArtists] = useState([])
    const [selectedArtist, setSelectedArtist] = useState(null)
    const [loading, setLoading] = useState(true)

    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchArtists = async () => {
        setLoading(true)
        const url =  `${apiUrl}/artists`
        try {
            const response = await fetch(url)
            const data = await response.json()
            setArtists(data)
        } catch (error) {
            console.error("Error fetching artists", error)
        } finally {
            setLoading(false)
        }
    }

    const fetchArtistById = async (id) => { 
        setLoading(true)
        const url =  `${apiUrl}/artists/${id}`
        try {
            const response = await fetch(url)
            const data = await response.json()
            setSelectedArtist(data)
        } catch (error) {
            console.error("Error fetching artist by id: ", error)
        } finally {
            setLoading(false)
        }
     }

    useEffect(() => {
        fetchArtists()
    }, [])

    return (
        <ArtistContext.Provider value={
            {   fetchArtistById,
                artists, selectedArtist, loading
            }
        }>
            {children}
        </ArtistContext.Provider>
    )
}

export default ArtistProvider