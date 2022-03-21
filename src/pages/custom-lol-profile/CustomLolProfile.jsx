import React, { useState, useEffect } from "react";
import { Grid, Box, Typography, TextField } from "@mui/material";
import { getBasicInfo, getLast30Matches, getThreeMostPlayedChamps, getAllGameDetails } from "../../riot-data-management/fetches/riot-fetches";

export default function CustomLolProfile() {
    const [registeredUserInfoAccount, setRegisteredUserInfoAccount] = useState({})
    const [mostPlayedChamps, setMostPlayedChamps] = useState({})
    const [lastMatches, setLastMatches] = useState([])

    console.log('working custom lol profile');

    const handleSubmitGenerateProfile = async (e) => {
        e.preventDefault();
        const results = await getBasicInfo(e.target.generateMyProfile.value)
        setRegisteredUserInfoAccount(results);
    }

    useEffect(async () => {
        if (registeredUserInfoAccount.encryptedId) {
            const firstThreeChampsMostPlayed = await getThreeMostPlayedChamps(registeredUserInfoAccount.encryptedId)
            setMostPlayedChamps(firstThreeChampsMostPlayed)
            console.log(firstThreeChampsMostPlayed.first);
        }
    }, [registeredUserInfoAccount.encryptedId])

    useEffect(async () => {
        if (mostPlayedChamps.first.champId) {
            const results = await getLast30Matches(registeredUserInfoAccount.puuid)
            setLastMatches(results)
        }
    }, [mostPlayedChamps.first])

    useEffect(async () => {
        if (lastMatches[0]) {
            getAllGameDetails(lastMatches, registeredUserInfoAccount.encryptedId)
        }
    }, [lastMatches[0]])

    return (
        <Grid container>

            <form onSubmit={handleSubmitGenerateProfile}>
                <TextField id="generateMyProfile" >Search</TextField>
            </form>

            <Box display={'flex'} justifyContent={'center'} width={'100%'} m={3}>
                <Grid item>
                    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>


                        <Box >
                            <img width={200} src={'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80'}></img>
                        </Box>
                        <Box >
                            <Typography variant={'h2'}>Player name</Typography>
                            <Typography variant={'body2'}>Player name</Typography>
                            <Typography variant={'body2'}>Most played champs: </Typography>
                        </Box>

                    </Box>
                </Grid>
            </Box>
        </Grid>

    )
}