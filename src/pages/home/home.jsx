import { Typography, Grid, Box } from "@mui/material";
import SearchPlayer from "./components/search-player/search-player";
import { useTranslation } from 'react-i18next';
import './style.css';
import screenLoader from '../../assets/video-home/lol-home-video2.mp4'

export default function Home() {
    const [t, i18n] = useTranslation("global");
    return (
        <>
            <Grid gap={3} container marginTop={5} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                <Grid item>
                    <SearchPlayer></SearchPlayer>
                </Grid>
                <Grid item sm={12}>
                    <Box sx={{ width: '100%' }}>
                        <video className='videoTag' autoPlay loop muted>
                            <source src={screenLoader} type='video/mp4' />
                        </video>
                    </Box>
                </Grid>
                <Grid sm={12} item display='flex' justifyContent='center' alignItems='center' sx={{ position: 'absolute' }}>
                    <Box sx={{ position: 'absolute', opacity: .2 }} >
                        <Typography sx={{ fontFamily: 'FactionBlack', textTransform: 'uppercase', textAlign: 'center', letterSpacing: '.1rem' }} color='secondary' variant='h1'>{t('home.slogan')}</Typography>
                    </Box>
                    <Box sx={{ position: 'absolute' }} >
                        <Typography sx={{ fontFamily: 'FactionOutline', textTransform: 'uppercase', textAlign: 'center', letterSpacing: '.1rem' }} color='white' variant='h1'>{t('home.slogan')}</Typography>
                    </Box>
                </Grid>

                {/* <iframe className='allistar-gif' onClick='disabled' src="https://giphy.com/embed/3oKIP73vEZmJjFNXtC" width="200" height="200" frameBorder="0" ></iframe> */}

                {/* <iframe className='allistar-gif' src="https://giphy.com/embed/lqut5VxPEhP9zCJdUT" onClick='disabled' width="200" height="200" frameBorder="0"  ></iframe> */}


            </Grid>
        </>


    )
}