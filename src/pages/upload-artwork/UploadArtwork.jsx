import React, { useState } from "react";
import axios from 'axios'
import { Grid, Typography, Box, Input, Button, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Gallery from "./Gallery";

export default function UploadArtwork() {
    const [uploadedFile, setUploadedFile] = useState('');
    const [fileTitle, setFileTitle] = useState('');
    const navigate = useNavigate()

    function handleFormSubmittion(e) {
        e.preventDefault();

        const form = document.getElementById('form');
        const userEmail = localStorage.getItem('email')

        const formData = new FormData(form);

        formData.append('email', userEmail);

        for (const pair of formData.entries()) {
            console.log(pair[0] + ', ' + JSON.stringify(pair[1]));
        }

        axios.post('http://localhost:4000/artwork/upload', formData)
    }

    function handleFileTitle(e) {
        setFileTitle(e.target.value);
    }

    function handleUploadedFile(e) {
        setUploadedFile(e.target.value);
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:4000/artwork/jingzhiyong_144734506_978530326009943_3700448638933136413_n.jpg')
        console.log(response);
        const data = await response.json()
        console.log(data);
        console.log(data.originalname);
        const filename = data.originalname;
        navigate(`/user/my-gallery/artworks/${filename}`);

    }

    return (
        <Grid container display={'flex'} flexDirection={'column'} alignItems={'center'}>

            <Grid item display={'flex'} flexDirection={'column'} gap={3}>
                <Box>
                    <Typography variant={'h4'}>Upload your artwork</Typography>
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
                            value={uploadedFile}
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

                        <Button variant={'outlined'} type="submit">Submit Form</Button>
                    </form>
                    <Button onClick={handleClick}>get artwork</Button>
                </Box>
            </Grid>
        </Grid>
    );
}