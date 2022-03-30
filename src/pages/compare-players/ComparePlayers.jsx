import { Grid, Box, Typography, TextField } from "@mui/material";
import vsIcon from '../../assets/emotes/soraka-fine.webp'

export default function ComparePlayers() {

    return (
        <Grid container>
            <Grid item sm={6} sx={{ backgroundColor: '#c5ccda' }}>

                <Box gap={1} display='flex' alignItems='center' flexDirection='column' m={3} sx={{ height: '100vh' }}>
                    <Typography color='primary' variant='h4'>Player 1</Typography>
                    <TextField />
                </Box>

            </Grid>
            <Grid item >
                <Box sx={{ position: 'absolute', marginLeft: '-6rem' }}>
                    <img width={180} src={vsIcon}></img>
                </Box>

            </Grid>
            <Grid item sx={{ backgroundColor: '#3d405b' }} sm={6}>

                <Box gap={1} display='flex' alignItems='center' flexDirection='column' m={3} sx={{ height: '100vh' }}>
                    <Typography color='white' variant='h4'>Player 2</Typography>
                    <TextField />
                </Box>
            </Grid>
        </Grid>
    )
}