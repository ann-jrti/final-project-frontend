import { Grid, FormControl, Input, Modal, Box, Button, Typography, TextField, Divider } from "@mui/material"
import React, { useState } from "react";

export default function UserAccount() {
    const [open, setOpen] = useState(false);
    const handleClick = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSubmitEditAccount = () => {

    }

    const handleDeleteAccount = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:4000/users/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${localStorage.getItem('login-token')}`
            }
        })
        console.log(response);
        const data = await response.json()
        console.log(data);
    }

    const style = {
        position: 'absolute',
        padding: '2rem',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        bgcolor: 'background.paper',
        border: '2px solid #bd8778',
        boxShadow: 24,
        p: 4,
    };

    const openCustomProfileModal = () => {
        return (
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} display={'flex'} flexDirection={'column'}>
                    <form onSubmit={handleSubmitEditAccount}>
                        <Box display='flex' gap={2}>


                            <Grid item sm={12}>
                                <Typography>Edit your name</Typography>
                                <input placeholder="Your name"></input>
                            </Grid>

                            <Grid item sm={12}>
                                <Typography>Edit your email</Typography>
                                <input placeholder="Your name"></input>
                            </Grid>

                        </Box>

                    </form>
                    <Divider sx={{ marginTop: '20px' }} color='#8d99ae' />
                    <Box mt={3}>
                        <Button display='flex' onClick={handleDeleteAccount} color='secondary' >Delete my account</Button>
                    </Box>

                </Box>

            </Modal>
        )
    }

    return (
        <Grid container display='flex' justifyContent='center' alignItems='center' >
            <Box display='flex' flexDirection='column' gap={5}>

                <Grid item sm={12}>
                    <Typography variant='h2'>My account</Typography>
                </Grid>

                <Grid item sm={12}>
                    <Button className="btn btn-offer" onClick={handleClick} variant='contained'>Edit account</Button>

                </Grid>
                <Grid item sm={12}>
                    <Box>
                        <FormControl required>
                            <Typography>Cuenta</Typography>
                            <TextField type="text" id="username" aria-describedby="my-helper-text" />
                        </FormControl>
                    </Box>
                </Grid>
            </Box>
            {open ? openCustomProfileModal() : ''}
        </Grid>

    )
}