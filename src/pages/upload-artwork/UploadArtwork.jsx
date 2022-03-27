import React, { useState } from "react";
import axios from 'axios'
import { Grid, Typography, Box, Input, Button, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import * as tf from '@tensorflow/tfjs'
import * as nsfwjs from 'nsfwjs'
import sensitiveParameters from './sensitive-content-config.json'
import styled from "@emotion/styled";

export default function UploadArtwork() {
    const [uploadedFile, setUploadedFile] = useState('');
    const [uploaded, setUploaded] = useState('');
    const [fileTitle, setFileTitle] = useState('');
    const [invalidImage, setInvalidImage] = useState(true);
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const StyledImg = styled('img')`
    filter: ${invalidImage} ? blur(5px) : blur(0px);
    webKitFilter: ${invalidImage} ? blur(5px) : blur(0px)
    `

    function handleFormSubmittion(e) {
        e.preventDefault();
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${localStorage.getItem('login-token')}`
        }
        const form = document.getElementById('form');
        const userEmail = localStorage.getItem('email')

        const formData = new FormData(form);

        formData.append('email', userEmail);
        formData.append('id', uuidv4());

        axios.post('http://localhost:4000/artwork/upload', formData, { headers: headers })
    }

    function handleFileTitle(e) {
        setFileTitle(e.target.value);
    }

    const handleSensitiveContent = () => {

    }

    async function handleUploadedFile(e) {
        setUploadedFile(e.target.files[0]);
        setUploaded(e.target.files[0]);
        nsfwjs.load().then(model => {
            return model.classify(document.getElementById('test-img'))
        }).then(predictions => {
            console.log(predictions)
            const sensitiveFlags = predictions.filter(({ className, probability }) => probability > sensitiveParameters[className]);
            console.log(sensitiveFlags, sensitiveFlags.length);

            const sensitiveMessage = !!sensitiveFlags.length ? sensitiveFlags.map(flag => {
                return `${flag.className} probability is ${flag.probability.toFixed(3)}`
            }) : 'Congrats! Your artwork is suitable to upload to your gallery.'

            console.log(sensitiveMessage);
            setInvalidImage(!!sensitiveFlags.length);
            if (!sensitiveFlags.length) {
                setUploadedFile(e.target.value)
                setMessage(sensitiveMessage)
            } else {
                setMessage(`Your content is inappropiate, please check our artwork policy.
                Sensitive content detector:
                ${sensitiveMessage}`)
            }
        })
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
                    <StyledImg width={350} id='test-img' src={uploaded ? URL.createObjectURL(uploaded) : ''}></StyledImg>
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

                        <Button variant={'outlined'} disabled={invalidImage} type="submit">Upload file</Button>
                    </form>
                    <Button variant={'contained'} onClick={handleClick}>Back to my Gallery</Button>
                    <>
                        {message.length ? <Typography variant={'body1'} color={invalidImage ? 'secondary' : 'primary'}>{message}</Typography> : ''}
                    </>

                </Box>
            </Grid>
        </Grid>
    );
}