import * as React from 'react';
import { Card, CardContent, Grid, Box, CardMedia, Divider, Typography, CardActionArea } from '@mui/material';
import styled from '@emotion/styled';
import ironIcon from '../../../assets/tier-icons/iron-icon.webp';
import bronzeIcon from '../../../assets/tier-icons/bronze-icon.webp';
import silverIcon from '../../../assets/tier-icons/silver-icon.webp';
import goldIcon from '../../../assets/tier-icons/gold-icon.webp';
import platIcon from '../../../assets/tier-icons/platinum-icon.webp';
import diamondIcon from '../../../assets/tier-icons/diamond-icon.webp';
import challengerIcon from '../../../assets/tier-icons/challenger-icon.webp';
import masterIcon from '../../../assets/tier-icons/master-icon.webp';
import grandmasterIcon from '../../../assets/tier-icons/grandmaster-icon.webp';
import level50 from '../../../assets/level-icons/level_50-74.png'

const StyleCard = styled(Card)`
max-width: 200rem;
margin: 2rem;

`

export default function InfoPlayerCard(props) {

    const tierIcons = {
        'IRON': ironIcon,
        'BRONZE': bronzeIcon,
        'SILVER': silverIcon,
        'GOLD': goldIcon,
        'PLATINUM': platIcon,
        'DIAMOND': diamondIcon,
        'CHALLENGER': challengerIcon,
        'MASTER': masterIcon,
        'GRANDMASTER': grandmasterIcon
    }



    return (
        <>
            {/* <Grid container display={'flex'} justifyContent={'center'}> */}
            <StyleCard  >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="300"
                        image={props.image}
                        alt="green iguana"
                    />

                    <CardContent >

                        <Box display={'flex'} flexDirection={'column'} gap={1}>
                            <Box display={'flex'} justifyContent={'center'} flexDirection='column' alignItems='center' >

                                <img style={{ maxWidth: '4.5rem', maxHeight: '4.5rem', borderRadius: '50%', position: 'absolute', marginBottom: '7rem', border: '.3rem solid #8d99ae', backgroundColor: '#8d99ae' }} className='search-player-avatar-icon' src={props.imgSrc}></img>

                                <Typography paddingTop={2} marginBottom={1} gutterBottom variant="h3" component="div">{props.name}</Typography>

                            </Box>
                            <Divider sx={{ marginBottom: '.8rem' }} />


                            <Box display='flex' gap={4} flexDirection='row' justifyContent='center' marginTop={-3}>
                                <Box display={'flex'} flexDirection='column' justifyContent='center' alignItems={'center'}>
                                    {/* <BadgeOutlined></BadgeOutlined> */}
                                    <Box >
                                        <img width={100} src={level50}></img>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary">Summoner level</Typography>
                                    <Typography variant='h5'>{props.level}</Typography>

                                </Box>

                                <Box display={'flex'} gap={1} flexDirection='column' justifyContent='center' marginBottom={1.7} alignItems={'center'}>
                                    <Box marginBottom={-3}>
                                        <img src={tierIcons[props.rankIcon]}></img>
                                    </Box>
                                    <Box display='flex' flexDirection='column' alignItems='center'>
                                        <Typography variant="body2" color="text.secondary">{props.queue}</Typography>
                                        <Typography variant='h5'>{props.rank}</Typography>
                                    </Box>
                                </Box>

                            </Box>
                            <Divider />

                            <Box display={'flex'} flexDirection={'column'} gap={2}>

                                <Box display={'flex'} flexDirection='column' gap={2}>
                                    <Box display='flex' justifyContent='center' >
                                        <Typography variant={'h5'}>This season</Typography>
                                    </Box>
                                </Box>

                                <Box display='flex' justifyContent='center' gap={3}>
                                    <Box display='flex' gap={4} flexDirection='row' justifyContent='center' alignItems='center'>
                                        {/* <Typography variant={'h4'}>Queue Type: {props.queue}</Typography> */}
                                        <Box display={'flex'} gap={1} alignItems={'center'}>
                                            {/* <ThumbUpOutlinedIcon></ThumbUpOutlinedIcon> */}
                                            <Typography variant="body2" color="text.secondary">Wins: {props.wins}</Typography>
                                        </Box>

                                        <Box display={'flex'} gap={1} alignItems={'center'}>
                                            {/* <ThumbDownOutlinedIcon></ThumbDownOutlinedIcon> */}
                                            <Typography variant="body2" color="text.secondary">Losses: {props.losses} </Typography>
                                        </Box>


                                        <Box display={'flex'} gap={1} alignItems={'center'}>
                                            {/* <StarBorder></StarBorder> */}
                                            <Typography variant="body2" color="text.secondary">{props.playing}</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </CardActionArea>
            </StyleCard>
            {/* </Grid> */}
        </>


    );
}