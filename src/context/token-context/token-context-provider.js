import { TokenContext } from "./token-context";
import { useState } from "react";


export default function TokenContextProvider({ children }) {
    const [token, setToken] = useState(null);

    return (
        <TokenContext.Provider value={[token, setToken]}>
            {children}
        </TokenContext.Provider>
    )
}