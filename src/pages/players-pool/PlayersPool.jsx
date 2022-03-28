
import React, { useEffect, useState } from "react"
import PlayerCard from "./PlayerCard/PlayerCard"
import { Grid, Typography } from "@mui/material"

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

        <Grid container justifyContent='center' mt={3} gap={2}>
            <Typography variant='h2' color='primary'>PLAYERS POOL</Typography>

            <Grid item display='flex' gap={3}>
                {offers ? offers.map(offer => <PlayerCard role={offer.role} userName={offer.basicInfo.name} playerMessage={offer.playerDescription}></PlayerCard>) : 'loading...'}
            </Grid>

        </Grid>


    )
}