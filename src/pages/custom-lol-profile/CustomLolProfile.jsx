import React, { useState, useEffect, useContext } from "react";
import { Grid, Box, Button, Typography, TextField } from "@mui/material";
import { getBasicInfo, getLast30Matches, getThreeMostPlayedChamps, getAllGameDetails } from "../../riot-data-management/fetches/riot-fetches";
import poroAvatar from '../../assets/imgs/fat-poro.webp'
import { changeCustomProfileStatusInDB, createsProfileUserInDB } from "./users-utils";
import styled from "@emotion/styled";
import { UserContext } from "../../context/user-context/user-context";
import CustomProfileCard from "./custom-profile-card/CustomProfileCard";

export default function CustomLolProfile() {
    const [registeredUserInfoAccount, setRegisteredUserInfoAccount] = useState({});
    const [mostPlayedChamps, setMostPlayedChamps] = useState({});
    const [lastMatches, setLastMatchesId] = useState([]);
    const [meanStats, setMeanStats] = useState({});
    let [, , isCustomProfileCreated, setIsCustomProfileCreated] = useContext(UserContext)

    const hideButton = isCustomProfileCreated ? 'none' : 'flex'
    console.log('customProfileCreated value :', isCustomProfileCreated);

    console.log('hideButton value', hideButton);

    const GenerateProfileButton = styled(Button)`
    display: ${hideButton}
    `
    console.log('working custom lol profile');

    const handleInsertPlayerForCustomProfile = async (e) => {
        e.preventDefault();
        const results = await getBasicInfo(e.target.generateMyProfile.value)
        setRegisteredUserInfoAccount(results);
    }

    const handleGenerateLolProfile = async (e) => {
        e.preventDefault();
        await createsProfileUserInDB({ stats: { meanStats }, infoAccount: { registeredUserInfoAccount }, champs: { mostPlayedChamps } });
        await changeCustomProfileStatusInDB(localStorage.getItem('email'));
        // setCustomProfile(false)
        setIsCustomProfileCreated(true);
    }

    useEffect(() => {
        const saveMostPlayedChamps = async () => {
            if (registeredUserInfoAccount.encryptedId) {
                const firstThreeChampsMostPlayed = await getThreeMostPlayedChamps(registeredUserInfoAccount.encryptedId)
                setMostPlayedChamps(firstThreeChampsMostPlayed)
            }
        }
        saveMostPlayedChamps();
    }, [registeredUserInfoAccount.encryptedId])

    useEffect(() => {
        const saveLastMathesId = async () => {
            if (mostPlayedChamps[0]) {
                const results = await getLast30Matches(registeredUserInfoAccount.puuid);
                setLastMatchesId(results);
            }
        }
        saveLastMathesId();
    }, [mostPlayedChamps[0]])

    useEffect(() => {
        const getMeanStatsOfLastGames = async () => {
            if (lastMatches[0]) {
                const { numOfMatches, allGamesDetails, totalStats, roles } = await getAllGameDetails(lastMatches, registeredUserInfoAccount.encryptedId);
                let mean = { ...totalStats }
                console.log(allGamesDetails);
                console.log(totalStats);
                console.log(roles);
                for (const property in mean) {
                    mean[property] = mean[property] / numOfMatches
                    if (mean[property] > 99) {
                        mean[property] = Math.round(mean[property])
                    }
                }
                console.log(mean);
                console.log(totalStats);
                setMeanStats(mean);
            }
        }
        getMeanStatsOfLastGames();

    }, [lastMatches[0]])

    return (
        <Grid container>

            <form onSubmit={handleInsertPlayerForCustomProfile}>
                {isCustomProfileCreated ? '' : <TextField id="generateMyProfile" >Search</TextField>}
            </form>
            {isCustomProfileCreated ? '' : <GenerateProfileButton variant={'contained'} onClick={handleGenerateLolProfile} color='warning'> Generate my LoL profile!</GenerateProfileButton>}
            <>
                {isCustomProfileCreated ? <CustomProfileCard></CustomProfileCard> : ''}
            </>
        </Grid>

    )
}