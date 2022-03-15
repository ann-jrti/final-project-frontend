import { Box } from "@mui/system"
import SearchPlayer from "./search-player/search-player"

export default function Home() {

    return (
        <>
            <Box sx={{ display: 'grid' }}>
                <p>Home</p>
                <SearchPlayer></SearchPlayer>
            </Box>
        </>


    )
}