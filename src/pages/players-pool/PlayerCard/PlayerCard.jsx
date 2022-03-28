import * as React from 'react';
import Card from '@mui/material/Card';
import { Grid, Box } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import adcIcon from './icons/bottom_icon.webp'
import jungleIcon from './icons/jungle_icon.webp'
import midIcon from './icons/middle_icon.webp'
import supportIcon from './icons/support_icon.webp'
import topIcon from './icons/top_icon.webp'


export default function PlayerCard(props) {
    const roles = {
        'Top': topIcon,
        'Mid': midIcon,
        'Jungle': jungleIcon,
        'Adc': adcIcon,
        'Support': supportIcon
    }

    const iconByRole = (role) => roles[role]

    return (

        <Card sx={{ minWidth: 300, border: '1px solid #8d99ae' }}>
            <Box display='flex' justifyContent={'center'}>
                <Grid item m={1} >
                    <CardContent>
                        <Typography sx={{ fontFamily: 'FactionOutline', letterSpacing: '.2rem' }} variant="h3" color="secondary" component="div">
                            {props.userName}
                        </Typography>
                        <Typography mb={1} borderBottom={'1px solid black'} sx={{ fontSize: 14, fontStyle: 'italic' }} color="text.secondary" gutterBottom>
                            is looking for a team...
                        </Typography>
                        <Typography sx={{ mb: 1, mt: 1 }} color="text.secondary">
                            Main role: {props.role}
                        </Typography>
                        <Typography variant="body2">
                            Player message: {props.playerMessage}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Box display='flex' justifyContent='center'>
                            <Button variant='contained' color='error' size="small"><Typography variant='subtitle2' color='white'>See full player profile</Typography></Button>
                        </Box>
                    </CardActions>
                </Grid>
                <Grid item m={2}>
                    <Box border='2px solid #8d99ae' sx={{ borderRadius: '50%' }} p={1}>
                        <img src={iconByRole(props.role)}></img>
                    </Box>

                </Grid>
            </Box>
        </Card>
    );
}
