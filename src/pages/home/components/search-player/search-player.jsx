import { Grid, Paper, TextField, Box, Button, Typography, responsiveFontSizes } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getCurrentSesionEndpoint, getSummonerInfoEndpoint } from "../../../../riot-data-management/endpoints/riot-endpoints.js";
import { getCurrentPlayerGameEndpoint } from "../../../../riot-data-management/endpoints/riot-endpoints.js";
import { getChampNameByChampId, getChampByName, getBasicInfo, getCurrentSeasonInfo } from "../../../../riot-data-management/fetches/riot-fetches.js";
import InfoPlayerCard from "../info-player-card/InfoPlayerCard.jsx";
import CurrentGameDetails from "../current-game-details/CurrentGameDetails.jsx";
import { champsImages } from "../../../../riot-data-management/img-urls/index.js";

export default function SearchPlayer() {
    const [playerResults, setPlayerResults] = useState({});
    const [seasonResults, setSeasonResults] = useState(null);
    let [isPlaying, setIsPlaying] = useState(false);
    const [currentGame, setCurrentGame] = useState({});
    const [t, i18n] = useTranslation("global");
    const searchPlayer = t('home.search-bar.search-player');

    const printNowPlayingButton = () => {
        const champImagesInAssets = champsImages.filter(champ => {
            const champName = champ.split('_')
            return champName[0] === currentGame.champ
        })
        const randomChampImageToPrint = champImagesInAssets[Math.floor(Math.random() * champImagesInAssets.length)];
        return (

            <Box display={'flex'} alignItems={'center'} gap={1}>
                <Typography> Playing now!</Typography>
                <CurrentGameDetails
                    image={`https://ddragon.canisback.com/img/champion/splash/${randomChampImageToPrint}`
                        || `https://ddragon.canisback.com/img/champion/splash/${currentGame.champ}_0`}
                    playername={playerResults.name}
                    champ={currentGame.champ}
                    gameMode={currentGame.gameMode}
                    gameTime={currentGame.gameLength}
                ></CurrentGameDetails>
            </Box>
        )
    }

    // useEffect(async () => {
    //     if (playerResults.encryptedId) {
    //         const data = await getCurrentSeasonInfo(playerResults.encryptedId)
    //         const seasonData = {
    //             tier: data[0].tier,
    //             rank: data[0].rank,
    //             wins: data[0].wins,
    //             losses: data[0].losses,
    //             queue: data[0].queueType,
    //             hotStreak: data[0].hotStreak,
    //             inactive: data[0].inactive
    //         }
    //         setSeasonResults(seasonData)
    //     }
    // }, [playerResults.encryptedId])

    // useEffect(async () => {
    //     if (seasonResults) {
    //         const spectatorEndpoint = getCurrentPlayerGameEndpoint(playerResults.encryptedId);
    //         const response = await fetch(spectatorEndpoint);
    //         if (response.status === 404) setIsPlaying(false);
    //         if (response.status === 200) setIsPlaying(true);
    //         const data = await response.json();
    //         console.log(data);
    //         if (!data.participants) return;
    //         const champId = data.participants.find(p => p.summonerId === playerResults.encryptedId).championId
    //         const champPlaying = await getChampNameByChampId(champId);
    //         const game = {
    //             gameMode: data.gameMode,
    //             champ: champPlaying,
    //             gameLength: Math.round(data.gameLength / 60)
    //         }
    //         setCurrentGame(game)
    //     }

    // }, [seasonResults])


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e.target.searchPlayer.value);
        const basicInfo = await getBasicInfo(e.target.searchPlayer.value)
        console.log(basicInfo);
        const seasonResults = await getCurrentSeasonInfo(basicInfo.encryptedId)
        console.log(seasonResults);

        console.log(seasonResults.length);
        if (seasonResults.length !== 0) {
            const seasonData = {
                tier: seasonResults[0].tier,
                rank: seasonResults[0].rank,
                wins: seasonResults[0].wins,
                losses: seasonResults[0].losses,
                queue: seasonResults[0].queueType,
                hotStreak: seasonResults[0].hotStreak,
                inactive: seasonResults[0].inactive
            }
            setSeasonResults(seasonData)
        }

        const spectatorEndpoint = getCurrentPlayerGameEndpoint(basicInfo.encryptedId);
        const isPlaying = await fetch(spectatorEndpoint);
        if (isPlaying.status === 404) setIsPlaying(false);
        if (isPlaying.status === 200) {
            setIsPlaying(true);
            const data = await isPlaying.json();
            console.log(data);
            const champId = data.participants.find(p => p.summonerId === basicInfo.encryptedId).championId
            const champPlaying = await getChampNameByChampId(champId);
            const game = {
                gameMode: data.gameMode,
                champ: champPlaying,
                gameLength: Math.round(data.gameLength / 60)

            }
            setCurrentGame(game)
        }

        console.log(seasonResults);
        setPlayerResults(basicInfo);
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
                {playerResults.name !== undefined ?
                    <>
                        <InfoPlayerCard
                            image={`https://ddragon.canisback.com/img/champion/splash/${champsImages[Math.floor(Math.random() * champsImages.length)]}`}
                            name={playerResults.name}
                            imgSrc={`https://ddragon.leagueoflegends.com/cdn/10.18.1/img/profileicon/${playerResults.iconId}.png`}
                            level={playerResults.level}
                            rankIcon={seasonResults !== null ? seasonResults.tier : ''}
                            rank={seasonResults !== null ? `${seasonResults.tier} ${seasonResults.rank}` : ''}
                            losses={seasonResults !== null ? seasonResults.losses : ''} wins={seasonResults !== null ? seasonResults.wins : ''}
                            // hotstreak={ seasonResults.hotStreak ? 'In a hot streak!' : ''}
                            playing={<Typography variant={'p'}>{isPlaying ? printNowPlayingButton() : 'Not playing right now'}</Typography>}
                        ></InfoPlayerCard>

                    </> : ''}
            </>

        </>
    )
}