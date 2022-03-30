import { riotKey } from "../../riot-key/key";
const euw1Domain = 'https://euw1.api.riotgames.com';
const europeDomain = 'https://europe.api.riotgames.com';

// get basic info by player name - SUMMONER V4
export const getSummonerInfoEndpoint = (playerName) => {
    return `${euw1Domain}/lol/summoner/v4/summoners/by-name/${playerName}?api_key=${riotKey}`
}

// get season info of a player - LEAGUE V4
export const getCurrentSesionEndpoint = (encryptedSummonerId) => {
    return `${euw1Domain}/lol/league/v4/entries/by-summoner/${encryptedSummonerId}?api_key=${riotKey}`
}

// get if player is currently playing
export const getCurrentPlayerGameEndpoint = (encryptedSummonerId) => {
    return `${euw1Domain}/lol/spectator/v4/active-games/by-summoner/${encryptedSummonerId}?api_key=${riotKey}`
}

// get champs mastery
export const getChampionMasteryEndpoint = (encryptedSummonerId) => {
    return `${euw1Domain}/lol/champion-mastery/v4/champion-masteries/by-summoner/${encryptedSummonerId}?api_key=${riotKey}`
}

// get last 30 matches - MATCH-V5
export const getLast30matchesEndpoint = (puuid) => {
    return `${europeDomain}/lol/match/v5/matches/by-puuid/${puuid}/ids?type=ranked&start=0&count=15&api_key=${riotKey}`
}

//get match details by id - MATCH-V5
export const getMatchDetailsEndpoint = (matchId) => {
    return `${europeDomain}/lol/match/v5/matches/${matchId}?api_key=${riotKey}`
}