import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({})

const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchAPI = async () => {
        try {
            const url = apiUrl + "/users";

            const response = await fetch(url, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log("TOKEN EN FETCH:", token);

            if (!response.ok) {
                const text = await response.text();
                console.error("Respuesta no OK:", text);
                return;
            }

            const data = await response.json();
            setUsers(data);

        } catch (error) {
            console.error("Error en fetchAPI:", error);
        }
    };


    const [token, setToken] = useState(null)
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [profileImgUrl, setProfileImgUrl] = useState("")

    const navigate = useNavigate()

    const updateUser = (newUser) => {
        setUser(newUser);

        if (newUser?.email) setEmail(newUser.email);
        if (newUser?.name) setName(newUser.name);
        if (newUser?.profile_img_url) setProfileImgUrl(newUser.profile_img_url);
    };


    const login = async (email, password) => {
        const url = apiUrl + "/auth/login"
        const response = await fetch(url, {
            method: "POST", headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            })
        })
        const data = await response.json()
        if (response.ok) {
            setToken(data.token);
            setEmail(data.email);
            updateUser(data)
            localStorage.setItem("token", data.token);
            localStorage.setItem("email", data.email)
            navigate("/profile")
        } else {
            alert(data?.error || "Error en el inicio de sesión.");
        }
    }

    const register = async (email, password, name, username) => {
        const url = apiUrl + "/auth/register";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, name, username }),
        });
        const data = await response.json();

        if (response.ok) {
            setToken(data.token);
            setEmail(data.email);
            localStorage.setItem("token", data.token);
            navigate("/login", {
                state: { successMessage: "User created successfully!" }
            });
        } else {
            alert(data?.error || "Error en registro");
        }
    };

    const getProfile = async () => {
        if (!token) {
            console.error("No hay token disponible");
            return;
        }

        const url = apiUrl + "/auth/me";
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        const data = await response.json();
        if (response.ok) {
            setEmail(data.email);
            setName(data.name)
            setProfileImgUrl(data.profile_img_url)
            updateUser(data)

        } else {
            alert(data?.error || "Error fetching profile");
        }
    };

    const logout = () => {
        setToken(null);
        setEmail("")
        setUser(null)
        localStorage.removeItem("token")
        localStorage.removeItem("email");
        navigate("/")
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        const storedEmail = localStorage.getItem("email")
        if (storedToken && storedEmail) {
            setToken(storedToken)
            setEmail(storedEmail)
        }
        fetchAPI()
    }, [])

    useEffect(() => {
        if (token) {
            getProfile();
        }
    }, [token]);


    return (
        <UserContext.Provider value={{
            users,
            user,
            token,
            email,
            name,
            profileImgUrl,
            login,
            register,
            logout,
            getProfile,
            updateUser
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UsersProvider