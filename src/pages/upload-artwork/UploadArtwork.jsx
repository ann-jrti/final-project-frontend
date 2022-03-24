import React, { useState } from "react";
import axios from 'axios'
import { Grid, Typography, Box, Input, Button, InputLabel } from "@mui/material";

export default function UploadArtwork() {

    const [uploadedFile, setUploadedFile] = useState('');
    const [fileTitle, setFileTitle] = useState('');

    function handleFormSubmittion(e) {
        e.preventDefault();

        let form = document.getElementById('form');
        let formData = new FormData(form);

        // do something
        console.log("Form submitted")
        // fetch('http://localhost:4000/artwork/upload', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(formData)
        // })

        axios.post('http://localhost:4000/artwork/upload', formData)
    }

    function handleFileTitle(e) {
        setFileTitle(e.target.value);
    }

    function handleUploadedFile(e) {
        setUploadedFile(e.target.value);
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
                </Box>
            </Grid>
        </Grid>
    );
}