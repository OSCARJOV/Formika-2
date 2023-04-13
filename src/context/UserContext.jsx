import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { auth } from "../config/firebase";

const UserContext = createContext();

export default function UserContextProvider({ children }) {
    const [user, setUser] = useState(false);

    useEffect(() => {
        console.log("useEffect");
     const unsuscribe = onAuthStateChanged(auth, (user) => { // como esto no devuelve promesa creo el if()
            console.log(user);
            setUser(user) // le asigno el usuario 
        })
        return unsuscribe // esto evita que no se replique el useEffect por falla del app
    }, [])

    if (user === false) return <p>Loading app...</p>

    return (
        <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    );
}

export const useUserContext = () => useContext(UserContext);
