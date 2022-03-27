import React, { useState, useEffect, useContext } from "react";
import { Grid, Box, Button, Typography, TextField, InputLabel } from "@mui/material";
import { getBasicInfo, getLast30Matches, getThreeMostPlayedChamps, getAllGameDetails, getCurrentSeasonInfo } from "../../riot-data-management/fetches/riot-fetches";
import poroAvatar from '../../assets/imgs/fat-poro.webp'
import { changeCustomProfileStatusInDB, createsProfileUserInDB } from "./users-utils";
import styled from "@emotion/styled";
import { UserContext } from "../../context/user-context/user-context";
import CustomProfileCard from "./custom-profile-card/CustomProfileCard";

export default function CustomLolProfile() {
    let [, , isCustomProfileCreated, setIsCustomProfileCreated] = useContext(UserContext)

    const hideButton = isCustomProfileCreated ? 'none' : 'flex'

    const GenerateProfileButton = styled(Button)`
    display: ${hideButton}
    `
    console.log('working custom lol profile');

    const getProfileData = async (event) => {
        const basicInfo = await getBasicInfo(event);
        const seasonInfo = await getCurrentSeasonInfo(basicInfo.encryptedId);
        const firstThreeChampsMostPlayed = await getThreeMostPlayedChamps(basicInfo.encryptedId)
        const last10matches = await getLast30Matches(basicInfo.puuid);
        const { numOfMatches, allGamesDetails, totalStats, roles } = await getAllGameDetails(last10matches, basicInfo.encryptedId);
        let mean = { ...totalStats }
        for (const property in mean) {
            mean[property] = mean[property] / numOfMatches
            if (mean[property] > 99) {
                mean[property] = Math.round(mean[property])
            }
        }
        await createsProfileUserInDB({ stats: { mean }, infoAccount: { basicInfo }, seasonInfo: { seasonInfo }, champs: { firstThreeChampsMostPlayed }, roles: { roles } });
        setIsCustomProfileCreated(true);
    }

    const handleTryClick = (e) => {
        e.preventDefault();
        getProfileData(e.target.try.value);
    }


    return (
        <Grid container display={'flex'} justifyContent={'center'} m={4} gap={2}>

            {isCustomProfileCreated ? '' : <form onSubmit={handleTryClick}>

                <InputLabel>Type your summoner name</InputLabel>
                <TextField id="try" placeholder="type here"></TextField>
                <GenerateProfileButton variant={'contained'} color='warning' type="submit">Generate my Lol profile</GenerateProfileButton>
            </form>}

            <>
                {isCustomProfileCreated ? <CustomProfileCard></CustomProfileCard> : ''}
            </>

        </Grid>

    )
}