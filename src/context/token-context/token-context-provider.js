import { TokenContext } from "./token-context";
import { useState } from "react";


export default function TokenContextProvider({ children }) {
    const [userToken, setUserToken] = useState(null);

    return (
        <TokenContext.Provider value={[userToken, setUserToken]}>
            {children}
        </TokenContext.Provider>
    )
}