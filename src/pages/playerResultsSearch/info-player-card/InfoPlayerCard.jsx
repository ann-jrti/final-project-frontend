import * as React from 'react';
import {
  Card,
  CardContent,
  Grid,
  Box,
  CardMedia,
  Divider,
  Typography,
  CardActionArea,
} from '@mui/material';
import styled from '@emotion/styled';
import provisionalIcon from '../../../assets/tier-icons/bronze-icon.png';
import silverIcon from '../../../assets/tier-icons/silver-icon.png';
import goldIcon from '../../../assets/tier-icons/gold-icon.png';
import platIcon from '../../../assets/tier-icons/platinum-icon.png';
import diamondIcon from '../../../assets/tier-icons/diamond-icon.png';
import grandmasterIcon from '../../../assets/tier-icons/challenger-icon.png';
import masterIcon from '../../../assets/tier-icons/master-icon.png';
import level50 from '../../../assets/level-icons/level_50-74.png';

const StyleCard = styled(Card)`
  max-width: 200rem;
  margin: 2rem;
`;

export default function InfoPlayerCard(props) {
  const tierIcons = {
    PROVISIONAL: provisionalIcon,
    SILVER: silverIcon,
    GOLD: goldIcon,
    PLATINUM: platIcon,
    DIAMOND: diamondIcon,
    GRANDMASTER: grandmasterIcon,
    MASTER: masterIcon,
  };

  return (
    <>
      {/* <Grid container display={'flex'} justifyContent={'center'}> */}
      <StyleCard sx={{ width: '700px' }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="300"
            image={props.image}
            alt="green iguana"
          />

          <CardContent>
            <Box display={'flex'} flexDirection={'column'} gap={1}>
              <Box
                display={'flex'}
                justifyContent={'center'}
                flexDirection="column"
                alignItems="center"
              >
                <img
                  style={{
                    maxWidth: '4.5rem',
                    maxHeight: '4.5rem',
                    borderRadius: '50%',
                    position: 'absolute',
                    marginBottom: '7rem',
                    border: '.3rem solid #8d99ae',
                    backgroundColor: '#8d99ae',
                  }}
                  className="search-player-avatar-icon"
                  src={props.imgSrc}
                ></img>

                <Typography
                  paddingTop={2}
                  marginBottom={1}
                  gutterBottom
                  variant="h3"
                  component="div"
                  color="black"
                >
                  {props.name}
                </Typography>
              </Box>
              <Divider sx={{ marginBottom: '.9rem' }} />

              <Box
                display="flex"
                gap={4}
                flexDirection="row"
                justifyContent="center"
                marginTop={-1}
              >
                <Box
                  display={'flex'}
                  flexDirection="column"
                  justifyContent="center"
                  alignItems={'center'}
                >
                  {/* <BadgeOutlined></BadgeOutlined> */}
                  <Box>
                    <img width={90} src={level50}></img>
                  </Box>
                  <Typography variant="body2" color="black">
                    Summoner level
                  </Typography>
                  <Typography color="primary" variant="h5">
                    {props.level}
                  </Typography>
                </Box>

                <Box
                  display={'flex'}
                  gap={1}
                  flexDirection="column"
                  justifyContent="center"
                  marginBottom={0.2}
                  alignItems={'center'}
                >
                  <Box marginBottom={-2}>
                    <img width={100} src={tierIcons[props.rankIcon]}></img>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Typography variant="body2" color="black">
                      {props.queue}
                    </Typography>
                    <Typography color="primary" variant="h5">
                      {props.rank}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Divider />

              <Box display={'flex'} flexDirection={'column'} gap={2}>
                <Box display={'flex'} flexDirection="column" gap={2}>
                  <Box display="flex" justifyContent="center">
                    <Typography color="primary" variant={'h5'}>
                      This season
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" justifyContent="center" gap={3}>
                  <Box
                    display="flex"
                    gap={4}
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {/* <Typography variant={'h4'}>Queue Type: {props.queue}</Typography> */}
                    <Box display={'flex'} gap={1} alignItems={'center'}>
                      {/* <ThumbUpOutlinedIcon></ThumbUpOutlinedIcon> */}
                      <Typography variant="body2" color="primary">
                        Wins: {props.wins}
                      </Typography>
                    </Box>

                    <Box display={'flex'} gap={1} alignItems={'center'}>
                      {/* <ThumbDownOutlinedIcon></ThumbDownOutlinedIcon> */}
                      <Typography variant="body2" color="primary">
                        Losses: {props.losses}{' '}
                      </Typography>
                    </Box>

                    <Box display={'flex'} gap={1} alignItems={'center'}>
                      {/* <StarBorder></StarBorder> */}
                      <Typography variant="body2" color="primary">
                        {props.playing}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box
                  display="flex"
                  flexDirection="column"
                  border={'1px solid gainsboro'}
                  p={3}
                  borderRadius={'.9rem'}
                >
                  <Box display="flex" justifyContent="center">
                    <Typography
                      variant="h5"
                      sx={{ textOrientation: 'upright' }}
                      color="primary"
                      mb={1}
                    >
                      Average stats last 15 games
                    </Typography>
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="center"
                    flexDirection="row"
                    alignItems="center"
                    gap={1}
                  >
                    <Typography
                      sx={{ fontSize: '.9rem', letterSpacing: '.1rem' }}
                    >
                      Wins:
                    </Typography>
                    <Typography color="primary" sx={{ fontWeight: 'bold' }}>
                      {props.statWins}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    flexDirection="row"
                    alignItems="center"
                    gap={1}
                  >
                    <Typography
                      sx={{ fontSize: '.9rem', letterSpacing: '.1rem' }}
                    >
                      Average kills per game:
                    </Typography>
                    <Typography color="primary" sx={{ fontWeight: 'bold' }}>
                      {props.statKills}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    flexDirection="row"
                    alignItems="center"
                    gap={1}
                  >
                    <Typography
                      sx={{ fontSize: '.9rem', letterSpacing: '.1rem' }}
                    >
                      Average assists per game:
                    </Typography>
                    <Typography color="primary" sx={{ fontWeight: 'bold' }}>
                      {props.statAssists}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    flexDirection="row"
                    alignItems="center"
                    gap={1}
                  >
                    <Typography
                      sx={{ fontSize: '.9rem', letterSpacing: '.1rem' }}
                    >
                      Average deaths per game:
                    </Typography>
                    <Typography color="primary" sx={{ fontWeight: 'bold' }}>
                      {props.statsDeaths}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </StyleCard>
      {/* </Grid> */}
    </>
  );
}
