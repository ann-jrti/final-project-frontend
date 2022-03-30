import './style.css';
import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Divider } from "@mui/material";
import poroAvatar from '../../../assets/imgs/fat-poro.webp';
import { getUserLolAccountData } from '../../../db-requests';
import { champsImages } from '../../../riot-data-management/img-urls';


export default React.memo(function CustomProfileCard() {
    const [playerData, setPlayerData] = useState({})

    const getPlayerData = async () => {
        const data = await getUserLolAccountData(localStorage.getItem('email'))
        console.log(data);
        setPlayerData(data)
        console.log(data.roles);
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

    const getSummonerIconUrl = (iconId) => {
        localStorage.setItem('summoner-icon', `https://ddragon.leagueoflegends.com/cdn/12.6.1/img/profileicon/${iconId}.png`);
        return `https://ddragon.leagueoflegends.com/cdn/12.6.1/img/profileicon/${iconId}.png`;
    }



    return (

        <>
            {playerData.email === undefined ? 'cargando' :
                <Grid container display={'flex'} justifyContent={'center'}>

                    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} m={3}>
                        <Grid item display={'flex'} justifyContent={'center'}>

                            <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                                <Box>
                                    <img className='avatar-profile' src={getSummonerIconUrl(playerData.basicInfo.iconId)}></img>
                                </Box>

                                <Box marginTop={'-1rem'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                                    <Typography color='secondary' sx={{ fontFamily: 'FactionOutline', letterSpacing: '.5rem', marginBottom: '.6rem' }} className='font-face-gm' variant={'h1'}>{playerData.basicInfo.name}</Typography>
                                    {/* /* mean stats*  */}
                                    <Box>
                                        <Box display='flex' marginTop={2} marginBottom={3}>
                                            <Typography variant={'h5'} color='#2b2d42'>MEAN STATS LAST GAMES </Typography>
                                        </Box>

                                        <Box display='flex' flexDirection='column' gap={3}>

                                            <Box display='flex' borderBottom={'1px solid #8d99ae'} justifyContent='center' flexDirection='row' alignItems='center' gap={1}>
                                                <Typography variant='body2'>Wins:</Typography>
                                                <Typography sx={{ fontWeight: 'bold' }}>{playerData.mean.wins.toFixed(1)}</Typography>
                                            </Box>

                                            <Box display='flex' borderBottom={'1px solid #8d99ae'} justifyContent='center' flexDirection='row' alignItems='center' gap={1}>
                                                <Typography variant='body2'>Average kills per game:</Typography>
                                                <Typography sx={{ fontWeight: 'bold' }}>{playerData.mean.kills.toFixed(1)}</Typography>
                                            </Box>

                                            <Box display='flex' borderBottom={'1px solid #8d99ae'} justifyContent='center' flexDirection='row' alignItems='center' gap={1}>
                                                <Typography variant='body2'>Average assists per game:</Typography>
                                                <Typography sx={{ fontWeight: 'bold' }}>{playerData.mean.assists.toFixed(1)}</Typography>
                                            </Box>


                                            <Box display='flex' borderBottom={'1px solid #8d99ae'} justifyContent='center' flexDirection='row' alignItems='center' gap={1}>
                                                <Typography variant='body2'>Average deaths per game:</Typography>
                                                <Typography sx={{ fontWeight: 'bold' }}>{playerData.mean.deaths.toFixed(1)}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Box>
                                        <Box >
                                            <Typography variant='body2'>Main role:</Typography>
                                            <Typography sx={{ fontWeight: 'bold' }}>{playerData.mostPlayedRole[0]}</Typography>
                                        </Box>
                                    </Box>


                                </Box>
                            </Box>
                        </Grid>
                        <Box mt={4} display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                            <Box sx={{ backgroundColor: '#ced5e2', padding: '2rem', borderRadius: '2rem', maxHeight: 'auto' }} display='flex' flexDirection='column' alignItems='center'>
                                <Typography sx={{ letterSpacing: '.3rem', fontWeight: 'bold' }} variant={'h4'} color='#3d405b'>MOST PLAYED CHAMPS </Typography>
                                <Grid item display={'flex'} flexDirection={'row'} gap={3}>
                                    {print()}
                                </Grid>
                            </Box>
                        </Box>

                    </Box>

                </Grid>

            }
        </>
    )

})


