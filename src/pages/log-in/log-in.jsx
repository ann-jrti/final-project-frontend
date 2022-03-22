import { FormControl, InputLabel, Input, Box, Grid, Typography, Button, FormHelperText } from "@mui/material"
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../context/user-context/user-context";

export default function LogIn() {
    const [t, i18n] = useTranslation('global');
    let [isLogged, setIsLogged] = useContext(UserContext);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            email: e.target.email.value,
            password: e.target.password.value,
        }

        fetch('http://localhost:4000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => {
                if (!res.ok) throw Error(t('login.login-error-msg'));
                return res.json();
            })
            .then(data => {
                localStorage.setItem('login-token', data.access_token);
                localStorage.setItem('email', data.email);
                localStorage.setItem('username', data.username);
                localStorage.setItem('logged', true);

                setIsLogged(localStorage.getItem('logged'));
                setError(null);
                navigate('/user');
            })
            .catch(err => {
                setError(err.message);
            })

    }
    return (
        <Box>

            <Grid gap={3} container marginTop={5} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                <Grid item>
                    <Typography variant={"h3"}>{t('login.welcome-message')}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant={"p"}>{t('login.insert-info')}</Typography>
                </Grid>

                <Grid item >
                    <form onSubmit={handleSubmit}>
                        <Box display='flex' flexDirection={'column'} gap={2}>

                            <FormControl required>
                                <InputLabel htmlFor="email">{t('login.email')}</InputLabel>
                                <Input type="email" id="email" aria-describedby="my-helper-text" />
                            </FormControl>

                            <FormControl required>
                                <InputLabel htmlFor="password">{t('login.password')}</InputLabel>
                                <Input type="password" id="password" aria-describedby="my-helper-text" />
                            </FormControl>

                            <FormControl >
                                <Button variant="outlined" color="primary" type="submit" id="submit'">{t('login.login-button')}</Button>
                            </FormControl>
                            {error && <Typography variant={'p'}>{error}</Typography>}
                        </Box>
                    </form>
                </Grid>


            </Grid>
        </Box>
    )
}