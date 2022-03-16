import { Grid, Box, Typography, Button, FormGroup, FormControl, InputLabel, Input, FormHelperText } from "@mui/material"
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
        }
        console.log(user);

        fetch('http://localhost:4000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => res.json())
            .then(data => {
                console.log(data);
            })

    }
    return (
        <>
            <Grid gap={3} container marginTop={5} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                <Grid item>
                    <Typography variant={"h3"}>Sign up</Typography>
                </Grid>

                <Grid item >
                    <form onSubmit={handleSubmit}>
                        <Box display='flex' flexDirection={'column'} gap={2}>

                            <FormControl required>
                                <InputLabel htmlFor="username">Name</InputLabel>
                                <Input type="text" id="username" aria-describedby="my-helper-text" />
                            </FormControl>

                            <FormControl required>
                                <InputLabel htmlFor="email">Email address</InputLabel>
                                <Input type="email" id="email" aria-describedby="my-helper-text" />
                            </FormControl>

                            <FormControl required>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input type="password" id="password" aria-describedby="my-helper-text" />
                                <FormHelperText id="my-helper-text">Password must contain one capital letter, one number and one special character</FormHelperText>
                            </FormControl>

                            <FormControl >
                                <Button variant="outlined" color="primary" type="submit" id="submit'">Register</Button>
                            </FormControl>

                        </Box>
                    </form>
                </Grid>


            </Grid>

        </>
    )
}