import React, { useEffect, useState } from "react";
import PlayerPoolCard from "./PlayerPoolCard/PlayerPoolCard";
import { Grid, Typography, Modal, Card, Box, List, ListItem } from "@mui/material";
import { champsImages } from "../../riot-data-management/img-urls";

export default function PlayersPool() {
    const [offers, setOffers] = useState(null)
    let [summoner, setSummoner] = useState('')
    const [openProfile, setOpenProfile] = useState(false)
    const [playerData, setPlayerData] = useState({})
    const [playerEmail, setPlayerEmail] = useState('')
    const [playerProfile, setPlayerProfile] = useState({})

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(async () => {
        const response = await fetch('http://localhost:4000/players-pool', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${localStorage.getItem('login-token')}`
            }
        })

        const data = await response.json()
        console.log(data);
        setOffers(data)
    }, [])


    const style = {
        position: 'absolute',
        padding: '2rem',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    const printThreeMostPlayedChampsCards = () => {
        const printed = playerProfile.firstThreeChampsMostPlayed.map(champ => {
            const champImagesInAssets = champsImages.filter(c => {
                const champName = c.split('_')
                return champName[0] === champ.mostPlayedChampName;
            })
            const randomChampImageToPrint = champImagesInAssets[Math.floor(Math.random() * champImagesInAssets.length)]

            return (
                <Card sx={{ maxWidth: '250px', maxHeight: '250px' }} key={champ.lastTimePlayed} className="card">
                    <Box className="bg" />
                    <Box className="card-front-img">
                        <img src={`https://ddragon.canisback.com/img/champion/centered/${randomChampImageToPrint}`} alt="Brand" />
                    </Box>
                    <Box className="card-info">
                        <Box className="card-info-section">
                            <Box className="card-info__faction">
                                <Box className="card-info__name"><Typography variant='h6'>{champ.mostPlayedChampName}</Typography></Box>
                                <Box display={'flex'} justifyContent={'center'} sx={{ marginLeft: '.6rem' }} ><Typography sx={{ fontSize: '.7rem', color: 'white', paddingBottom: '.3rem' }}>Score points: {champ.champPoints}</Typography> </Box>
                            </Box>
                            <Box className="card-info__avatar">
                                <img src={`https://ddragon.canisback.com/img/champion/tiles/${champ.mostPlayedChampName}_0.jpg`} />
                            </Box>
                        </Box>
                        <Box className="see-more">
                            Last time played: ayer
                        </Box>
                    </Box>
                </Card>
            )
        })
        return printed
    }

    const printCustomLolProfile = () => {
        return (
            <>
                {playerProfile.email === undefined ? 'cargando' :
                    <Grid container display={'flex'} justifyContent={'center'}>

                        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} m={3}>
                            <Grid item display={'flex'} justifyContent={'center'}>
                                <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                                    <Box marginTop={'-1rem'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                                        <Typography color='secondary' sx={{ fontFamily: 'FactionOutline', letterSpacing: '.5rem', marginBottom: '.6rem' }} className='font-face-gm' variant={'h1'}>{playerProfile.basicInfo.name}</Typography>
                                        <Typography variant={'h4'}>Mean stats last 10 games: </Typography>
                                        <List>
                                            <ListItem>Wins: {playerProfile.mean.wins}</ListItem>
                                            <ListItem>Average kills per game: {playerProfile.mean.kills}</ListItem>
                                            <ListItem>Average assists per game: {playerProfile.mean.assists}</ListItem>
                                            <ListItem>Average deaths per game: {playerProfile.mean.deaths}</ListItem>

                                        </List>
                                        <Typography variant={'h4'}>Most played champs: </Typography>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item display={'flex'} flexDirection={'row'} gap={1}>
                                {printThreeMostPlayedChampsCards()}
                            </Grid>

                        </Box>

                    </Grid>

                }
            </>
        )
    }


    const openCustomProfileModal = () => {
        return (
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} display={'flex'} flexDirection={'column'}>
                    {printCustomLolProfile()}
                </Box>
            </Modal>
        )
    }

    return (

        <Grid container justifyContent='center' mt={3} gap={2}>
            <Typography variant='h2' color='primary'>PLAYERS POOL</Typography>

            <Grid item display='flex' gap={3}>
                {offers ? offers.map(offer => <PlayerPoolCard openFullCustomProfile={() => {
                    setOpen(true)
                    setOpenProfile(true)
                    setSummoner(offer.basicInfo.name)
                    const found = offers.find(offerr => offer.email === offerr.email)
                    console.log('found', found)
                    setPlayerProfile(found)
                    setPlayerEmail(offer.email)

                }} role={offer.role} userName={offer.basicInfo.name} playerMessage={offer.playerDescription}></PlayerPoolCard>) : 'loading...'}
            </Grid>

            {openProfile ? openCustomProfileModal() : ''}

        </Grid>


    )
}