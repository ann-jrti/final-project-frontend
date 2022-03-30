import { Grid, TextField, Box, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function SearchPlayer() {
    const [t, i18n] = useTranslation("global");
    const searchPlayer = t('home.search-bar.search-player');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate(`player-results?player=${e.target.searchPlayer.value}`)
    }

    return (


        <Grid item>
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={2} >

                <Typography variant='h5' color='primary'>Look for a player stats</Typography>

                <form onSubmit={handleSubmit}>

                    <TextField sx={{ width: '20rem' }} id="searchPlayer" label={searchPlayer} variant="outlined" />
                </form>
                <SearchIcon sx={{ ":hover": 'cursor' }}></SearchIcon>

            </Box>
        </Grid>



    )
}