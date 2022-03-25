import { Grid, FormControl, Input, InputLabel, Box, Button, Typography } from "@mui/material"
export default function UserAccount() {

    return (
        <Grid container>

            <FormControl required>
                <InputLabel htmlFor="username">Cuenta</InputLabel>
                <Input type="text" id="username" aria-describedby="my-helper-text" />
            </FormControl>

            <FormControl >
                <Button variant="contained" color="primary" type="submit" id="submit'">dsdsds</Button>
            </FormControl>

        </Grid>
    )
}