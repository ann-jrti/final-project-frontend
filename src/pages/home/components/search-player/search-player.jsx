import { Grid, Paper, TextField, Box, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from "react-i18next";



export default function SearchPlayer() {
    const [t, i18n] = useTranslation("global");
    const searchPlayer = t('home.search-bar.search-player')

    return (
        <>

            <Grid sm={12} md={6} item>
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={2} >
                    <SearchIcon></SearchIcon>
                    <TextField fullWidth id="outlined-basic" label={searchPlayer} variant="outlined" />
                </Box>
            </Grid>

        </>
    )
}