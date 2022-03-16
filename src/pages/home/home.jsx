import { Typography, Grid } from "@mui/material"
import SearchPlayer from "./search-player/search-player"

export default function Home() {

    return (
        <>
            <Grid gap={3} container marginTop={5} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                <Typography variant='h2'>Cool slogan</Typography>
                <SearchPlayer></SearchPlayer>
            </Grid>
        </>


    )
}