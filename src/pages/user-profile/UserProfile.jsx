import { Typography, Box, Grid, Avatar, Button } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { UserContext } from "../../context/user-context/user-context";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ContactlessOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function UserProfile() {
    const [t, i18n] = useTranslation('global');
    const [isLogged, setIsLogged] = useContext(UserContext);
    const userEmail = localStorage.getItem('email');
    const userName = localStorage.getItem('username');
    const navigate = useNavigate();

    return (
        <Grid container display={'flex'} justifyContent={'center'} flexDirection={'column'} >
            <Grid m={2} item display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                <Typography variant={'h4'}>{t('user-page.greetings')} {userName}!</Typography>
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
    )
}