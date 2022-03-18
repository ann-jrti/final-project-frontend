import { useState, useEffect } from "react";

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

        // const data = await response.json();
        // const results = {
        //     name: data.name,
        //     level: data.summonerLevel,
        //     accountId: data.accountId,
        //     encryptedId: data.id,
        //     puuid: data.puuid
        // }
        // setPlayerResults(results);
        // console.log(requestSeasonInfo);
        // console.log(playerResults);
        // console.log(data);
    }, [])
    return { playerResults, isPending, error }
}