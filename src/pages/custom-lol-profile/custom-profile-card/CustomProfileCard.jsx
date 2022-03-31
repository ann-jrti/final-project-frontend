import './style.css';
import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Divider } from '@mui/material';
import poroAvatar from '../../../assets/imgs/fat-poro.webp';
import { getUserLolAccountData } from '../../../db-requests';
import { champsImages } from '../../../riot-data-management/img-urls';
import adcIcon from '../../../assets/roles-icons/bottom_icon.png';
import jungleIcon from '../../../assets/roles-icons/jungle_icon.png';
import midIcon from '../../../assets/roles-icons/middle_icon.png';
import supportIcon from '../../../assets/roles-icons/support_icon.png';
import topIcon from '../../../assets/roles-icons/top_icon.png';

import provisionalIcon from '../../../assets/tier-icons/bronze-icon.png';
import silverIcon from '../../../assets/tier-icons/silver-icon.png';
import goldIcon from '../../../assets/tier-icons/gold-icon.png';
import platIcon from '../../../assets/tier-icons/platinum-icon.png';
import diamondIcon from '../../../assets/tier-icons/diamond-icon.png';
import grandmasterIcon from '../../../assets/tier-icons/challenger-icon.png';
import masterIcon from '../../../assets/tier-icons/master-icon.png';

export default React.memo(function CustomProfileCard() {
  const [playerData, setPlayerData] = useState({});
  const tierIcons = {
    PROVISIONAL: provisionalIcon,
    SILVER: silverIcon,
    GOLD: goldIcon,
    PLATINUM: platIcon,
    DIAMOND: diamondIcon,
    GRANDMASTER: grandmasterIcon,
    MASTER: masterIcon,
  };
  const gameRoles = {
    top: topIcon,
    mid: midIcon,
    jungle: jungleIcon,
    adc: adcIcon,
    support: supportIcon,
  };

  const formatQueueType = (str) => {
    const formatedStr = str
      .split('_')
      .map(
        (letter) =>
          letter[0].toUpperCase() +
          letter.substring(1, letter.length).toLowerCase()
      )
      .join(' ');
    return formatedStr;
  };

  const getPlayerData = async () => {
    const data = await getUserLolAccountData(localStorage.getItem('email'));
    console.log('data 13', data);

    setPlayerData(data);
  };

  const print = () => {
    const printed = playerData.firstThreeChampsMostPlayed.map((champ) => {
      const champImagesInAssets = champsImages.filter((c) => {
        const champName = c.split('_');
        return champName[0] === champ.mostPlayedChampName;
      });
      const randomChampImageToPrint =
        champImagesInAssets[
          Math.floor(Math.random() * champImagesInAssets.length)
        ];

      return (
        <div key={champ.lastTimePlayed} className="card">
          <div className="bg" />
          <div className="card-front-img">
            <img
              src={`https://ddragon.canisback.com/img/champion/centered/${randomChampImageToPrint}`}
              alt="Brand"
            />
          </div>
          <div className="card-info">
            <div className="card-info-section">
              <div className="card-info__faction">
                <div className="card-info__name">
                  {champ.mostPlayedChampName}
                </div>
                <div className="card-info__points">
                  Score points: {champ.champPoints}{' '}
                </div>
              </div>
              <div className="card-info__avatar">
                <img
                  src={`https://ddragon.canisback.com/img/champion/tiles/${champ.mostPlayedChampName}_0.jpg`}
                />
              </div>
            </div>
            <div className="see-more">Last time played: 20/03</div>
          </div>
        </div>
      );
    });
    return printed;
  };

  useEffect(() => {
    getPlayerData();
  }, []);

  const getSummonerIconUrl = (iconId) => {
    localStorage.setItem(
      'summoner-icon',
      `https://ddragon.leagueoflegends.com/cdn/12.6.1/img/profileicon/${iconId}.png`
    );
    return `https://ddragon.leagueoflegends.com/cdn/12.6.1/img/profileicon/${iconId}.png`;
  };

  return (
    <>
      {playerData.email === undefined ? (
        'cargando'
      ) : (
        <Grid container display={'flex'} justifyContent={'center'}>
          <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            m={3}
          >
            <Grid item display={'flex'} justifyContent={'center'}>
              <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
              >
                <Box>
                  <img
                    className="avatar-profile"
                    src={getSummonerIconUrl(playerData.basicInfo.iconId)}
                  ></img>
                </Box>

                <Box
                  marginTop={'-1rem'}
                  display={'flex'}
                  flexDirection={'column'}
                  alignItems={'center'}
                >
                  <Typography
                    color="secondary"
                    sx={{
                      fontFamily: 'FactionOutline',
                      letterSpacing: '.5rem',
                      marginBottom: '.6rem',
                    }}
                    className="font-face-gm"
                    variant={'h1'}
                  >
                    {playerData.basicInfo.name}
                  </Typography>

                  <Box
                    m={2}
                    p={1.5}
                    pl={3}
                    pr={3}
                    flexDirection="row"
                    backgroundColor="#3d405b"
                    borderRadius={'.7rem'}
                    display="flex"
                    gap={2}
                    alignItems="center"
                    justifyContent="center"
                    variant="h5"
                  >
                    <Box>
                      <Typography color="white" variant="h6">
                        MOST PLAYED ROLE
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        borderLeft: '1px solid #8d99ae',
                        paddingLeft: '1rem',
                      }}
                    >
                      <img
                        width={60}
                        src={gameRoles[playerData.mostPlayedRole[0]]}
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        color="gainsboro"
                        sx={{ fontWeight: 'bold' }}
                      >
                        {playerData.mostPlayedRole[0].toUpperCase()}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        color="white"
                        sx={{ fontStyle: 'italic' }}
                        variant="body2"
                      >
                        {playerData.mostPlayedRole[1]} times played in last 15
                        games
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    m={2}
                    flexDirection="row"
                    pl={2}
                    pr={2}
                    border="1px solid rgb(207, 207, 207)"
                    borderRadius={'.7rem'}
                    display="flex"
                    gap={2}
                    alignItems="center"
                    justifyContent="center"
                    variant="h5"
                  >
                    <Typography color="primary" variant="h6">
                      CURRENT RANK
                    </Typography>
                    <img
                      width={120}
                      src={tierIcons[playerData.seasonInfo[0].tier]}
                    />
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{ fontWeight: 'bold' }}
                    >
                      {playerData.seasonInfo[0].tier}{' '}
                      {playerData.seasonInfo[0].rank}
                    </Typography>
                  </Box>

                  {/* /* mean stats*  */}
                  <Box display="flex" gap={3}>
                    <Grid
                      item
                      pr={3}
                      sx={{ borderRight: '1px solid rgb(207, 207, 207)' }}
                    >
                      <Box display="flex" marginTop={2} marginBottom={3}>
                        <Typography variant={'h5'} color="primary">
                          MEAN STATS LAST 15 GAMES
                        </Typography>
                      </Box>

                      <Box display="flex" flexDirection="column" gap={2}>
                        <Box
                          display="flex"
                          justifyContent="flex-start"
                          flexDirection="row"
                          alignItems="center"
                          gap={1}
                        >
                          <Typography sx={{ fontSize: '1rem' }}>
                            Wins:
                          </Typography>
                          <Typography
                            variant="h6"
                            color="primary"
                            sx={{ fontWeight: 'bold' }}
                          >
                            {playerData.mean.wins.toFixed(1)}
                          </Typography>
                        </Box>

                        <Box
                          display="flex"
                          justifyContent="flex-start"
                          flexDirection="row"
                          alignItems="center"
                          gap={1}
                        >
                          <Typography sx={{ fontSize: '1rem' }}>
                            Average kills per game:
                          </Typography>
                          <Typography
                            variant="h6"
                            color="primary"
                            sx={{ fontWeight: 'bold' }}
                          >
                            {playerData.mean.kills.toFixed(1)}
                          </Typography>
                        </Box>

                        <Box
                          display="flex"
                          justifyContent="flex-start"
                          flexDirection="row"
                          alignItems="center"
                          gap={1}
                        >
                          <Typography sx={{ fontSize: '1rem' }}>
                            Average assists per game:
                          </Typography>
                          <Typography
                            variant="h6"
                            color="primary"
                            sx={{ fontWeight: 'bold' }}
                          >
                            {playerData.mean.assists.toFixed(1)}
                          </Typography>
                        </Box>

                        <Box
                          display="flex"
                          justifyContent="flex-start"
                          flexDirection="row"
                          alignItems="center"
                          gap={1}
                        >
                          <Typography sx={{ fontSize: '1rem' }}>
                            Average deaths per game:
                          </Typography>
                          <Typography
                            variant="h6"
                            color="primary"
                            sx={{ fontWeight: 'bold' }}
                          >
                            {playerData.mean.deaths.toFixed(1)}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item>
                      <Box
                        display="flex"
                        marginTop={2}
                        marginBottom={3}
                        justifyContent="flex-start"
                      >
                        <Typography variant={'h5'} color="primary">
                          THIS SEASON DATA
                        </Typography>
                      </Box>

                      <Box display="flex" flexDirection="column" gap={2}>
                        <Box
                          display="flex"
                          justifyContent="flex-start"
                          flexDirection="row"
                          alignItems="center"
                          gap={1}
                        >
                          <Typography sx={{ fontSize: '1rem' }}>
                            Wins
                          </Typography>
                          <Typography
                            variant="h6"
                            color="primary"
                            sx={{ fontWeight: 'bold' }}
                          >
                            {playerData.seasonInfo[0].wins}
                          </Typography>
                        </Box>

                        <Box
                          display="flex"
                          justifyContent="flex-start"
                          flexDirection="row"
                          alignItems="center"
                          gap={1}
                        >
                          <Typography sx={{ fontSize: '1rem' }}>
                            Losses
                          </Typography>
                          <Typography
                            variant="h6"
                            color="primary"
                            sx={{ fontWeight: 'bold' }}
                          >
                            {playerData.seasonInfo[0].losses}
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="flex-start"
                          flexDirection="row"
                          alignItems="center"
                          gap={1}
                        >
                          <Typography>Queue type:</Typography>
                          <Typography
                            variant="h6"
                            color="primary"
                            sx={{ fontWeight: 'bold' }}
                          >
                            {formatQueueType(
                              playerData.seasonInfo[0].queueType
                            )}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Box
              mt={4}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                sx={{
                  backgroundColor: '#ced5e2',
                  padding: '2rem',
                  borderRadius: '2rem',
                  maxHeight: 'auto',
                }}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Typography
                  sx={{
                    letterSpacing: '.3variant="h6" rem',
                    fontWeight: 'bold',
                  }}
                  variant={'h4'}
                  color="#3d405b"
                >
                  MOST PLAYED CHAMPS{' '}
                </Typography>
                <Grid item display={'flex'} flexDirection={'row'} gap={3}>
                  {print()}
                </Grid>
              </Box>
            </Box>
          </Box>
        </Grid>
      )}
    </>
  );
});
