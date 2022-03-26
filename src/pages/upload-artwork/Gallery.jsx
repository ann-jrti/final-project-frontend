import './index.css'
import { Button, ImageList, Menu, MenuItem, Box, Grid, Typography, ImageListItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ImagesMenu from './components/images-menu/ImagesMenu';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Gallery() {
    let [buffers, setBuffer] = useState(null)
    const { token } = useParams();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    // let [searchParams] = useSearchParams();
    // const filename = searchParams.get('artworkname');
    // console.log(filename);

    const getArt = async () => {
        const response = await fetch(`http://localhost:4000/artwork?token=${token}`)
        const data = await response.json()
        console.log(data);
        setBuffer(data)
    }

    useEffect(() => {
        getArt();
    }, [])
    //sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}
    const addNewArtwork = (e) => {
        e.preventDefault();
        navigate('/user/upload-artwork')
    }

    const handleOpenImgMenu = (e) => {
        e.preventDefault()

    }

    return (

        <>



            <Grid container display={'flex'} justifyContent={'center'} flexDirection={'column'} >

                <Grid item display={'flex'} justifyContent={'center'} >
                    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} gap={2} mb={5}>
                        <Typography variant={'h3'} color={'success.main'}>My gallery</Typography>
                        <Button onClick={addNewArtwork} variant={'contained'} color='secondary'>Add new artwork</Button>
                    </Box>
                </Grid>

                {buffers ? <ImageList  >
                    <Box display={'flex'} justifyContent={'center'} flexDirection={'row'} gap={3}>
                        {buffers.map((b) => (
                            <Grid display={'flex'} justifyContent={'center'} item width={300}>
                                <ImageListItem key={b._id}>
                                    <img className='gallery__user-img'
                                        src={`data:image/png;base64,${b.buffer}`}
                                        // srcSet={`data:image/png;base64,${b.buffer}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                        alt='gallery image'
                                        loading="lazy"
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    />
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem onClick={handleClose}> <DeleteIcon></DeleteIcon>Delete from my gallery</MenuItem>
                                    </Menu>
                                </ImageListItem>
                            </Grid>
                        ))}
                    </Box>
                </ImageList> : <Typography>Loading your awesome gallery...</Typography>}

            </Grid>


            {/* {buffer ? <img width={200} src={`data:image/png;base64,${buffer}`}></img> : ''} */}


        </>
    )
}