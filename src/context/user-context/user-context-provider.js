import { UserContext } from "./user-context";
import { useState } from "react";


export default function UserContextProvider({ children }) {
    let [isLogged, setIsLogged] = useState(false);

    return (
        <UserContext.Provider value={[isLogged, setIsLogged]}>
            {children}
        </UserContext.Provider>
    )
}