import { Typography, Grid } from "@mui/material";
import SearchPlayer from "./components/search-player/search-player";
import { useTranslation } from 'react-i18next';
import InfoPlayerCard from "./components/info-player-card/InfoPlayerCard";
import { Image } from "@mui/icons-material";

export default function Home() {
    const [t, i18n] = useTranslation("global");

    return (
        <>
            <Grid gap={3} container marginTop={5} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                <Typography variant='h3'>{t('home.slogan')}</Typography>
                <SearchPlayer></SearchPlayer>
            </Grid>
        </>


    )
}