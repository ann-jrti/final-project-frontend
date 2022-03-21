import React, { useState, useEffect } from "react";
import { Grid, Box, Avatar, CardHeader, Typography, TextField } from "@mui/material";
import { getChampionMasteryEndpoint } from "../../riot-data-management/endpoints/riot-endpoints";
import { getChampNameByChampId, getBasicInfo, getLast30Matches, getMatchDetails } from "../../riot-data-management/fetches/riot-fetches";

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
            const championMasteryEndpoint = getChampionMasteryEndpoint(registeredUserInfoAccount.encryptedId)
            const response = await fetch(championMasteryEndpoint);
            const data = await response.json();
            const firstThreeChampsMostPlayed = {
                first: {
                    champId: data[0].championId,
                    champPoints: data[0].championPoints,
                    mostPlayedChampName: await getChampNameByChampId(data[0].championId),
                    lastTimePlayed: new Date(data[0].lastPlayTime)
                },
                second: {
                    champId: data[1].championId,
                    champPoints: data[1].championPoints,
                    mostPlayedChampName: await getChampNameByChampId(data[1].championId),
                    lastTimePlayed: new Date(data[1].lastPlayTime)
                },
                third: {
                    champId: data[2].championId,
                    champPoints: data[2].championPoints,
                    mostPlayedChampName: await getChampNameByChampId(data[2].championId),
                    lastTimePlayed: new Date(data[2].lastPlayTime)
                },

            }
            console.log(firstThreeChampsMostPlayed);
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
            const data = await getMatchDetails(lastMatches[0])
            const playerGameDetails = data.info.participants.find(player => player.summonerId === registeredUserInfoAccount.encryptedId)
            console.log(playerGameDetails);
            console.log(data);
            const gameDetails = {
                win: playerGameDetails.win,
                assists: playerGameDetails.assists,
                deaths: playerGameDetails.deaths,
                lane: playerGameDetails.teamPosition,
                goldEarned: playerGameDetails.goldEarned,
                turretKills: playerGameDetails.turretKills,
                turretTakedowns: playerGameDetails.turretTakedowns,
                visionScore: playerGameDetails.visionScore,
                wardsPlaced: playerGameDetails.wardsPlaced,
                damageDealt: {
                    physical: playerGameDetails.physicaldamageDealtToChampions,
                    magical: playerGameDetails.magicalDamageDealt,
                    total: playerGameDetails.totalDamageDealt
                },
                comboKills: {
                    doubleKills: playerGameDetails.doubleKills,
                    tripleKills: playerGameDetails.triplekills,
                    quadraKills: playerGameDetails.quadraKills,
                    pentaKills: playerGameDetails.pentaKills
                },
            }
            console.log(gameDetails);
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