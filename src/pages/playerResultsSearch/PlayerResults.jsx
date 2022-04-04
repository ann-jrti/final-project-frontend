import { Grid, TextField, Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  getCurrentSesionEndpoint,
  getSummonerInfoEndpoint,
  getCurrentPlayerGameEndpoint,
} from '../../riot-data-management/endpoints/riot-endpoints';
import {
  getChampNameByChampId,
  getChampByName,
  getBasicInfo,
  getCurrentSeasonInfo,
  getLast30Matches,
  getAllGameDetails,
} from '../../riot-data-management/fetches/riot-fetches';
import { champsImages } from '../../riot-data-management/img-urls';
import poroAvatar from '../../assets/imgs/fat-poro.webp';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CurrentGameDetails from './current-game-details/CurrentGameDetails';
import InfoPlayerCard from './info-player-card/InfoPlayerCard';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import notFoundEmote from '../../assets/emotes/bee-mad.webp';

export default function PlayerResults({
  search,
  hideSearch,
  playerSearchData,
}) {
  const [playerResults, setPlayerResults] = useState({});
  const [seasonResults, setSeasonResults] = useState(null);
  let [isPlaying, setIsPlaying] = useState(false);
  const [currentGame, setCurrentGame] = useState({});
  const [playerNotFound, setPlayerNotFound] = useState(false);
  const [meanStats, setMeanStats] = useState(null);
  const [t, i18n] = useTranslation('global');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const playerSearch = searchParams.get('player');

  useEffect(() => {
    printPlayerCard();
  }, []);

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

  const printNowPlayingButton = () => {
    const champImagesInAssets = champsImages.filter((champ) => {
      const champName = champ.split('_');
      return champName[0] === currentGame.champ;
    });
    const randomChampImageToPrint =
      champImagesInAssets[
        Math.floor(Math.random() * champImagesInAssets.length)
      ];
    return (
      <Box display={'flex'} alignItems={'center'} gap={1}>
        <Typography> Playing now!</Typography>
        <CurrentGameDetails
          image={
            `https://ddragon.canisback.com/img/champion/splash/${randomChampImageToPrint}` ||
            `https://ddragon.canisback.com/img/champion/splash/${currentGame.champ}_0`
          }
          playername={playerResults.name}
          champ={currentGame.champ}
          gameMode={currentGame.gameMode}
          gameTime={currentGame.gameLength}
        ></CurrentGameDetails>
      </Box>
    );
  };
  const printPlayerCard = async () => {
    const basicInfo = await getBasicInfo(playerSearch || search);
    if (!basicInfo) {
      setPlayerNotFound(true);
      return;
    }
    const last10matches = await getLast30Matches(basicInfo.puuid);
    const { numOfMatches, allGamesDetails, totalStats, roles } =
      await getAllGameDetails(last10matches, basicInfo.encryptedId);

    let mean = { ...totalStats };
    for (const property in mean) {
      mean[property] = mean[property] / numOfMatches;
      if (mean[property] > 99) {
        mean[property] = Math.round(mean[property]);
      }
    }
    const rolesPlayed = Object.values(roles);
    const rolesEntries = Object.entries(roles);
    const mostTimesPlayed = Math.max(...rolesPlayed);
    console.log(mean);
    const mostPlayedRole = rolesEntries.find((r) => r[1] === mostTimesPlayed);
    console.log(basicInfo);

    const seasonResults = await getCurrentSeasonInfo(basicInfo.encryptedId);
    console.log(seasonResults);

    console.log(seasonResults.length);
    if (seasonResults.length !== 0) {
      let queue;
      if (seasonResults.length === 1) {
        queue = seasonResults[0];
      } else {
        queue = seasonResults.find(
          (results) =>
            results.queueType === 'RANKED_SOLO_5x5' ||
            results.queueType === 'RANKED_FLEX_SR'
        );
      }
      console.log(queue);

      const seasonData = {
        tier: queue.tier,
        rank: queue.rank,
        wins: queue.wins,
        losses: queue.losses,
        queue: queue.queueType,
        hotStreak: queue.hotStreak,
        inactive: queue.inactive,
      };

      setSeasonResults(seasonData);
      setMeanStats(mean);
    }

    const spectatorEndpoint = getCurrentPlayerGameEndpoint(
      basicInfo.encryptedId
    );
    const isPlaying = await fetch(spectatorEndpoint);
    if (isPlaying.status === 404) setIsPlaying(false);
    if (isPlaying.status === 200) {
      setIsPlaying(true);
      const data = await isPlaying.json();
      console.log(data);
      const champId = data.participants.find(
        (p) => p.summonerId === basicInfo.encryptedId
      ).championId;
      const champPlaying = await getChampNameByChampId(champId);
      const game = {
        gameMode: data.gameMode,
        champ: champPlaying,
        gameLength: Math.round(data.gameLength / 60),
      };
      setCurrentGame(game);
    }
    console.log(seasonResults, basicInfo);
    const searchedPlayer = [{ ...basicInfo }, { ...seasonResults }];
    setPlayerResults(basicInfo);
    if (playerSearchData) playerSearchData(searchedPlayer);
  };

  return (
    <Grid
      container
      display="flex"
      displayDirection="row"
      justifyContent={'center'}
      mt={3}
    >
      {hideSearch ? (
        ''
      ) : (
        <Grid item display="flex" gap={3} alignItems="center">
          <Box display="flex" flexDirection="row" alignItems="center">
            <ArrowBackIosIcon
              sx={{ marginLeft: '-.5rem', position: 'absolute' }}
            ></ArrowBackIosIcon>
            <ArrowBackIosIcon></ArrowBackIosIcon>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate('/')}
            >
              {playerNotFound ? 'Try another search' : 'Search other player'}
            </Button>
          </Box>
        </Grid>
      )}

      {playerNotFound ? (
        <Grid mt={10} sm={12} item display="flex" justifyContent="center">
          <Box display="flex" flexDirection="column" alignItems="center">
            <img width={200} src={notFoundEmote}></img>
            <Typography variant="h6">
              Oops! This player doesn't exist
            </Typography>
          </Box>
        </Grid>
      ) : (
        ''
      )}

      {playerResults.name !== undefined ? (
        <Grid item>
          <InfoPlayerCard
            image={`https://ddragon.canisback.com/img/champion/splash/${
              champsImages[Math.floor(Math.random() * champsImages.length)]
            }`}
            name={playerResults.name}
            imgSrc={`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/profileicon/${playerResults.iconId}.png`}
            level={playerResults.level}
            queue={
              seasonResults !== null ? formatQueueType(seasonResults.queue) : ''
            }
            rankIcon={seasonResults !== null ? seasonResults.tier : ''}
            rank={
              seasonResults !== null
                ? `${seasonResults.tier} ${seasonResults.rank}`
                : ''
            }
            losses={seasonResults !== null ? seasonResults.losses : ''}
            wins={seasonResults !== null ? seasonResults.wins : ''}
            statWins={seasonResults !== null ? meanStats.wins.toFixed(1) : ''}
            statKills={seasonResults !== null ? meanStats.kills.toFixed(1) : ''}
            statAssists={
              seasonResults !== null ? meanStats.assists.toFixed(1) : ''
            }
            statsDeaths={
              seasonResults !== null ? meanStats.deaths.toFixed(1) : ''
            }
            statsGold={
              seasonResults !== null ? Math.round(meanStats.goldEarned) : ''
            }
            statsDamage={
              seasonResults !== null ? Math.round(meanStats.damageDealt) : ''
            }
            // hotstreak={seasonResults.hotStreak ? 'In a hot streak!' : ''}
            playing={
              <Typography variant={'p'}>
                {isPlaying ? printNowPlayingButton() : 'Not playing right now'}
              </Typography>
            }
          ></InfoPlayerCard>
        </Grid>
      ) : (
        ''
      )}
    </Grid>
  );
}
