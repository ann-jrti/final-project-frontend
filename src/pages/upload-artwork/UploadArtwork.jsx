import React, { useState } from "react";
import axios from 'axios'
import { Grid, Typography, Box, Input, Button, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import * as tf from '@tensorflow/tfjs'
import * as nsfwjs from 'nsfwjs'

let model = null;
nsfwjs.load().then(d => window.model = d);

export default function UploadArtwork() {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [fileTitle, setFileTitle] = useState('');
    const navigate = useNavigate()


    function handleFormSubmittion(e) {
        e.preventDefault();

        const form = document.getElementById('form');
        const userEmail = localStorage.getItem('email')

        const formData = new FormData(form);

        formData.append('email', userEmail);
        formData.append('id', uuidv4());

        axios.post('http://localhost:4000/artwork/upload', formData)
    }

    function handleFileTitle(e) {
        setFileTitle(e.target.value);
    }

    async function handleUploadedFile(e) {
        setUploadedFile(e.target.files[0]);
        // const predictions = await model.classify(imgData)
        // console.log('Predictions: ', predictions)
    }

    const handleClick = async (e) => {
        e.preventDefault();
        navigate(`/user/my-gallery/artworks/${localStorage.getItem('email')}`);
    }

    return (
        <Grid container display={'flex'} flexDirection={'column'} alignItems={'center'}>

            <Grid item display={'flex'} flexDirection={'column'} gap={3}>
                <Box>
                    <Typography variant={'h4'}>Upload your artwork</Typography>
                    <img id='test-img' src={uploadedFile ? URL.createObjectURL(uploadedFile) : ''}></img>
                </Box>
                <Box>
                    <form
                        encType="multipart/form-data"
                        onSubmit={handleFormSubmittion}
                        id="form"
                    >
                        <Input
                            type="file"
                            name="uploadedFile"
                            id='ok'
                            // value={uploadedFile}
                            onChange={handleUploadedFile}
                            required
                        />

                        <br />
                        <br />

                        <InputLabel>File title:</InputLabel>
                        <Input
                            type="text"
                            placeholder="Enter file title"
                            name="fileTitle"
                            value={fileTitle}
                            onChange={handleFileTitle}
                            required
                        />
                        <br />
                        <br />

                        <Button variant={'outlined'} type="submit">Upload file</Button>
                    </form>
                    <Button variant={'contained'} onClick={handleClick}>Back to my Gallery</Button>
                </Box>
            </Grid>
        </Grid>
    );
}