import React, { useState, useEffect, useContext } from "react";
import { Grid, Box, Button, Typography, FormControl, MenuItem, Select, TextareaAutosize, TextField, Modal, InputLabel } from "@mui/material";

import { getBasicInfo, getLast30Matches, getThreeMostPlayedChamps, getAllGameDetails, getCurrentSeasonInfo } from "../../riot-data-management/fetches/riot-fetches";
import { changeCustomProfileStatusInDB, createsProfileUserInDB } from "./users-utils";
import styled from "@emotion/styled";
import { UserContext } from "../../context/user-context/user-context";
import CustomProfileCard from "./custom-profile-card/CustomProfileCard";


const GAME_ROLES = ['Top', 'Jungle', 'Mid', 'Adc', 'Support'];

export default function CustomLolProfile() {
    let [, , isCustomProfileCreated, setIsCustomProfileCreated] = useContext(UserContext)
    const [open, setOpen] = useState(false);
    const [role, setRole] = useState('');
    const [playerDescription, setPlayerDescription] = useState('');
    const [createOfferResponse, setCreateOfferResponse] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const hideButton = isCustomProfileCreated ? 'none' : 'flex'



    const handleChange = (event) => {
        setRole(event.target.value);
    };

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
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleSubmitLFT = async (e) => {
        e.preventDefault();
        const body = {
            role,
            playerDescription
        }
        const response = await fetch('http://localhost:4000/players-pool', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${localStorage.getItem('login-token')}`
            },
            body: JSON.stringify(body)
        })
        setCreateOfferResponse(response.ok ? 'Created' : 'Couldnt do it :(')
        const results = await response.json();


    }

    return (
        <Grid container display={'flex'} justifyContent={'center'} m={4} gap={2}>
            {isCustomProfileCreated ? <Button onClick={handleOpen} variant='contained'>Looking for a team</Button> : ''}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">Post your LFT</Typography>

                    <form onSubmit={handleSubmitLFT}>

                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Your main role</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={role}
                                    label="Role"
                                    onChange={handleChange}
                                >
                                    {GAME_ROLES.map((rol) => <MenuItem value={rol}>{rol}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Box>

                        {/* <InputLabel>Main role</InputLabel>
                        <TextField id='player-main-role' placeholder="Insert your role"></TextField> */}

                        <InputLabel>Brief description about you</InputLabel>
                        <TextareaAutosize
                            id='player-description'
                            aria-label="minimum height"
                            minRows={5}
                            onChange={(e) => setPlayerDescription(e.target.value)}
                            placeholder="Write here your description"
                            style={{ width: 200 }}
                            value={playerDescription}
                        />

                        <Button variant='contained' type="submit">Send</Button>
                        {createOfferResponse ? createOfferResponse : ''}
                    </form>


                </Box>
            </Modal >

            {
                isCustomProfileCreated ? '' : <form onSubmit={handleTryClick}>

                    <InputLabel>Type your summoner name</InputLabel>
                    <TextField id="try" placeholder="type here"></TextField>
                    <GenerateProfileButton variant={'contained'} color='warning' type="submit">Generate my Lol profile</GenerateProfileButton>
                </form>
            }

            <>
                {isCustomProfileCreated ? <CustomProfileCard></CustomProfileCard> : ''
                }
            </>

        </Grid >

    )
}