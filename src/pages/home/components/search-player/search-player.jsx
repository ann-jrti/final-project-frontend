import { Grid, Paper, TextField, Box, Typography, responsiveFontSizes } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { getCurrentSesionEndpoint, getSummonerInfoEndpoint } from "../../../../riot-data-management/endpoints/riot-endpoints.js";


export default function SearchPlayer() {
    const [playerResults, setPlayerResults] = useState({})
    const [t, i18n] = useTranslation("global");
    const searchPlayer = t('home.search-bar.search-player');

    const handleSubmit = async (e) => {

        e.preventDefault();
        const summonerEndpoint = getSummonerInfoEndpoint(e.target.searchPlayer.value);

        const response = await fetch(summonerEndpoint, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36",
                "Accept-Language": "es-ES,es;q=0.9",
                "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                "Origin": "https://developer.riotgames.com"
            }
        })
        const data = await response.json();
        const results = {
            name: data.name,
            level: data.summonerLevel,
            accountId: data.accountId,
            encryptedId: data.id,
            puuid: data.puuid
        }
        setPlayerResults(results);
        const requestSeasonInfo = getCurrentSesionEndpoint(playerResults.encryptedId);
        console.log(requestSeasonInfo);
        console.log(playerResults);
        console.log(data);
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
                {playerResults &&
                    <>
                        <Typography variant={'p'}>{playerResults.name}</Typography>
                        <Typography variant={'p'}>{playerResults.level}</Typography>
                    </>}

            </>


        </>
    )
}