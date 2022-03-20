import { riotKey } from "../../riot-key/key";
export const mainPath = 'https://euw1.api.riotgames.com';


// get basic info by player name (SUMMONER-V4 second get)
export const getSummonerInfoEndpoint = (playerName) => {
    return `${mainPath}/lol/summoner/v4/summoners/by-name/${playerName}?api_key=${riotKey}`
}

// get season info of a player (LEAGUE V4 second get)
export const getCurrentSesionEndpoint = (encryptedSummonerId) => {
    return `${mainPath}/lol/league/v4/entries/by-summoner/${encryptedSummonerId}?api_key=${riotKey}`
}

// get if player is currently playing
export const getCurrentPlayerGameEndpoint = (encryptedSummonerId) => {
    return `${mainPath}/lol/spectator/v4/active-games/by-summoner/${encryptedSummonerId}?api_key=${riotKey}`
}

export const getChampionMasteryEndpoint = (encryptedSummonerId) => {
    return `${mainPath}/lol/champion-mastery/v4/champion-masteries/by-summoner/${encryptedSummonerId}?api_key=${riotKey}`
}