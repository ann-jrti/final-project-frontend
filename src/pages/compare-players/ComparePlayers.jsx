import { Grid, Box, Typography, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import vsIcon from '../../assets/emotes/soraka-fine.webp';
import PlayerResults from '../playerResultsSearch/PlayerResults';

export default function ComparePlayers() {
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [player1Data, setPlayer1Data] = useState(null);
  const [player2Data, setPlayer2Data] = useState(null);

  const handleSubmitPlayer1 = (e) => {
    e.preventDefault();
    console.log(e.target.playerSearch.value);
    setPlayer1(e.target.playerSearch.value);
  };

  const handleSubmitPlayer2 = (e) => {
    e.preventDefault();
    console.log(e.target.playerSearch2.value);
    setPlayer2(e.target.playerSearch2.value);
  };
  console.log(player2Data);
  console.log(player1Data);

  return (
    <Grid container>
      <></>
      <Grid item sm={6} sx={{ backgroundColor: '#c5ccda' }}>
        <Box
          gap={1}
          display="flex"
          alignItems="center"
          flexDirection="column"
          m={3}
          sx={{ height: '100vh' }}
        >
          <Typography color="primary" variant="h4">
            Player 1
          </Typography>
          <form onSubmit={handleSubmitPlayer1}>
            <TextField
              //   onChange={(e) => setPlayer1(e.target.value)}
              //   value={player1}
              id="playerSearch"
            />
          </form>
          {player1 && (
            <PlayerResults
              playerSearchData={(playerSearchData) =>
                setPlayer1Data(playerSearchData)
              }
              hideSearch={true}
              search={player1}
            ></PlayerResults>
          )}
        </Box>
      </Grid>
      <Grid item>
        <Box sx={{ position: 'absolute', marginLeft: '-6rem' }}>
          <img width={180} src={vsIcon}></img>
        </Box>
      </Grid>
      <Grid item sx={{ backgroundColor: '#3d405b' }} sm={6}>
        <Box
          gap={1}
          display="flex"
          alignItems="center"
          flexDirection="column"
          m={3}
          sx={{ height: '100vh' }}
        >
          <Typography color="white" variant="h4">
            Player 2
          </Typography>
          <form onSubmit={handleSubmitPlayer2}>
            <TextField
              //   onChange={(e) => setPlayer1(e.target.value)}
              //   value={player1}
              id="playerSearch2"
            />
          </form>
          {player2 && (
            <PlayerResults
              playerSearchData={(playerSearchData) =>
                setPlayer2Data(playerSearchData)
              }
              hideSearch={true}
              search={player2}
            ></PlayerResults>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
