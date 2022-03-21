import { Grid, Box, Typography, Button, FormGroup, FormControl, InputLabel, Input, FormHelperText } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function SignUp() {
    const [t, i18n] = useTranslation('global');
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
        }

        fetch('http://localhost:4000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => {
                if (!res.ok) {
                    throw Error(t('signup.signup-error-msg'));
                }
                return res.json();
            })
            .then(data => {
                setError(null);
            })
            .catch(err => {
                setError(err.message);
            })
    }
    return (

        <Grid gap={3} container marginTop={5} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
            <Grid item>
                <Typography variant={"h3"}>{t('signup.signup')}</Typography>
            </Grid>

            <Grid item >
                <form onSubmit={handleSubmit}>
                    <Box display='flex' flexDirection={'column'} gap={2}>

                        <FormControl required>
                            <InputLabel htmlFor="username">{t('signup.name')}</InputLabel>
                            <Input type="text" id="username" aria-describedby="my-helper-text" />
                        </FormControl>

                        <FormControl required>
                            <InputLabel htmlFor="email">{t('signup.email')}</InputLabel>
                            <Input type="email" id="email" aria-describedby="my-helper-text" />
                        </FormControl>

                        <FormControl required>
                            <InputLabel htmlFor="password">{t('signup.password')}</InputLabel>
                            <Input type="password" id="password" aria-describedby="my-helper-text" />
                            <FormHelperText id="my-helper-text">{t('signup.password-instructions')}</FormHelperText>
                        </FormControl>
                        <FormControl >
                            <Button variant="outlined" color="primary" type="submit" id="submit'">{t('signup.register')}</Button>
                        </FormControl>
                        {error && <Typography color={'#e07a5f'} variant={'p'}>{error}</Typography>}
                    </Box>
                </form>
            </Grid>


        </Grid>


    )
}