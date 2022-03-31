import { Grid, Box, Typography } from "@mui/material"
import { useNavigate } from 'react-router-dom';

export default function Footer() {
    const navigate = useNavigate();
    return (
        <footer style={{ position: "fixed", width: '100%', bottom: 0 }}>
            <Box margintop={5} height={'3rem'} bgcolor={'#2b2d42'}>
                <Typography onClick={()=> navigate('/privacy-policy')} color='white'> Política de privacidad</Typography>
 
            </Box>
        </footer>
    )
}