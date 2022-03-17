import { Typography } from "@mui/material"
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { TokenContext } from "../../context/token-context/token-context";

export default function ValidateToken() {
    const [token, setToken] = useContext(TokenContext);
    let [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {

        const token = searchParams.get('token');
        fetch(`http://localhost:4000/auth/validate?token=${token}`)
            .then(res => res.json())
            .then(data => console.log(data))
        console.log(token);
        navigate('/login')
    }, [])

    return (
        <Typography>validated</Typography>
    )
}   