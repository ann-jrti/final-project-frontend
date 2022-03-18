import { UserContext } from "./user-context";
import { useState } from "react";


export default function UserContextProvider({ children }) {
    let [isLogged, setIsLogged] = useState(false);
    let logged = localStorage.getItem('logged') === null ? false : true;
    isLogged = logged;

    return (
        <UserContext.Provider value={[isLogged, setIsLogged]}>
            {children}
        </UserContext.Provider>
    )
}