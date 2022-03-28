import { Typography, Grid } from "@mui/material";
import SearchPlayer from "./components/search-player/search-player";
import { useTranslation } from 'react-i18next';
import InfoPlayerCard from "./components/info-player-card/InfoPlayerCard";
import { Image } from "@mui/icons-material";
import './style.css'

export default function Home() {
    const [t, i18n] = useTranslation("global");

    return (
        <>
            <Grid gap={3} container marginTop={5} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                <Typography variant='h3'>{t('home.slogan')}</Typography>
                {/* <iframe className='allistar-gif' onClick='disabled' src="https://giphy.com/embed/3oKIP73vEZmJjFNXtC" width="200" height="200" frameBorder="0" ></iframe> */}

                {/* <iframe className='allistar-gif' src="https://giphy.com/embed/lqut5VxPEhP9zCJdUT" onClick='disabled' width="200" height="200" frameBorder="0"  ></iframe> */}

                <SearchPlayer></SearchPlayer>
            </Grid>
        </>


    )
}