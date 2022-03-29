import { Grid, TextField, Box } from "@mui/material"
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


        <Grid sm={12} md={6} item>
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={2} >
                <SearchIcon></SearchIcon>
                <form onSubmit={handleSubmit}>

                    <TextField fullWidth id="searchPlayer" label={searchPlayer} variant="outlined" />
                </form>


            </Box>
        </Grid>



    )
}