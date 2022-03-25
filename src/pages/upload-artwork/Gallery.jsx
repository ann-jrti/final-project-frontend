import { Button, ImageList, Box, Grid, Typography, ImageListItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


export default function Gallery() {
    let [buffers, setBuffer] = useState(null)
    const { token } = useParams();
    const navigate = useNavigate();
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

    return (

        <>



            <Grid container display={'flex'} justifyContent={'center'} >
                <Grid item>
                    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} gap={2}>
                        <Typography variant={'h3'} color={'success.main'}>My gallery</Typography>
                        <Button onClick={addNewArtwork} variant={'contained'} color='secondary'>Add new artwork</Button>
                    </Box>
                </Grid>
                {buffers ? <ImageList  >
                    <Box display={'flex'} justifyContent={'center'} flexDirection={'row'} gap={2}>
                        {buffers.map((b) => (
                            <Grid item>
                                <ImageListItem key={b.buffer}>
                                    <img className='gallery__user-img'
                                        src={`data:image/png;base64,${b.buffer}`}
                                        // srcSet={`data:image/png;base64,${b.buffer}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                        alt='gallery image'
                                        loading="lazy"
                                    />
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