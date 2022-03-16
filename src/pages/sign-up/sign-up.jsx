import { FormGroup, FormControl, InputLabel, Input, FormHelperText } from "@mui/material"


export default function SignUp() {

    return (
        <>
            <p>Sign up</p>
            <FormControl>

                <InputLabel htmlFor="email">Email address</InputLabel>
                <Input id="email" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>

                <InputLabel htmlFor="email">Email address</InputLabel>
                <Input id="email" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
            </FormControl>
        </>
    )
}