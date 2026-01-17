import { createContext, useEffect, useState } from "react";

export const PrintContext = createContext({})

const PrintProvider = ({children}) => {
    const [prints, setPrints] = useState([])
    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchAPI = async () => {
        const url = apiUrl+"/prints"
        const response = await fetch(url)
        const data = await response.json()
        setPrints(data)
    }

    useEffect(() => {
        fetchAPI()
    }, [])

    return(
        <PrintContext.Provider value={{prints, setPrints}}>
        {children}
        </PrintContext.Provider>
    )
}

export default PrintProvider