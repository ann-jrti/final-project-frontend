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
import poroAvatar from '../../../../assets/imgs/fat-poro.webp';
import { useNavigate } from "react-router-dom";

export default function SearchPlayer() {
    const [playerResults, setPlayerResults] = useState({});
    const [seasonResults, setSeasonResults] = useState(null);
    let [isPlaying, setIsPlaying] = useState(false);
    const [currentGame, setCurrentGame] = useState({});
    const [playerNotFound, setPlayerNotFound] = useState(false);
    const [t, i18n] = useTranslation("global");
    const searchPlayer = t('home.search-bar.search-player');

    const navigate = useNavigate()

    const reset = () => {
        setPlayerResults({})
        setSeasonResults(null)
        setIsPlaying(false)
        setCurrentGame({})
        setPlayerNotFound(false)
    }

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

    const formatQueueType = (str) => {
        const formatedStr = str.split('_').map(letter => letter[0].toUpperCase() + letter.substring(1, letter.length).toLowerCase()).join(' ')
        return formatedStr
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(e.target.searchPlayer.value);
        const basicInfo = await getBasicInfo(e.target.searchPlayer.value)
        console.log(basicInfo);
        if (!basicInfo) {
            setPlayerNotFound(true)
            return
        }
        console.log(basicInfo);
        const seasonResults = await getCurrentSeasonInfo(basicInfo.encryptedId)
        console.log(seasonResults);

        console.log(seasonResults.length);
        if (seasonResults.length !== 0) {
            let queue
            if (seasonResults.length === 1) {
                queue = seasonResults[0]
            } else {
                queue = seasonResults.find(results => results.queueType === 'RANKED_SOLO_5x5' || results.queueType === 'RANKED_FLEX_SR')
            }
            console.log(queue);

            const seasonData = {
                tier: queue.tier,
                rank: queue.rank,
                wins: queue.wins,
                losses: queue.losses,
                queue: queue.queueType,
                hotStreak: queue.hotStreak,
                inactive: queue.inactive,
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

        setPlayerResults(basicInfo);
    }

    return (
        <>

            <Grid sm={12} md={6} item>
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={2} >

                    {playerResults.name !== undefined ? <Button variant='contained' color='secondary' onClick={() => reset()}>Search other player</Button> : <form onSubmit={handleSubmit}>
                        <SearchIcon></SearchIcon>
                        <TextField fullWidth id="searchPlayer" label={searchPlayer} variant="outlined" />
                    </form>}

                    {playerNotFound ? <Typography color='secondary' variant='body2'>Player not found</Typography> : ''}
                </Box>
            </Grid>
            <>
                {playerResults.name !== undefined ?
                    <>
                        <InfoPlayerCard
                            image={`https://ddragon.canisback.com/img/champion/splash/${champsImages[Math.floor(Math.random() * champsImages.length)]}`}
                            name={playerResults.name}
                            imgSrc={playerResults.iconId <= 4680 ? `https://ddragon.leagueoflegends.com/cdn/10.18.1/img/profileicon/${playerResults.iconId}.png` : poroAvatar}
                            level={playerResults.level}
                            queue={seasonResults !== null ? formatQueueType(seasonResults.queue) : ''}
                            rankIcon={seasonResults !== null ? seasonResults.tier : ''}
                            rank={seasonResults !== null ? `${seasonResults.tier} ${seasonResults.rank}` : ''}
                            losses={seasonResults !== null ? seasonResults.losses : ''} wins={seasonResults !== null ? seasonResults.wins : ''}
                            // hotstreak={seasonResults.hotStreak ? 'In a hot streak!' : ''}
                            playing={<Typography variant={'p'}>{isPlaying ? printNowPlayingButton() : 'Not playing right now'}</Typography>}
                        ></InfoPlayerCard>

                    </> : ''}
            </>

        </>
    )
}