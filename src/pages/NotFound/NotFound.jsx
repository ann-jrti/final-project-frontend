import { Typography, Grid, Box, Button } from '@mui/material';
import React from 'react';
import notFoundIcon from '../../assets/emotes/what-emote.webp';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Grid
      container
      display="flex"
      flexDirection="column"
      sm={12}
      justifyContent="center"
      gap={2}
      mt={10}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h4">Are you lost?</Typography>
        </Grid>

        <Grid item>
          <img className="not-found-img" src={notFoundIcon}></img>
        </Grid>

        <Grid item>
          <Button
            className="btn btn-offer"
            onClick={() => navigate('/')}
            variant="contained"
          >
            Take me back home
          </Button>
        </Grid>
      </Box>
    </Grid>
  );
}
