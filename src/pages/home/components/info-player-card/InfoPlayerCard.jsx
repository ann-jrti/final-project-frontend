import * as React from 'react';
import { Card, CardContent, Grid, Box, CardMedia, Divider, Typography, CardActionArea } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { BadgeOutlined, Whatshot, StarBorder } from '@mui/icons-material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import styled from '@emotion/styled';



const StyleCard = styled(Card)`
max-width: 700px;
margin: 2rem;
`

export default function InfoPlayerCard(props) {


    return (
        <>
            {/* <Grid container display={'flex'} justifyContent={'center'}> */}
            <StyleCard  >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="350"
                        image={props.image}
                        alt="green iguana"
                    />

                    <CardContent >

                        <Box display={'flex'} flexDirection={'column'} gap={1}>

                            <Box display={'flex'} justifyContent={'center'}>
                                <Typography gutterBottom variant="h3" component="div">{props.name}</Typography>
                            </Box>

                            <Box display={'flex'} gap={2} alignItems={'center'}>
                                <BadgeOutlined></BadgeOutlined>
                                <Typography variant="body2" color="text.secondary">Summoner level: {props.level}</Typography>
                            </Box>
                            <Box display={'flex'} gap={2} alignItems={'center'}>
                                <StarIcon></StarIcon>
                                <Typography variant="body2" color="text.secondary">Current rank: {props.rank}</Typography>
                            </Box>
                            <Divider />

                            <Box display={'flex'} flexDirection={'row'} gap={2}>

                                <Box display={'flex'} flexDirection={'column'} gap={2}>
                                    <Typography variant={'h5'}>This season</Typography>

                                    <Box display={'flex'} gap={2} alignItems={'center'}>
                                        <ThumbDownOutlinedIcon></ThumbDownOutlinedIcon>
                                        <Typography variant="body2" color="text.secondary">Losses: {props.losses} </Typography>
                                    </Box>
                                    <Box display={'flex'} gap={2} alignItems={'center'}>
                                        <ThumbUpOutlinedIcon></ThumbUpOutlinedIcon>
                                        <Typography variant="body2" color="text.secondary">Wins: {props.wins}</Typography>
                                    </Box>
                                </Box>

                                <Box display={'flex'}>
                                    <Box display={'flex'} gap={2} alignItems={'center'}>
                                        <StarBorder></StarBorder>
                                        <Typography variant="body2" color="text.secondary">{props.playing}</Typography>
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