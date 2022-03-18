import { Grid, Paper, TextField, Box, Typography, responsiveFontSizes } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getCurrentSesionEndpoint, getSummonerInfoEndpoint } from "../../../../riot-data-management/endpoints/riot-endpoints.js";
import { fetchOther } from "../../../../riot-data-management/fetches/riot-fetches.js";
import { fetchOther2 } from "../../../../riot-data-management/fetches/riot-fetches.js";

export default function SearchPlayer() {
    const [playerResults, setPlayerResults] = useState({});
    const [seasonResults, setSeasonResults] = useState({});
    console.log(seasonResults);
    const [t, i18n] = useTranslation("global");
    const searchPlayer = t('home.search-bar.search-player');

    // const fetchOther = async () => {
    //     console.log(playerResults.encryptedId);
    //     const seasonInfoEnpoint = getCurrentSesionEndpoint(playerResults.encryptedId);
    //     console.log(seasonInfoEnpoint);
    //     const secondFetch = await fetch(seasonInfoEnpoint);
    //     const secondData = await secondFetch.json();
    //     console.log(secondData);
    // }

    useEffect(async () => {
        if (playerResults.encryptedId) {
            const seasonInfoEnpoint = getCurrentSesionEndpoint(playerResults.encryptedId);
            const response = await fetch(seasonInfoEnpoint);
            const data = await response.json();
            console.log(data);
            const seasonData = {
                tier: data[0].tier,
                rank: data[0].rank,
                wins: data[0].wins,
                losses: data[0].losses,
                queue: data[0].queueType,
                'hot streak': data[0].hot,
                inactive: data[0].inactive
            }
            setSeasonResults(seasonData)
        }
    }, [playerResults.encryptedId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const summonerEndpoint = getSummonerInfoEndpoint(e.target.searchPlayer.value);

        const response = await fetch(summonerEndpoint);
        const data = await response.json();
        const results = {
            name: data.name,
            level: data.summonerLevel,
            accountId: data.accountId,
            encryptedId: data.id,
            puuid: data.puuid
        }
        console.log(results);
        setPlayerResults(results);
    }

    return (
        <>

            <Grid sm={12} md={6} item>
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={2} >
                    <SearchIcon></SearchIcon>
                    <form onSubmit={handleSubmit}>
                        <TextField fullWidth id="searchPlayer" label={searchPlayer} variant="outlined" />
                    </form>
                </Box>
            </Grid>
            <>
                {(playerResults && seasonResults) &&
                    <>
                        <Typography variant={'p'}>{playerResults.name}</Typography>
                        <Typography variant={'p'}>{playerResults.level}</Typography>
                        <Typography variant={'p'}>{seasonResults.tier}</Typography>
                    </>}

            </>


        </>
    )
}