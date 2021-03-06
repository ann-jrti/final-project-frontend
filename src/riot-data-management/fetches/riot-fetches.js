import { getSummonerInfoEndpoint, getCurrentSesionEndpoint, getChampionMasteryEndpoint, getLast30matchesEndpoint, getMatchDetailsEndpoint } from "../endpoints/riot-endpoints";

export const getRandomImage = async () => {
    const response = await fetch('http://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion.json')
    const data = await response.json()
    const randomChampImage = data.data[3].image.sprite;
    return randomChampImage;
}

export const getAllChamps = async () => {
    const response = await fetch('http://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion.json')
    const data = await response.json()
    return data.data;
}

export const getChampNameByChampId = async (champId) => {
    const response = await fetch('http://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion.json')
    const data = await response.json()
    const dataEntries = Object.entries(data.data)
    const champ = dataEntries.find(c => c[1].key === champId.toString())[0];
    return champ
}

export const getChampByName = async (champId) => {
    const response = await fetch('http://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion/Aatrox.json')
    const data = await response.json()
}

export const getBasicInfo = async (player) => {
    const summonerEndpoint = getSummonerInfoEndpoint(player);

    const response = await fetch(summonerEndpoint);
    if (response.status === 404) return false
    const data = await response.json();
    const results = {
        name: data.name,
        level: data.summonerLevel,
        accountId: data.accountId,
        encryptedId: data.id,
        puuid: data.puuid,
        iconId: data.profileIconId
    }
    return results
}

// get 3 most played champs
export const getThreeMostPlayedChamps = async (encryptedId) => {
    const championMasteryEndpoint = getChampionMasteryEndpoint(encryptedId)
    const response = await fetch(championMasteryEndpoint);
    const data = await response.json();
    const firstThreeChampsMostPlayed =
        [{

            champId: data[0].championId,
            champPoints: data[0].championPoints,
            mostPlayedChampName: await getChampNameByChampId(data[0].championId),
            lastTimePlayed: new Date(data[0].lastPlayTime)

        },
        {

            champId: data[1].championId,
            champPoints: data[1].championPoints,
            mostPlayedChampName: await getChampNameByChampId(data[1].championId),
            lastTimePlayed: new Date(data[1].lastPlayTime)

        },
        {

            champId: data[2].championId,
            champPoints: data[2].championPoints,
            mostPlayedChampName: await getChampNameByChampId(data[2].championId),
            lastTimePlayed: new Date(data[2].lastPlayTime)

        }]


    return firstThreeChampsMostPlayed;
}

// get last 30 matches list
export const getLast30Matches = async (puuid) => {
    const matchesEndpoint = getLast30matchesEndpoint(puuid)
    const response = await fetch(matchesEndpoint)
    const data = await response.json()
    return data
}

// get match details by match id 
export const getMatchDetails = async (matchId) => {
    const matchDetailsEndpoint = getMatchDetailsEndpoint(matchId)
    const response = await fetch(matchDetailsEndpoint)
    const data = await response.json()
    return data
}

// get all matches details given an array of id matches
export const getAllGameDetails = async (lastMatches, encryptedId) => {
    const numOfMatches = lastMatches.length
    const totalStats = {
        wins: 0,
        kills: 0,
        assists: 0,
        deaths: 0,
        damageDealt: 0,
        goldEarned: 0,
    }

    const roles = {
        support: 0,
        top: 0,
        middle: 0,
        jungle: 0,
        adc: 0
    }

    const allGamesDetails = [];

    const allMatchesPromises = [];
    lastMatches.forEach(match => {
        const promise = new Promise(async (res, rej) => {
            const data = await getMatchDetails(match)
            const playerGameDetails = data.info.participants.find(player => player.summonerId === encryptedId)
            const gameDetails = {
                win: playerGameDetails.win,
                kills: playerGameDetails.kills,
                assists: playerGameDetails.assists,
                deaths: playerGameDetails.deaths,
                chamPlayed: playerGameDetails.championName,
                lane: playerGameDetails.lane,
                rol: playerGameDetails.teamPosition,
                goldEarned: playerGameDetails.goldEarned,
                turretKills: playerGameDetails.turretKills,
                turretTakedowns: playerGameDetails.turretTakedowns,
                visionScore: playerGameDetails.visionScore,
                wardsPlaced: playerGameDetails.wardsPlaced,
                damageDealt: {
                    physical: playerGameDetails.physicalDamageDealtToChampions,
                    magical: playerGameDetails.totalDamageDealtToChampions,
                    total: playerGameDetails.totalDamageDealtToChampions
                },
                comboKills: {
                    doubleKills: playerGameDetails.doubleKills,
                    tripleKills: playerGameDetails.tripleKills,
                    quadraKills: playerGameDetails.quadraKills,
                    pentaKills: playerGameDetails.pentaKills
                },
            }
            allGamesDetails.push(gameDetails);

            gameDetails.win ? totalStats.wins++ : totalStats.wins += 0;
            totalStats.kills += gameDetails.kills;
            totalStats.assists += gameDetails.assists;
            totalStats.deaths += gameDetails.deaths;
            totalStats.damageDealt += gameDetails.damageDealt.total;
            totalStats.goldEarned += gameDetails.goldEarned;

            switch (gameDetails.rol) {
                case 'TOP':
                    roles.top += 1
                    break;
                case 'JUNGLE':
                    roles.jungle += 1
                    break;
                case 'MIDDLE':
                    roles.middle += 1
                    break;
                case 'BOTTOM':
                    roles.adc += 1
                    break;
                case 'UTILITY':
                    roles.support += 1
                    break;
            }
            res();
        })
        allMatchesPromises.push(promise);
    })
    await Promise.all(allMatchesPromises);
    return { numOfMatches, allGamesDetails, totalStats, roles }
}

export const getCurrentSeasonInfo = async (encryptedId) => {
    const seasonInfoEnpoint = getCurrentSesionEndpoint(encryptedId);
    const response = await fetch(seasonInfoEnpoint);
    const data = await response.json();
    return data
}
