import * as React from 'react';
import { Card, CardContent, Box, CardMedia, Divider, Typography, CardActionArea } from '@mui/material';
import SeasonTable from './season-table/SeasonTable';
import StarIcon from '@mui/icons-material/Star';
import { BadgeOutlined, StayPrimaryLandscape, Whatshot, StarBorder } from '@mui/icons-material';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import styled from '@emotion/styled';
import { fetchRandomImage } from '../../../../riot-data-management/fetches/riot-fetches';


const StyleCard = styled(Card)`
width: 500px;
`


export default function InfoPlayerCard(props) {
    // fetchRandomImage();
    return (
        <>
            <StyleCard  >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="250"
                        image="https://images.contentstack.io/v3/assets/blt370612131b6e0756/blt9202e1cf0f60853c/5f7f79f9ee00c80ec595b0b8/lux_skin01.jpg"
                        alt="green iguana"
                    />

                    <CardContent >
                        <Box display={'flex'} flexDirection={'column'} gap={2}>
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
                            <Typography variant={'h5'}>This season</Typography>

                            <Box display={'flex'} gap={2} alignItems={'center'}>
                                <ThumbDownOutlinedIcon></ThumbDownOutlinedIcon>
                                <Typography variant="body2" color="text.secondary">Losses: {props.losses} </Typography>
                            </Box>
                            <Box display={'flex'} gap={2} alignItems={'center'}>
                                <ThumbUpOutlinedIcon></ThumbUpOutlinedIcon>
                                <Typography variant="body2" color="text.secondary">Wins: {props.wins}</Typography>
                            </Box>
                            <Box display={'flex'} gap={2} alignItems={'center'}>
                                <Whatshot></Whatshot>
                                <Typography variant="body2" color="text.secondary">{props.hotstreak}</Typography>
                            </Box>
                            <Box display={'flex'} gap={2} alignItems={'center'}>
                                <StarBorder></StarBorder>
                                <Typography variant="body2" color="text.secondary">{props.playing}</Typography>
                            </Box>

                        </Box>
                    </CardContent>
                </CardActionArea>
            </StyleCard>
            <SeasonTable></SeasonTable>
        </>


    );
}