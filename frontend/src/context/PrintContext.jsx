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
        const { data: posts } = await axios.get(apiUrl + "/prints")
        if (!posts) {
            console.log("No prints available")
            return
        }
        setPrints([...posts]);
    };

    const addPrint = async (title, descr, width, height, imgUrl, price) => {
        const post = { title, descr, width, height, img_url: imgUrl, price };
        console.log("Token en addPrint ", token)
        await axios.post(apiUrl + "/prints", post, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };

    useEffect(() => {
        getPrints()
    }, [])

    return (
        <PrintContext.Provider value={{
            addPrint,
            prints, setPrints
        }}>
            {children}
        </PrintContext.Provider>
    )
}

export default PrintsProvider