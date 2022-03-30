import { Typography, Box, Grid, Avatar, Button } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { UserContext } from "../../context/user-context/user-context";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ContactlessOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import './userprofile.css'

export default function UserProfile() {
    const [t, i18n] = useTranslation('global');
    const [isLogged, setIsLogged] = useContext(UserContext);
    const userEmail = localStorage.getItem('email');
    const userName = localStorage.getItem('username');
    const navigate = useNavigate();

    return (
        <Grid sx={{ height: '100vh' }} container display='flex' justifyContent='center' alignItems='center'  >
            <Box display='flex' justifyContent='center' alignItems='center' mb={20}>


                <Grid item sm={6}>
                    <Box className="container">
                        <Box className="c1">
                            <Box className="c11">
                                <Typography mt={2} sx={{ textAlign: 'center' }} color='#edf2f4' variant={'h3'}>{t('user-page.greetings')} {userName}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>

                <Grid item sm={6}>
                    <Grid item m={2} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                        <Avatar sx={{ width: '6rem', height: '6rem' }} alt="Your avatar profile" src={localStorage.getItem('summoner-icon')} />

                    </Grid>

                    <Grid item gap={1} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                        <Box bgcolor={'warning.main'}>
                            <Button variant="outlined" onClick={(e) => {
                                console.log('clicked');
                                e.preventDefault();
                                navigate('/user/my-lol-profile')
                            }}>{t('user-page.generate-profile')}</Button>
                        </Box>

                        <Button variant="outlined">{t('user-page.challenge-friend')}</Button>
                        <Box>
                            <Grid item gap={1} display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
                                <Button variant="outlined">{t('user-page.get-advice')}</Button>
                                <Button onClick={() => navigate(`/user/my-gallery/artworks/${localStorage.getItem}`)} variant="outlined">{t('user-page.upload-artwork')}</Button>
                            </Grid>
                        </Box>


                    </Grid>
                </Grid>

            </Box>
        </Grid>
    )
}