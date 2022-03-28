import './style.css'
import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography, List, ListItem } from "@mui/material"
import poroAvatar from '../../../assets/imgs/fat-poro.webp'
import { getUserLolAccountData } from '../../../db-requests'
import { champsImages } from '../../../riot-data-management/img-urls'

export default React.memo(function CustomProfileCard() {
    const [playerData, setPlayerData] = useState({})

    const getPlayerData = async () => {
        const data = await getUserLolAccountData(localStorage.getItem('email'))
        console.log(data);
        setPlayerData(data)
    }

    const print = () => {
        const printed = playerData.firstThreeChampsMostPlayed.map(champ => {
            const champImagesInAssets = champsImages.filter(c => {
                const champName = c.split('_')
                return champName[0] === champ.mostPlayedChampName;
            })
            const randomChampImageToPrint = champImagesInAssets[Math.floor(Math.random() * champImagesInAssets.length)]

            return (
                <div key={champ.lastTimePlayed} className="card">
                    <div className="bg" />
                    <div className="card-front-img">
                        <img src={`https://ddragon.canisback.com/img/champion/centered/${randomChampImageToPrint}`} alt="Brand" />
                    </div>
                    <div className="card-info">
                        <div className="card-info-section">
                            <div className="card-info__faction">
                                <div className="card-info__name">{champ.mostPlayedChampName}</div>
                                <div className="card-info__points">Score points: {champ.champPoints} </div>
                            </div>
                            <div className="card-info__avatar">
                                <img src={`https://ddragon.canisback.com/img/champion/tiles/${champ.mostPlayedChampName}_0.jpg`} />
                            </div>
                        </div>
                        <div className="see-more">
                            Last time played: ayer
                        </div>
                    </div>
                </div>
            )
        })
        return printed
    }

    useEffect(() => {
        getPlayerData();
    }, [])



    return (

        <>
            {playerData.email === undefined ? 'cargando' :
                <Grid container display={'flex'} justifyContent={'center'}>

                    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} m={3}>
                        <Grid item display={'flex'} justifyContent={'center'}>
                            <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                                <Box >
                                    <img className='avatar-profile' src={`https://ddragon.leagueoflegends.com/cdn/10.18.1/img/profileicon/${playerData.basicInfo.iconId}.png`}></img>
                                </Box>
                                <Box marginTop={'-1rem'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                                    {/* <Divider sx={{ color: 'red' }} /> */}
                                    <Typography color='secondary' sx={{ fontFamily: 'FactionOutline', letterSpacing: '.5rem', marginBottom: '.6rem' }} className='font-face-gm' variant={'h1'}>{playerData.basicInfo.name}</Typography>
                                    <Typography variant={'h4'}>Mean stats last 10 games: </Typography>
                                    <List>
                                        <ListItem>Wins: {playerData.mean.wins}</ListItem>
                                        <ListItem>Average kills per game: {playerData.mean.kills}</ListItem>
                                        <ListItem>Average assists per game: {playerData.mean.assists}</ListItem>
                                        <ListItem>Average deaths per game: {playerData.mean.deaths}</ListItem>

                                    </List>
                                    <Typography variant={'h4'}>Most played champs: </Typography>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item display={'flex'} flexDirection={'row'} gap={3}>
                            {print()}
                        </Grid>

                    </Box>

                </Grid>

            }
        </>
    )

})


