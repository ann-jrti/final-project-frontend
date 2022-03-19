import { VpnLock } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { getCurrentSesionEndpoint } from "../endpoints/riot-endpoints";

export const fetchOther = async (results) => {
    console.log(results.encryptedId);
    const seasonInfoEnpoint = getCurrentSesionEndpoint(results.encryptedId);
    console.log(seasonInfoEnpoint);
    const secondFetch = await fetch(seasonInfoEnpoint);
    const secondData = await secondFetch.json();
    console.log(secondData);
}

export const fetchOther2 = (results) => {
    const seasonInfoEnpoint = getCurrentSesionEndpoint(results.encryptedId);
    fetch(seasonInfoEnpoint)
        .then(res => res.json())
        .then(data => console.log(data))
}

export const useFetchSummonerBasic = (url) => {
    // const summonerEndpoint = getSummonerInfoEndpoint(e.target.searchPlayer.value);
    const [playerResults, setPlayerResults] = useState({});
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36",
                "Accept-Language": "es-ES,es;q=0.9",
                "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                "Origin": "https://developer.riotgames.com"
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                const results = {
                    name: data.name,
                    level: data.summonerLevel,
                    accountId: data.accountId,
                    encryptedId: data.id,
                    puuid: data.puuid
                }
                setPlayerResults(results);
                setIsPending(false);
                setError(null)
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message)
            })
    }, [])
    return { playerResults, isPending, error }
}


export const fetchRandomImage = async () => {
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