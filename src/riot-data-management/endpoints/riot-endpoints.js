import { riotKey } from "../../riot-key/key";
export const mainPath = 'https://euw1.api.riotgames.com';


// get basic info by player name
export const getSummonerInfoEndpoint = (playerName) => {
    return `${mainPath}/lol/summoner/v4/summoners/by-name/${playerName}?api_key=${riotKey}`
}

// get data from LEAGUE V4 - 2 endpoint 
export const getCurrentSesionEndpoint = (encryptedSummonerId) => {
    return `${mainPath}/lol/league/v4/entries/by-summoner/${encryptedSummonerId}?api_key=${riotKey}`
}
