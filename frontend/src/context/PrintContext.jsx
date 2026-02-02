import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios";
import { UserContext } from "./UserContext";

export const PrintContext = createContext({})

const PrintsProvider = ({ children }) => {
    const { token } = useContext(UserContext)
    const [prints, setPrints] = useState([])
    const apiUrl = import.meta.env.VITE_API_URL;

    const getPrints = async () => {
        console.log("getPrints initializing");
        try {
            const { data } = await axios.get(apiUrl + "/prints")
            
            console.log("RAW DATA FROM BACKEND:", data);
            
            if (!data || data.length === 0) {
                console.log("No prints available")
                setPrints([])
                return
            }

            // Normalizar los prints
            const normalizedPrints = data.map((p) => {
                // Verificar que tenga ID
                if (!p.id) {
                    console.error("Print without ID:", p);
                }
                
                return {
                    id: p.id,
                    title: p.title,
                    description: p.description,
                    width: p.width,
                    height: p.height,
                    img_url: p.img_url,
                    price: p.price,
                    artist_id: p.artist_id,
                    created_at: p.created_at,
                    // Incluir datos del artista si vienen del backend
                    artist: p.artist_username ? {
                        username: p.artist_username,
                        name: p.artist_name,
                        slug: p.artist_slug
                    } : undefined
                }
            })
            
            console.log("Prints normalizados:", normalizedPrints);
            console.log("Print IDs:", normalizedPrints.map(p => p.id));
            
            // Verificar duplicados
            const ids = normalizedPrints.map(p => p.id);
            const uniqueIds = [...new Set(ids)];
            if (ids.length !== uniqueIds.length) {
                console.error("⚠️ WARNING: Duplicate print IDs detected!");
                console.error("Total prints:", ids.length);
                console.error("Unique IDs:", uniqueIds.length);
                console.error("IDs:", ids);
            }
            
            setPrints(normalizedPrints)
        } catch (error) {
            console.error("Error fetching prints:", error)
        }
    };

    const addPrint = async (title, descr, width, height, imgUrl, price) => {
        try {
            const post = { title, descr, width, height, imgUrl, price };
            await axios.post(apiUrl + "/prints", post, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Recargar prints después de agregar uno nuevo
            await getPrints();
        } catch (error) {
            console.error("Error creating print:", error);
            throw error;
        }
    };

    useEffect(() => {
        getPrints()
    }, [])

    return (
        <PrintContext.Provider value={{
            addPrint,
            prints, 
            setPrints,
            getPrints
        }}>
            {children}
        </PrintContext.Provider>
    )
}

export default PrintsProvider