import { TextField } from "@mui/material"
import { Grid, Paper, Box, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';


export default function SearchPlayer() {

    return (
        <>

            <Grid sm={12} md={6} item>
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={2} >
                    <SearchIcon></SearchIcon>
                    <TextField fullWidth id="outlined-basic" label="Search a player" variant="outlined" />
                </Box>
            </Grid>

        </>
    )
}