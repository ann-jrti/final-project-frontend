import { Grid, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './footer.css';

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer style={{ position: 'fixed', width: '100%', bottom: 0 }}>
      <Box margintop={5} height={'3rem'} bgcolor={'#2b2d42'}>
        <Box margin={4}>
          <Typography
            className="privacy"
            onClick={() => navigate('/privacy-policy')}
            color="white"
          >
            Política de privacidad
          </Typography>
        </Box>
        <Typography className="privacy" color="white">
          sfasfsa
        </Typography>
      </Box>
    </footer>
  );
}
