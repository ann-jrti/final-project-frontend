import React, { useState, useEffect } from "react";
import { Grid, Box, Avatar, Typography, TextField } from "@mui/material";
import { getSummonerInfoEndpoint, getChampionMasteryEndpoint } from "../../riot-data-management/endpoints/riot-endpoints";
import { getChampNameByChampId } from "../../riot-data-management/fetches/riot-fetches";

export default function CustomLolProfile() {
    const [registeredUserInfoAccount, setRegisteredUserInfoAccount] = useState({})
    const [mostPlayedChamps, setMostPlayedChamps] = useState({})
    console.log('working custom lol profile');
    const handleSubmitGenerateProfile = async (e) => {
        e.preventDefault();
        const summonerEndpoint = getSummonerInfoEndpoint(e.target.generateMyProfile.value);

        const response = await fetch(summonerEndpoint);
        const data = await response.json();
        const results = {
            basicInfo: {
                name: data.name,
                level: data.summonerLevel,
                accountId: data.accountId,
                encryptedId: data.id,
                puuid: data.puuid
            }
        }
        console.log(results.basicInfo.encryptedId);
        setRegisteredUserInfoAccount(results);
    }

    useEffect(async () => {
        if (registeredUserInfoAccount.basicInfo) {
            const championMasteryEndpoint = getChampionMasteryEndpoint(registeredUserInfoAccount.basicInfo.encryptedId)
            const response = await fetch(championMasteryEndpoint);
            const data = await response.json();
            const firstThreeChampsMostPlayed = {
                first: {
                    champId: data[0].championId,
                    champPoints: data[0].championPoints,
                    mostPlayedChampName: await getChampNameByChampId(data[0].championId)
                },
                second: {
                    champId: data[1].championId,
                    champPoints: data[1].championPoints,
                    mostPlayedChampName: await getChampNameByChampId(data[1].championId)
                },
                third: {
                    champId: data[2].championId,
                    champPoints: data[2].championPoints,
                    mostPlayedChampName: await getChampNameByChampId(data[2].championId)
                },

            }
            console.log(firstThreeChampsMostPlayed);
            setMostPlayedChamps(mostPlayedChamps)
        }
    }, [registeredUserInfoAccount.basicInfo])


    return (
        <Grid container>

            <form onSubmit={handleSubmitGenerateProfile}>
                <TextField id="generateMyProfile" >Search</TextField>
            </form>

            <Box display={'flex'} justifyContent={'center'} width={'100%'} m={3}>
                <Grid item>
                    <Box display={'flex'} flexDirection={'row'} justifyContent={'center'}>

                        <img width={200} src={'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80'}></img>


                        <Box>
                            <Typography variant={'h2'}>Player name</Typography>
                            <Typography variant={'h2'}>Player name</Typography>
                            <Typography variant={'body1'}>Most played champ: </Typography>
                        </Box>

                    </Box>
                </Grid>
            </Box>
        </Grid>

    )
}