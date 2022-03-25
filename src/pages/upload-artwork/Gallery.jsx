import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function Gallery() {
    let [buffer, setBuffer] = useState(null)
    // let [searchParams] = useSearchParams();
    // const filename = searchParams.get('artworkname');
    // console.log(filename);

    const getArt = async () => {
        const response = await fetch('http://localhost:4000/artwork/jingzhiyong_144734506_978530326009943_3700448638933136413_n.jpg')
        const data = await response.json()
        setBuffer(data.file.buffer)
    }
    getArt();

    return (

        <>
            <h1>hi</h1>
            {buffer ? <img width={200} src={`data:image/png;base64,${buffer}`}></img> : ''}


        </>
    )
}