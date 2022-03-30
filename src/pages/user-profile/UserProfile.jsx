import { Typography, Modal, TextareaAutosize, FormControl, InputLabel, Select, MenuItem, Box, Grid, Avatar, Button } from "@mui/material";
import { UserContext } from "../../context/user-context/user-context";
import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import './userprofile.css';


const GAME_ROLES = ['Top', 'Jungle', 'Mid', 'Adc', 'Support'];
const GAME_STYLES = ['Looking for a team', 'Looking for a duo', 'Just for casual playing']

export default function UserProfile() {
    const [t, i18n] = useTranslation('global');
    const [isLogged, setIsLogged, isCustomProfileCreated, setIsCustomProfileCreated] = useContext(UserContext);
    const userName = localStorage.getItem('username');
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [role, setRole] = useState('');
    const [playerDescription, setPlayerDescription] = useState('');
    const [lookingFor, setLookingFor] = useState('');
    const [createOfferResponse, setCreateOfferResponse] = useState(false);

    useEffect(() => {
        getLFTButtonMessage()
    }, [])

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

    const handleLFTButton = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const getLFTButtonMessage = () => {

        if (localStorage.getItem('player-offer')) {
            return 'Edit my player offer'
        }
        else {
            return `Looking for people to play with?`
        }
    }

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
        <Grid sx={{ height: '100vh' }} container display='flex' justifyContent='center' alignItems='center'  >

            <Box display='flex' justifyContent='center' alignItems='center' mb={20}>
                <Grid item sm={6}>
                    <Box className="container">
                        <Box className="c1">
                            <Box className="c11">
                                <Typography mt={2} sx={{ textAlign: 'center', fontFamily: 'FactionOutline', letterSpacing: '.1rem' }} color='#edf2f4' variant={'h3'}>{t('user-page.greetings')} {userName}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>

                <Grid item sm={6} padding={3} >

                    <Grid item m={2} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                        <Avatar sx={{ width: '6rem', height: '6rem' }} alt="Your avatar profile" src={localStorage.getItem('summoner-icon')} />

                    </Grid>

                    <Grid item gap={1} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                        <Box display='flex' mb={2}>

                            <Button className="btn btn-offer" variant="outlined" onClick={(e) => {
                                e.preventDefault();
                                navigate('/user/my-lol-profile')
                            }}>{isCustomProfileCreated ? 'View my profile' : t('user-page.generate-profile')}  </Button>
                        </Box>

                        {/* <Button variant="outlined">{t('user-page.challenge-friend')}</Button> */}
                        <Box>
                            <Grid item gap={1} display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
                                {/* <Grid item sm={12}>
                                    <Box display='flex' flexDirection='row'>
                                        <Button variant="outlined">{t('user-page.get-advice')}</Button>
                                    </Box>
                                </Grid> */}


                                <Grid item sm={12}>
                                    <Box display='flex' flexDirection='row'>
                                        <Button onClick={() => navigate(`/user/my-gallery/artworks/${localStorage.getItem}`)} variant="outlined">{t('user-page.upload-artwork')}</Button>
                                    </Box>
                                </Grid>

                                <Grid item sm={12}>
                                    <Box display='flex' flexDirection='row'>
                                        <Button onClick={handleLFTButton} disabled={!isCustomProfileCreated} variant='outlined'>{getLFTButtonMessage()}</Button>
                                    </Box>

                                </Grid>
                            </Grid>
                        </Box>


                    </Grid>

                </Grid>
            </Box>


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

        </Grid>
    )
}