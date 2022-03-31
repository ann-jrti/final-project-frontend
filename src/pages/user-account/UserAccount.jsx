import {
  Grid,
  FormControl,
  Input,
  Modal,
  Box,
  Button,
  Typography,
  TextField,
  Divider,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import beeSadIcon from '../../assets/emotes/bee-sad-emote.webp';

export default function UserAccount() {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const handleSubmitEditAccount = () => {};

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:4000/users/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${localStorage.getItem('login-token')}`,
      },
    });
    if (response.ok) localStorage.clear();

    console.log(response);
    const data = await response.json();
    console.log(data);
    navigate('/');
  };

  const style = {
    position: 'absolute',
    padding: '2rem',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
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
        <Box
          sx={style}
          display={'flex'}
          flexDirection={'column'}
          justifyContent="center"
        >
          <form onSubmit={handleSubmitEditAccount}>
            {/* <Box display="flex" gap={2}>
              <Grid item sm={12}>
                <Typography>Edit your name</Typography>
                <input placeholder="Your name"></input>
              </Grid>

              <Grid item sm={12}>
                <Typography>Edit your email</Typography>
                <input placeholder="Your name"></input>
              </Grid>
            </Box> */}
            <Box display="flex" justifyContent="center">
              <Typography>
                Are you sure you want to delete your account?
              </Typography>
            </Box>
          </form>
          <Divider sx={{ marginTop: '20px' }} color="#8d99ae" />
          <Box mt={3} display="flex" justifyContent="center">
            <Button
              variant="contained"
              display="flex"
              onClick={handleDeleteAccount}
              color="secondary"
            >
              Yes, delete my account
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  };

  return (
    <Grid container display="flex" justifyContent="center" alignItems="center">
      <Box display="flex" flexDirection="column" gap={5}>
        <Grid item display="flex" justifyContent="center" sm={12}>
          <Typography mt={6} variant="h2">
            My account
          </Typography>
        </Grid>

        <Grid item sm={12} display="flex" justifyContent="center">
          <Box display="flex" flexDirection="column" gap={5}>
            <Button
              className="btn btn-offer"
              onClick={handleClick}
              variant="contained"
            >
              Delete my account
            </Button>
            <img width={200} src={beeSadIcon}></img>
          </Box>
        </Grid>
      </Box>
      {open ? openCustomProfileModal() : ''}
    </Grid>
  );
}
