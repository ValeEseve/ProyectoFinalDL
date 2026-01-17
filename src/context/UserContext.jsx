import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({})

const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([])
    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchAPI = async () => {
        const url = apiUrl + "/users"
        const response = await fetch(url)
        const data = await response.json()
        setUsers(data)
    }

    useEffect(() => {
        fetchAPI()
    }, [])

    return (
        <UserContext.Provider value={{ users, setUsers }}>
            {children}
        </UserContext.Provider>
    )
}

export default UsersProvider