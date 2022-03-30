import { Grid, Box, Typography } from "@mui/material"
export default function Footer() {

    return (
        <footer style={{ position: "fixed", width: '100%', bottom: 0 }}>
            <Box margintop={5} height={'3rem'} bgcolor={'#2b2d42'}>
                <Typography color='white'> Política de privacidad</Typography>
                <Typography color='white'> Política de privacidad</Typography>
            </Box>
        </footer>
    )
}