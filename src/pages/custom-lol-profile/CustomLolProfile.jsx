import React, { useState, useEffect } from "react";
import { Grid, Box, Typography, TextField } from "@mui/material";
import { getBasicInfo, getLast30Matches, getThreeMostPlayedChamps, getAllGameDetails } from "../../riot-data-management/fetches/riot-fetches";
import poroAvatar from '../../assets/imgs/fat-poro.webp'

export default function CustomLolProfile() {
    const [registeredUserInfoAccount, setRegisteredUserInfoAccount] = useState({})
    const [mostPlayedChamps, setMostPlayedChamps] = useState({})
    const [lastMatches, setLastMatchesId] = useState([])

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
            setLastMatchesId(results)
        }
    }, [mostPlayedChamps.first])

    useEffect(async () => {
        if (lastMatches[0]) {
            const { numOfMatches, allGamesDetails, totalStats, roles } = await getAllGameDetails(lastMatches, registeredUserInfoAccount.encryptedId)
            // console.log(getAllGameDetails(lastMatches, registeredUserInfoAccount.encryptedId));
            console.log(allGamesDetails);
            console.log(totalStats);
            console.log(roles);
            // const values = Object.values(totalStats)
            // const entries = Object.entries(totalStats)

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
                            <img width={200} src={poroAvatar}></img>
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