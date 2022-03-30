import React, { useState, useEffect, useContext } from "react";
import { Grid, Box, Button, Typography, FormControl, MenuItem, Select, TextareaAutosize, TextField, Modal, InputLabel } from "@mui/material";
import './customLolProfile.css'
import { getBasicInfo, getLast30Matches, getThreeMostPlayedChamps, getAllGameDetails, getCurrentSeasonInfo } from "../../riot-data-management/fetches/riot-fetches";
import { changeCustomProfileStatusInDB, createsProfileUserInDB } from "./users-utils";
import styled from "@emotion/styled";
import { UserContext } from "../../context/user-context/user-context";
import CustomProfileCard from "./custom-profile-card/CustomProfileCard";
import welcomeIcon from '../../assets/emotes/mr-pengu.webp';

const GAME_ROLES = ['Top', 'Jungle', 'Mid', 'Adc', 'Support'];
const GAME_STYLES = ['Looking for a team', 'Looking for a duo', 'Just for casual playing']

export default function CustomLolProfile() {
    let [, , isCustomProfileCreated, setIsCustomProfileCreated] = useContext(UserContext)
    const [open, setOpen] = useState(false);
    const [role, setRole] = useState('');
    const [playerDescription, setPlayerDescription] = useState('');
    const [lookingFor, setLookingFor] = useState('');
    const [createOfferResponse, setCreateOfferResponse] = useState(false);
    const [profileUpdated, setProfileUpdated] = useState(false);

    const handleLFTButton = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleRefreshProfile = async (e) => {
        e.preventDefault();
        getProfileData(localStorage.getItem('playername'));
    }

    const hideButton = isCustomProfileCreated ? 'none' : 'flex'

    const GenerateProfileButton = styled(Button)`
    display: ${hideButton}
    `
    console.log('working custom lol profile');

    const getProfileData = async (event) => {
        const date = new Date();
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
        const rolesPlayed = Object.values(roles);
        const rolesEntries = Object.entries(roles);
        const mostTimesPlayed = Math.max(...rolesPlayed);
        const mostPlayedRole = rolesEntries.find(r => r[1] === mostTimesPlayed)
        await createsProfileUserInDB({ stats: { mean }, infoAccount: { basicInfo }, seasonInfo: { seasonInfo }, champs: { firstThreeChampsMostPlayed }, roles: { roles }, mostPlayedRole: { mostPlayedRole }, date: { date } });
        setIsCustomProfileCreated(true);
    }

    const handleCreateProfileFirstTime = (e) => {
        e.preventDefault();
        getProfileData(e.target.playername.value);
        setProfileUpdated(true);
        localStorage.setItem('playername', e.target.playername.value);
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #df1638',
        boxShadow: 24,
        p: 4,
    };

    const handleSubmitLFT = async (e) => {
        e.preventDefault();

        const body = {
            role,
            playerDescription,
            lookingFor
        }
        console.log(body);
        const response = await fetch('http://localhost:4000/players-pool', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${localStorage.getItem('login-token')}`
            },
            body: JSON.stringify(body)
        })
        if (response.ok) {
            localStorage.setItem('player-offer', true)
        }
        setCreateOfferResponse(response.ok ? 'Created' : 'Couldnt do it :(');
        const results = await response.json();
    }

    return (
        <Grid container display={'flex'} justifyContent={'center'} m={4} gap={2}>
            {isCustomProfileCreated ? <Box display='flex' gap={2}>
                <Button className="btn btn-offer" onClick={handleRefreshProfile} variant='contained'>Refresh my profile</Button>
            </Box> : ''}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box display='flex' flexDirection='column' gap={2}>
                        <Typography id="modal-modal-title" variant="h5" color='secondary'>Find players to play with!</Typography>
                        <Typography variant="body1">Please fill the form to publish the offer in the billboard:</Typography>
                    </Box>
                    <form onSubmit={handleSubmitLFT}>

                        <Box mt={2} sx={{ minWidth: 120 }} display='flex' flexDirection='column' gap={3}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Your main role</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={role}
                                    label="Role"
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                >
                                    {GAME_ROLES.map((rol) => <MenuItem value={rol}>{rol}</MenuItem>)}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel>What are you looking for?</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={lookingFor}
                                    label="Role"
                                    onChange={(e) => setLookingFor(e.target.value)}
                                    required
                                >
                                    {GAME_STYLES.map((style) => <MenuItem value={style}>{style}</MenuItem>)}
                                </Select>

                            </FormControl>

                            <FormControl fullWidth>
                                <Typography>Brief description about you</Typography>
                                <TextareaAutosize
                                    id='player-description'
                                    aria-label="minimum height"
                                    minRows={5}
                                    onChange={(e) => setPlayerDescription(e.target.value)}
                                    placeholder="Write here your description"
                                    style={{ width: 200 }}
                                    value={playerDescription}
                                    required
                                />
                            </FormControl>

                            <FormControl>
                                <Button variant='contained' type="submit">Send</Button>
                            </FormControl>
                        </Box>

                        {createOfferResponse ? createOfferResponse : ''}
                    </form>


                </Box>
            </Modal>

            {
                isCustomProfileCreated ? '' :
                    <Grid container mt={3} >
                        <Grid item sm={12} mb={6} display='flex' justifyContent='center'>
                            <Typography variant='h4' color='primary'>Welcome to your LoL profile stats creator</Typography>
                        </Grid>

                        <Grid item sm={6}>
                            <Box display='flex' justifyContent='flex-end' mr={5}>
                                <img width={200} src={welcomeIcon}></img>
                            </Box>
                        </Grid>

                        <Grid item sm={6} borderLeft='1px solid #8d99ae'>

                            <form onSubmit={handleCreateProfileFirstTime}>

                                <Box display='flex' flexDirection='column' ml={5} gap={2}>

                                    <Box>
                                        <Typography color='primary'>Please insert your summoner name</Typography>
                                    </Box>

                                    <Box >
                                        <TextField id="playername" placeholder="type here"></TextField>
                                    </Box>

                                    <Box>
                                        <GenerateProfileButton size='large' variant={'contained'} color='warning' type="submit">Generate my Lol profile</GenerateProfileButton>
                                    </Box>

                                </Box>

                            </form>

                        </Grid>


                    </Grid>
            }


            {isCustomProfileCreated ? <CustomProfileCard></CustomProfileCard> : ''}

        </Grid >

    )
}