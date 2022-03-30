import * as React from 'react';
import Card from '@mui/material/Card';
import { Grid, Box } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import adcIcon from '../../../assets/roles-icons/bottom_icon.png'
import jungleIcon from '../../../assets/roles-icons/jungle_icon.png'
import midIcon from '../../../assets/roles-icons/middle_icon.png'
import supportIcon from '../../../assets/roles-icons/support_icon.png'
import topIcon from '../../../assets/roles-icons/top_icon.png'


export default function PlayerPoolCard(props) {
    const roles = {
        'Top': topIcon,
        'Mid': midIcon,
        'Jungle': jungleIcon,
        'Adc': adcIcon,
        'Support': supportIcon
    }

    const iconByRole = (role) => roles[role]


    return (
        <Grid item sm={12}>
            <Card sx={{ minWidth: 300, border: '1px solid #8d99ae' }}>
                <Box display='flex' justifyContent={'center'}>
                    <Grid item m={1} >
                        <CardContent>
                            <Typography sx={{ fontFamily: 'FactionOutline', letterSpacing: '.2rem' }} variant="h3" color="secondary" component="div">
                                {props.userName}
                            </Typography>
                            <Typography mb={1} mt={.5} borderBottom={'1px solid black'} sx={{ fontSize: 14, fontStyle: 'italic' }} color="text.secondary" gutterBottom>
                                {props.lookingFor}
                            </Typography>
                            <Box display='flex' flexDirection='row'>
                                <Typography sx={{ mb: 1, mt: 1 }} color="primary">
                                    Main role: <Typography>{props.role}</Typography>
                                </Typography>
                            </Box>


                            <Typography variant="body2">
                                Player message: {props.playerMessage}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Box display='flex' justifyContent='center'>
                                <Button onClick={props.openFullCustomProfile} variant='contained' color='error' size="small"><Typography variant='subtitle2' color='white'>See full player profile</Typography></Button>
                            </Box>
                        </CardActions>
                    </Grid>
                    <Grid item m={2}>
                        <Box border='2px solid #8d99ae' sx={{ borderRadius: '50%' }} p={1}>
                            <img width={50} src={iconByRole(props.role)}></img>
                        </Box>

                    </Grid>
                </Box>
            </Card>
        </Grid>
    );
}
