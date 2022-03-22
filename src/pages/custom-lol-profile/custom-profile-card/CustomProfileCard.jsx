import './style.css'
import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography } from "@mui/material"
import poroAvatar from '../../../assets/imgs/fat-poro.webp'
import { getUserLolAccountData } from '../../../db-requests'
import { champsImages } from '../../../riot-data-management/img-urls'


export default function CustomProfileCard() {
    const [playerData, setPlayerData] = useState({})


    const getPlayerData = async () => {
        const data = await getUserLolAccountData(localStorage.getItem('email'))
        console.log(data);
        setPlayerData(data)
    }

    const print = () => {
        const printed = playerData.mostPlayedChamps.map(champ => {
            const champImagesInAssets = champsImages.filter(c => {
                const champName = c.split('_')
                return champName[0] === champ.mostPlayedChampName;
            })
            const randomChampImageToPrint = champImagesInAssets[Math.floor(Math.random() * champImagesInAssets.length)]

            return (

                <div key={champ.lastTimePlayed} className="card">
                    <div className="bg" />
                    <div className="card-front-img">
                        <img src={`https://ddragon.canisback.com/img/champion/splash/${randomChampImageToPrint}`} alt="Brand" />
                    </div>
                    <div className="card-info">
                        <div className="card-info-section">
                            <div className="card-info__faction">
                                <div className="card-info__name">{champ.mostPlayedChampName}</div>
                                <div className="card-info__region">Score points: {champ.champPoints} </div>
                            </div>
                            <div className="card-info__crest">
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

    // useEffect(() => {
    //     // if (playerData.mostPlayedChamps[0]) {

    //     // }

    // }, [playerData.mostPlayedChamps[0]])


    useEffect(() => {
        getPlayerData();
    }, [])



    return (

        <>
            {playerData.email === undefined ? 'cargando' :
                <Grid container display={'flex'} justifyContent={'center'}>

                    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} m={3}>
                        <Grid item display={'flex'} justifyContent={'center'}>
                            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                                <Box >
                                    <img width={200} src={poroAvatar}></img>
                                </Box>
                                <Box >
                                    <Typography variant={'h2'}>{playerData.registeredUserInfoAccount.name}</Typography>
                                    <Typography variant={'body2'}>Player name</Typography>
                                    <Typography variant={'body2'}>Most played champs: </Typography>
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

}