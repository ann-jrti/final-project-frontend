import { UserContext } from "./user-context";
import { useState, useEffect } from "react";
import { getUserAccountInfo } from "../../db-requests";

export default function UserContextProvider({ children }) {
    let [isLogged, setIsLogged] = useState(false);
    let [isCustomProfileCreated, setIsCustomProfileCreated] = useState(false);
    let logged = localStorage.getItem('logged') === null ? false : true;
    isLogged = logged;

    useEffect(() => {
        if (isLogged) {
            getUserAccountInfo(localStorage.getItem('email')).then(data => setIsCustomProfileCreated(data.customProfile))

        }
    }, [isLogged, isCustomProfileCreated])

    return (
        <UserContext.Provider value={[isLogged, setIsLogged, isCustomProfileCreated, setIsCustomProfileCreated]}>
            {children}
        </UserContext.Provider>
    )
}