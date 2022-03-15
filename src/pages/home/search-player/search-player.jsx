import { TextField } from "@mui/material"
import styled from "@emotion/styled";
import { Grid, Paper, Box } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';

export default function SearchPlayer() {
    return (
        <>
            <Grid container flexDirection={'row'} justifyContent={'center'} padding={3}>
                <Grid sm={12} md={6} item>
                    <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={2} >
                        <SearchIcon></SearchIcon>
                        <TextField fullWidth id="outlined-basic" label="Search a player" variant="outlined" />
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}