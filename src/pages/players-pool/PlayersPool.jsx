
import React, { useEffect, useState } from "react"
import PlayerCard from "./PlayerCard"

export default function PlayersPool() {
    const [offers, setOffers] = useState(null)

    useEffect(async () => {
        const response = await fetch('http://localhost:4000/players-pool', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${localStorage.getItem('login-token')}`
            }
        })

        const data = await response.json()
        console.log(data);
        setOffers(data)
    }, [])

    return (

        <>
            <h1>Players pool</h1>
            <>
                {offers ? offers.map(offer => <PlayerCard></PlayerCard>) : 'loading...'}
            </>

        </>


    )
}