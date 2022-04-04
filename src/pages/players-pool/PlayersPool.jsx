import React, { useEffect, useState } from 'react';
import PlayerPoolCard from './PlayerPoolCard/PlayerPoolCard';
import {
  Grid,
  Typography,
  Modal,
  Card,
  Box,
  List,
  ListItem,
} from '@mui/material';
import { getPlayersPool, getUserLolAccountData } from '../../db-requests';
import { champsImages } from '../../riot-data-management/img-urls';
import poroAvatar from '../../assets/imgs/fat-poro.webp';

import adcIcon from '../../assets/roles-icons/jungle_icon.png';
import jungleIcon from '../../assets/roles-icons/jungle_icon.png';
import midIcon from '../../assets/roles-icons/middle_icon.png';
import supportIcon from '../../assets/roles-icons/support_icon.png';
import topIcon from '../../assets/roles-icons/top_icon.png';

import provisionalIcon from '../..//assets/tier-icons/provisional-icon.png';
import silverIcon from '../../assets/tier-icons/silver-icon.png';
import goldIcon from '../../assets/tier-icons/gold-icon.png';
import platIcon from '../../assets/tier-icons/platinum-icon.png';
import diamondIcon from '../../assets/tier-icons/diamond-icon.png';
import challengerIcon from '../../assets/tier-icons/challenger-icon.png';
import grandmasterIcon from '../../assets/tier-icons/grandmaster-icon.png';
import masterIcon from '../../assets/tier-icons/master-icon.png';

export default function PlayersPool() {
  const [offers, setOffers] = useState(null);
  let [summoner, setSummoner] = useState('');
  const [openProfile, setOpenProfile] = useState(false);
  const [playerProfile, setPlayerProfile] = useState({});

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
  const tierIcons = {
    PROVISIONAL: provisionalIcon,
    SILVER: silverIcon,
    GOLD: goldIcon,
    PLATINUM: platIcon,
    DIAMOND: diamondIcon,
    GRANDMASTER: grandmasterIcon,
    CHALLENGER: challengerIcon,
    MASTER: masterIcon,
  };
  const gameRoles = {
    top: topIcon,
    mid: midIcon,
    jungle: jungleIcon,
    adc: adcIcon,
    support: supportIcon,
  };

  const getSummonerIconUrl = (iconId) => {
    localStorage.setItem(
      'summoner-icon',
      `https://ddragon.leagueoflegends.com/cdn/12.6.1/img/profileicon/${iconId}.png`
    );
    return `https://ddragon.leagueoflegends.com/cdn/12.6.1/img/profileicon/${iconId}.png`;
  };
  useEffect(async () => {
    const playersPool = await getPlayersPool();
    setOffers(playersPool);
  }, []);
  const style = {
    position: 'absolute',
    padding: '2rem',
    top: '50%',
    left: '50%',
    maxHeight: '100vh',
    overflowY: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #df1638',
    boxShadow: 24,
    p: 4,
  };

  const printThreeMostPlayedChampsCards = () => {
    const printed = playerProfile.firstThreeChampsMostPlayed.map((champ) => {
      const champImagesInAssets = champsImages.filter((c) => {
        const champName = c.split('_');
        return champName[0] === champ.mostPlayedChampName;
      });
      const randomChampImageToPrint =
        champImagesInAssets[
          Math.floor(Math.random() * champImagesInAssets.length)
        ];

      return (
        <Card
          sx={{ maxWidth: '250px', maxHeight: '250px' }}
          key={champ.lastTimePlayed}
          className="card"
        >
          <Box className="bg" />
          <Box className="card-front-img">
            <img
              src={`https://ddragon.canisback.com/img/champion/centered/${randomChampImageToPrint}`}
              alt="Brand"
            />
          </Box>
          <Box className="card-info">
            <Box className="card-info-section">
              <Box className="card-info__faction">
                <Box className="card-info__name">
                  <Typography variant="h6">
                    {champ.mostPlayedChampName}
                  </Typography>
                </Box>
                <Box
                  display={'flex'}
                  justifyContent={'center'}
                  sx={{ marginLeft: '.6rem' }}
                >
                  <Typography
                    sx={{
                      fontSize: '.7rem',
                      color: 'white',
                      paddingBottom: '.3rem',
                    }}
                  >
                    Score points: {champ.champPoints}
                  </Typography>{' '}
                </Box>
              </Box>
              <Box className="card-info__avatar">
                <img
                  src={`https://ddragon.canisback.com/img/champion/tiles/${champ.mostPlayedChampName}_0.jpg`}
                />
              </Box>
            </Box>
            <Box className="see-more">Last time played: 29/03</Box>
          </Box>
        </Card>
      );
    });
    return printed;
  };
  console.log(offers);
  const printCustomLolProfile = () => {
    return (
      <>
        {playerProfile.email === undefined ? (
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
                      src={getSummonerIconUrl(playerProfile.basicInfo.iconId)}
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
                      {playerProfile.basicInfo.name}
                    </Typography>

                    <Box
                      m={2}
                      p={1.5}
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
                        <img src={gameRoles[playerProfile.mostPlayedRole[0]]} />
                      </Box>
                      <Box>
                        <Typography
                          variant="h6"
                          color="gainsboro"
                          sx={{ fontWeight: 'bold' }}
                        >
                          {playerProfile.mostPlayedRole[0].toUpperCase()}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography
                          color="white"
                          sx={{ fontStyle: 'italic' }}
                          variant="body2"
                        >
                          {playerProfile.mostPlayedRole[1]} times played in last
                          15 games
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
                        src={tierIcons[playerProfile.seasonInfo[0].tier]}
                      />
                      <Typography
                        variant="h6"
                        color="primary"
                        sx={{ fontWeight: 'bold' }}
                      >
                        {playerProfile.seasonInfo[0].tier}{' '}
                        {playerProfile.seasonInfo[0].rank}
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
                              {playerProfile.mean.wins.toFixed(1)}
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
                              {playerProfile.mean.kills.toFixed(1)}
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
                              {playerProfile.mean.assists.toFixed(1)}
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
                              {playerProfile.mean.deaths.toFixed(1)}
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
                              {playerProfile.seasonInfo[0].wins}
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
                              {playerProfile.seasonInfo[0].losses}
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
                                playerProfile.seasonInfo[0].queueType
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
                    {printThreeMostPlayedChampsCards()}
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Grid>
        )}
      </>
    );
  };

  const openCustomProfileModal = () => {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} display={'flex'} flexDirection={'column'}>
          {printCustomLolProfile()}
        </Box>
      </Modal>
    );
  };

  return (
    <Grid container justifyContent="center" mt={3} gap={2}>
      <Box>
        <Grid
          item
          gap={3}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography
            sx={{ fontFamily: 'FactionBlack', letterSpacing: '.1rem' }}
            variant="h2"
            color="primary"
            mb={2}
          >
            PLAYERS POOL
          </Typography>
          <Typography color="primary" mb={3} variant="h6">
            This players are looking to play with people!
          </Typography>

          {offers ? (
            ''
          ) : (
            <Typography variant="body1">
              No one is looking for a team for now...
            </Typography>
          )}
        </Grid>
        <Grid
          container
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
          gap={3}
        >
          {offers
            ? offers.map((offer) => (
                <Grid item>
                  <PlayerPoolCard
                    openFullCustomProfile={() => {
                      setOpen(true);
                      setOpenProfile(true);
                      setSummoner(offer.basicInfo.name);
                      const found = offers.find(
                        (offerr) => offer.email === offerr.email
                      );
                      console.log('found', found);
                      setPlayerProfile(found);
                    }}
                    role={offer.role}
                    userName={offer.basicInfo.name}
                    playerMessage={offer.playerDescription}
                    lookingFor={offer.lookingFor}
                  ></PlayerPoolCard>
                </Grid>
              ))
            : 'loading...'}
        </Grid>

        {openProfile ? openCustomProfileModal() : ''}
      </Box>
    </Grid>
  );
}
