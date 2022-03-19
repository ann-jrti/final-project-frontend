import { Grid, Paper, TextField, Box, Button, Typography, responsiveFontSizes } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getCurrentSesionEndpoint, getSummonerInfoEndpoint } from "../../../../riot-data-management/endpoints/riot-endpoints.js";
import { getCurrentPlayerGameEndpoint } from "../../../../riot-data-management/endpoints/riot-endpoints.js";
import { getChampNameByChampId, getChampByName } from "../../../../riot-data-management/fetches/riot-fetches.js";
import InfoPlayerCard from "../info-player-card/InfoPlayerCard.jsx";
import styled from "@emotion/styled";

export default function SearchPlayer() {
    const [playerResults, setPlayerResults] = useState({});
    const [seasonResults, setSeasonResults] = useState({});
    let [isPlaying, setIsPlaying] = useState(false);
    const [currentGame, setCurrentGame] = useState({});
    const [t, i18n] = useTranslation("global");
    const searchPlayer = t('home.search-bar.search-player');
    getChampByName()

    const printNowPlayingButton = () => {
        const customButton = styled(Button)`
            `
        return (


            <Box display={'flex'} alignItems={'center'} gap={1}>
                <Typography> Playing now!</Typography>
                <Button variant={'contained'} size='small' color='warning' >Click here see champ playing</Button>
            </Box>
        )
    }

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
                hotStreak: data[0].hotStreak,
                inactive: data[0].inactive
            }
            setSeasonResults(seasonData)
        }
    }, [playerResults.encryptedId])

    useEffect(async () => {
        if (seasonResults) {
            const spectatorEndpoint = getCurrentPlayerGameEndpoint(playerResults.encryptedId);
            const response = await fetch(spectatorEndpoint);
            if (response.status === 404) setIsPlaying(false);
            if (response.status === 200) setIsPlaying(true);;
            const data = await response.json();
            const champId = data.participants.find(p => p.summonerId === playerResults.encryptedId).championId
            console.log(champId);
            const champPlaying = await getChampNameByChampId(champId);
            console.log(champPlaying);
            const game = {
                gameMode: data.gameMode,
                champ: champPlaying
            }
            setCurrentGame(game)
        }

    }, [seasonResults])


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
                        <InfoPlayerCard
                            name={playerResults.name}
                            level={playerResults.level}
                            rank={seasonResults.tier + ' ' + seasonResults.rank}
                            losses={seasonResults.losses} wins={seasonResults.wins}
                            hotstreak={seasonResults.hotStreak ? 'In a hot streak!' : ''}
                            playing={<Typography variant={'p'}>{isPlaying ? printNowPlayingButton() : 'Not playing right now'}</Typography>}
                        ></InfoPlayerCard>

                    </>}
            </>
            {/* <>
                <Typography variant={'p'}>{currentGame ? currentGame.champ : ''}</Typography>
            </> */}


        </>
    )
}